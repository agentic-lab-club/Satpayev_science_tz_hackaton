"""Semantic analysis orchestration with heuristics-first, LLM-second strategy."""

from __future__ import annotations

from typing import Dict, List, Optional

from tz_mvp.core.config import TZAnalysisConfig
from tz_mvp.core.models import Document, ExtractedEntity, Issue, Section, SemanticAnalysisResult, StructureAnalysis
from tz_mvp.prompts.semantic_prompts import (
    build_ambiguity_prompt,
    build_contradiction_prompt,
    build_entity_extraction_prompt,
    build_missing_requirements_prompt,
    build_section_classification_prompt,
)
from tz_mvp.schemas.semantic import (
    ExtractedEntityResponse,
    SectionClassificationResponse,
    SemanticIssueResponse,
)
from tz_mvp.semantics.heuristics import HeuristicSemanticEngine
from tz_mvp.semantics.llm_client import BaseLLMClient, OpenAILLMClient
from tz_mvp.utils.text import chunk_text


class SemanticAnalyzer:
    """Runs semantic sub-pipelines and returns typed notebook artifacts."""

    def __init__(self, config: TZAnalysisConfig, llm_client: Optional[BaseLLMClient] = None) -> None:
        self.config = config
        self.heuristics = HeuristicSemanticEngine(config)
        self.llm_client = llm_client or OpenAILLMClient(config.llm)

    def analyze(self, document: Document, structure: StructureAnalysis) -> SemanticAnalysisResult:
        """Runs the complete semantic analysis flow."""

        sections = structure.sections
        section_classification = self.classify_sections_semantically(sections)
        self._apply_classification(sections, section_classification)
        canonical_sections = {section.canonical_key: section for section in sections if section.canonical_key}

        requirements = self.extract_requirements(document, sections)
        deadlines = self.extract_deadlines(document, sections)
        kpis = self.extract_kpis(document, sections)
        expected_results = self.extract_expected_results(document, sections)

        issues: List[Issue] = []
        traces = []

        ambiguity_issues, ambiguity_traces = self.detect_ambiguities(sections)
        contradiction_issues, contradiction_traces = self.detect_contradictions(
            canonical_sections, requirements, deadlines, kpis, expected_results
        )
        missing_issues, missing_traces = self.detect_missing_requirements(
            structure, requirements, deadlines, kpis, expected_results
        )
        gap_issues = self.detect_logical_gaps(canonical_sections, requirements, kpis, expected_results)

        issues.extend(ambiguity_issues + contradiction_issues + missing_issues + gap_issues)
        traces.extend(ambiguity_traces + contradiction_traces + missing_traces)

        entities = requirements + deadlines + kpis + expected_results
        issues = self._dedupe_issues(issues)

        summary = {
            "issues_total": len(issues),
            "requirements_count": len(requirements),
            "deadlines_count": len(deadlines),
            "kpi_count": len(kpis),
            "expected_results_count": len(expected_results),
        }
        return SemanticAnalysisResult(
            issues=issues,
            extracted_entities=entities,
            section_classification={section.id: section.canonical_key or "context" for section in sections},
            llm_traces=traces,
            summary=summary,
        )

    def classify_sections_semantically(self, sections: List[Section]) -> Dict[str, str]:
        """Classifies sections using heuristics and optional LLM correction."""

        heuristic = self.heuristics.classify_sections_semantically(sections)
        if not self.llm_client.available or not sections:
            return heuristic
        section_titles = [section.title for section in sections]
        context = "\n\n".join(f"{section.title}\n{section.content[:600]}" for section in sections[:8])
        prompt = build_section_classification_prompt(section_titles, context)
        parsed, _trace = self.llm_client.analyze_json(
            "classify_sections_semantically",
            prompt,
            SectionClassificationResponse,
        )
        if parsed:
            by_title = {item.section_title: item.canonical_key for item in parsed.classifications}
            for section in sections:
                if section.title in by_title:
                    heuristic[section.id] = by_title[section.title]
        return heuristic

    def detect_ambiguities(self, sections: List[Section]) -> tuple[List[Issue], List]:
        """Finds vague wording with optional LLM refinement."""

        issues = self.heuristics.detect_ambiguities(sections)
        traces = []
        if not self.llm_client.available:
            return issues, traces
        for section in sections:
            for chunk in chunk_text(section.content, max_chars=2200):
                prompt = build_ambiguity_prompt(section.title, chunk)
                parsed, trace = self.llm_client.analyze_json("detect_ambiguities", prompt, SemanticIssueResponse)
                traces.append(trace)
                if parsed:
                    issues.extend(
                        [
                            Issue(
                                issue_type=item.issue_type,
                                severity=item.severity,
                                section_id=section.id,
                                section_title=item.section_title or section.title,
                                quote_text=item.quote_text,
                                conflicting_quote_text=item.conflicting_quote_text,
                                explanation=item.explanation,
                                recommendation=item.recommendation,
                            )
                            for item in parsed.issues
                        ]
                    )
        return self._dedupe_issues(issues), traces

    def detect_contradictions(
        self,
        canonical_sections: Dict[str, Section],
        requirements: List[ExtractedEntity],
        deadlines: List[ExtractedEntity],
        kpis: List[ExtractedEntity],
        expected_results: List[ExtractedEntity],
    ) -> tuple[List[Issue], List]:
        """Compares critical section pairs to find contradictions."""

        issues = self.heuristics.detect_contradictions(
            canonical_sections,
            requirements,
            deadlines,
            kpis,
            expected_results,
        )
        traces = []
        if not self.llm_client.available:
            return issues, traces
        snippets = []
        for key in ["goal", "tasks", "requirements", "deadlines", "kpi", "expected_results"]:
            section = canonical_sections.get(key)
            if section:
                snippets.append(f"[{section.title}]\n{section.content[:1000]}")
        prompt = build_contradiction_prompt("\n\n".join(snippets))
        parsed, trace = self.llm_client.analyze_json("detect_contradictions", prompt, SemanticIssueResponse)
        traces.append(trace)
        if parsed:
            issues.extend(
                [
                    Issue(
                        issue_type=item.issue_type,
                        severity=item.severity,
                        section_title=item.section_title,
                        quote_text=item.quote_text,
                        conflicting_quote_text=item.conflicting_quote_text,
                        explanation=item.explanation,
                        recommendation=item.recommendation,
                    )
                    for item in parsed.issues
                ]
            )
        return self._dedupe_issues(issues), traces

    def detect_missing_requirements(
        self,
        structure: StructureAnalysis,
        requirements: List[ExtractedEntity],
        deadlines: List[ExtractedEntity],
        kpis: List[ExtractedEntity],
        expected_results: List[ExtractedEntity],
    ) -> tuple[List[Issue], List]:
        """Finds missing semantic building blocks."""

        issues = self.heuristics.detect_missing_requirements(
            structure, requirements, deadlines, kpis, expected_results
        )
        traces = []
        if not self.llm_client.available:
            return issues, traces
        context = "\n".join(
            [
                f"missing_sections={structure.missing_sections}",
                f"requirements={len(requirements)}",
                f"deadlines={len(deadlines)}",
                f"kpis={len(kpis)}",
                f"expected_results={len(expected_results)}",
            ]
        )
        prompt = build_missing_requirements_prompt(context)
        parsed, trace = self.llm_client.analyze_json(
            "detect_missing_requirements",
            prompt,
            SemanticIssueResponse,
        )
        traces.append(trace)
        if parsed:
            issues.extend(
                [
                    Issue(
                        issue_type=item.issue_type,
                        severity=item.severity,
                        section_title=item.section_title,
                        quote_text=item.quote_text,
                        conflicting_quote_text=item.conflicting_quote_text,
                        explanation=item.explanation,
                        recommendation=item.recommendation,
                    )
                    for item in parsed.issues
                ]
            )
        return self._dedupe_issues(issues), traces

    def extract_requirements(self, document: Document, sections: List[Section]) -> List[ExtractedEntity]:
        return self._extract_entities(document, sections, "requirement")

    def extract_deadlines(self, document: Document, sections: List[Section]) -> List[ExtractedEntity]:
        return self._extract_entities(document, sections, "deadline")

    def extract_kpis(self, document: Document, sections: List[Section]) -> List[ExtractedEntity]:
        return self._extract_entities(document, sections, "kpi")

    def extract_expected_results(self, document: Document, sections: List[Section]) -> List[ExtractedEntity]:
        return self._extract_entities(document, sections, "expected_result")

    def detect_logical_gaps(
        self,
        canonical_sections: Dict[str, Section],
        requirements: List[ExtractedEntity],
        kpis: List[ExtractedEntity],
        expected_results: List[ExtractedEntity],
    ) -> List[Issue]:
        return self.heuristics.detect_logical_gaps(
            canonical_sections, requirements, kpis, expected_results
        )

    def _apply_classification(self, sections: List[Section], classification: Dict[str, str]) -> None:
        for section in sections:
            section.canonical_key = classification.get(section.id, section.canonical_key)

    def _extract_entities(self, document: Document, sections: List[Section], entity_type: str) -> List[ExtractedEntity]:
        if entity_type == "requirement":
            entities = self.heuristics.extract_requirements(document.id, sections)
        elif entity_type == "deadline":
            entities = self.heuristics.extract_deadlines(document.id, sections)
        elif entity_type == "kpi":
            entities = self.heuristics.extract_kpis(document.id, sections)
        elif entity_type == "expected_result":
            entities = self.heuristics.extract_expected_results(document.id, sections)
        else:
            entities = []

        if not self.llm_client.available:
            return entities

        for section in sections:
            if not section.content.strip():
                continue
            prompt = build_entity_extraction_prompt(entity_type, section.title, section.content[:2200])
            parsed, _trace = self.llm_client.analyze_json(
                f"extract_{entity_type}",
                prompt,
                ExtractedEntityResponse,
            )
            if not parsed:
                continue
            entities.extend(
                [
                    ExtractedEntity(
                        document_id=document.id,
                        entity_type=item.entity_type,
                        raw_value=item.raw_value,
                        normalized_value=item.normalized_value,
                        source_section_id=section.id,
                        source_section_title=item.section_title or section.title,
                        confidence=item.confidence,
                    )
                    for item in parsed.entities
                    if item.entity_type == entity_type
                ]
            )
        return self._dedupe_entities(entities)

    def _dedupe_entities(self, entities: List[ExtractedEntity]) -> List[ExtractedEntity]:
        deduped: List[ExtractedEntity] = []
        seen = set()
        for entity in entities:
            marker = (entity.entity_type, entity.normalized_value.lower())
            if marker in seen:
                continue
            seen.add(marker)
            deduped.append(entity)
        return deduped

    def _dedupe_issues(self, issues: List[Issue]) -> List[Issue]:
        deduped: List[Issue] = []
        seen = set()
        for issue in issues:
            marker = (
                issue.issue_type,
                issue.section_title or "",
                issue.quote_text.lower(),
                (issue.conflicting_quote_text or "").lower(),
            )
            if marker in seen:
                continue
            seen.add(marker)
            deduped.append(issue)
        return deduped
