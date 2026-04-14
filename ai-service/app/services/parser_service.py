from app.schemas.analyze import AnalyzeRequest
from app.schemas.common import DocumentMetadata


class ParserService:
    """Template parser service.

    This scaffold does not parse PDF/DOCX bytes yet. It only reports metadata
    for plain text or file placeholders.
    """

    def get_document_metadata(self, request: AnalyzeRequest) -> DocumentMetadata:
        parser = "template_text" if request.text else "template_file_placeholder"
        character_count = len(request.text or "")
        return DocumentMetadata(
            filename=request.filename,
            content_type=request.content_type,
            character_count=character_count,
            parser=parser,
        )


def get_parser_service() -> ParserService:
    return ParserService()

