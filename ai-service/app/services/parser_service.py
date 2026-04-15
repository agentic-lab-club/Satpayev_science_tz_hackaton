from __future__ import annotations

import base64
import io
import re
from dataclasses import dataclass

from docx import Document
from pypdf import PdfReader

from app.core.config import get_settings
from app.core.errors import AIServiceError
from app.schemas.analyze import AnalyzeRequest
from app.schemas.common import DocumentMetadata


@dataclass(slots=True)
class ParsedDocument:
    metadata: DocumentMetadata
    text: str
    source: str
    truncated: bool = False


class ParserService:
    """Document parser for text, DOCX, and PDF inputs."""

    def parse(self, request: AnalyzeRequest) -> ParsedDocument:
        settings = get_settings()
        if request.text and request.text.strip():
            text = request.text.strip()
            source = "text"
            parser = "plain_text"
        elif request.file_base64 and request.file_base64.strip():
            raw_bytes = self._decode_base64(request.file_base64)
            text, source, parser = self._extract_from_bytes(
                raw_bytes=raw_bytes,
                filename=request.filename,
                content_type=request.content_type,
            )
        else:
            raise AIServiceError(code="invalid_input", message="Either text or file_base64 is required")

        truncated = False
        if len(text) > settings.max_input_chars:
            text = text[: settings.max_input_chars]
            truncated = True

        metadata = DocumentMetadata(
            file_path=request.filename,
            filename=request.filename,
            content_type=request.content_type,
            character_count=len(text),
            parser=f"{parser}{'_truncated' if truncated else ''}",
        )
        return ParsedDocument(metadata=metadata, text=text, source=source, truncated=truncated)

    def get_document_metadata(self, request: AnalyzeRequest) -> DocumentMetadata:
        return self.parse(request).metadata

    def _decode_base64(self, payload: str) -> bytes:
        try:
            return base64.b64decode(payload, validate=False)
        except Exception as exc:  # pragma: no cover - handled as user input error
            raise AIServiceError(code="invalid_file", message="file_base64 is not valid base64") from exc

    def _extract_from_bytes(self, raw_bytes: bytes, filename: str, content_type: str) -> tuple[str, str, str]:
        filename_lower = filename.lower()
        content_type_lower = content_type.lower()

        if filename_lower.endswith(".docx") or "word" in content_type_lower:
            return self._extract_from_docx(raw_bytes), "docx", "docx"
        if filename_lower.endswith(".pdf") or "pdf" in content_type_lower:
            return self._extract_from_pdf(raw_bytes), "pdf", "pdf"

        try:
            return raw_bytes.decode("utf-8"), "txt", "utf8_text"
        except UnicodeDecodeError:
            return raw_bytes.decode("utf-8", errors="ignore"), "txt", "utf8_text_lossy"

    def _extract_from_docx(self, raw_bytes: bytes) -> str:
        document = Document(io.BytesIO(raw_bytes))
        parts: list[str] = [paragraph.text.strip() for paragraph in document.paragraphs if paragraph.text.strip()]
        for table in document.tables:
            for row in table.rows:
                cells = [cell.text.strip() for cell in row.cells if cell.text.strip()]
                if cells:
                    parts.append(" | ".join(cells))
        return "\n".join(parts).strip()

    def _extract_from_pdf(self, raw_bytes: bytes) -> str:
        reader = PdfReader(io.BytesIO(raw_bytes))
        pages: list[str] = []
        for page in reader.pages:
            text = page.extract_text() or ""
            if text.strip():
                pages.append(text.strip())
        combined = "\n".join(pages).strip()
        if combined:
            return combined
        return self._extract_pdf_via_fallback(raw_bytes)

    def _extract_pdf_via_fallback(self, raw_bytes: bytes) -> str:
        try:
            import pdfplumber
        except Exception:  # pragma: no cover - dependency issue fallback
            return ""

        extracted: list[str] = []
        with pdfplumber.open(io.BytesIO(raw_bytes)) as pdf:
            for page in pdf.pages:
                text = page.extract_text() or ""
                if text.strip():
                    extracted.append(text.strip())
        return "\n".join(extracted).strip()

    def _split_lines(self, text: str) -> list[str]:
        return [line.strip() for line in re.split(r"\r?\n", text) if line.strip()]


def get_parser_service() -> ParserService:
    return ParserService()
