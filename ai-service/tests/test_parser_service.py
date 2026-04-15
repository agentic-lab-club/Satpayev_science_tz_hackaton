from pathlib import Path

from app.schemas.analyze import AnalyzeRequest
from app.services.parser_service import ParserService


def test_analyze_request_accepts_file_url() -> None:
    request = AnalyzeRequest(file_url="docs/demo_tz_problematic.txt", filename="demo_tz_problematic.txt")

    assert request.file_url == "docs/demo_tz_problematic.txt"


def test_parser_service_reads_repo_docs_filename() -> None:
    request = AnalyzeRequest(
        file_url="TZ_digital_polegon.docx",
        filename="TZ_digital_polegon.docx",
        content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    )

    parsed = ParserService().parse(request)

    assert parsed.metadata.file_path == "TZ_digital_polegon.docx"
    assert parsed.metadata.parser.startswith("docx")
    assert parsed.text.strip()


def test_parser_service_reads_local_file_url(tmp_path: Path) -> None:
    file_path = tmp_path / "sample.txt"
    file_path.write_text("1. Общее описание\n2. Цель\nСоздать систему.", encoding="utf-8")

    request = AnalyzeRequest(
        file_url=str(file_path),
        filename="sample.txt",
        content_type="text/plain",
    )

    parsed = ParserService().parse(request)

    assert "Общее описание" in parsed.text
    assert parsed.metadata.file_path == str(file_path)
    assert parsed.metadata.parser.startswith("utf8_text")
