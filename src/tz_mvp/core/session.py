"""In-memory session store for notebook history and confirmed entities."""

from __future__ import annotations

from typing import Dict, List, Optional

import pandas as pd

from tz_mvp.core.models import AnalysisBundle, Document, ExtractedEntity, Report


class NotebookSessionState:
    """Stores notebook artifacts within one Jupyter session."""

    def __init__(self) -> None:
        self.documents: Dict[str, Document] = {}
        self.bundles: Dict[str, AnalysisBundle] = {}
        self.reports: Dict[str, Report] = {}
        self.confirmed_entities: Dict[str, List[ExtractedEntity]] = {}
        self.run_history: List[dict] = []

    def register_bundle(self, bundle: AnalysisBundle) -> None:
        """Stores or updates a bundle and appends a history record."""

        document = bundle.document
        self.documents[document.id] = document
        self.bundles[document.id] = bundle
        self.reports[bundle.report.id] = bundle.report
        self.run_history.append(
            {
                "document_id": document.id,
                "filename": document.original_filename,
                "uploaded_at": document.upload_timestamp.isoformat(),
                "analysis_id": bundle.analysis.id,
                "total_score": bundle.analysis.total_score,
                "rewrite_mode": bundle.improved_document.rewrite_mode,
                "issues_count": len(bundle.structure.issues) + len(bundle.semantic.issues),
                "entities_proposed": len(bundle.semantic.extracted_entities),
            }
        )

    def save_confirmed_entities(self, document_id: str, entities: List[ExtractedEntity]) -> None:
        """Persists only user-confirmed entities in session memory."""

        self.confirmed_entities[document_id] = entities
        if document_id in self.bundles:
            self.bundles[document_id].confirmed_entities = entities

    def get_bundle(self, document_id: str) -> Optional[AnalysisBundle]:
        """Returns one stored analysis bundle."""

        return self.bundles.get(document_id)

    def history_dataframe(self) -> pd.DataFrame:
        """Notebook-friendly history table."""

        return pd.DataFrame(self.run_history)

    def confirmed_entities_dataframe(self, document_id: str) -> pd.DataFrame:
        """Returns confirmed entities as a DataFrame."""

        entities = self.confirmed_entities.get(document_id, [])
        return pd.DataFrame([entity.model_dump() for entity in entities])
