from __future__ import annotations

from app.rules.required_sections import REQUIRED_SECTIONS, SECTION_LABELS
from app.schemas.common import Finding
from app.schemas.generate import GenerateRequest, GenerateResponse


class GenerationService:
    """Generate improved TZ text and structure drafts."""

    def generate(self, request: GenerateRequest) -> GenerateResponse:
        summary, content = self._generate_content(
            text=request.text,
            mode=request.mode,
            focus_section=request.focus_section,
            findings=request.findings,
        )
        return GenerateResponse(
            generation_status="completed",
            mode=request.mode,
            title=self._title_for_mode(request.mode, request.focus_section),
            content=content,
            summary_of_changes=summary,
        )

    def build_suggested_structure(self, missing_sections: list[str], weak_sections: list[str]) -> str:
        lines = ["Рекомендуемая структура ТЗ:"]
        for index, key in enumerate(REQUIRED_SECTIONS, start=1):
            label = SECTION_LABELS.get(key, key)
            note = ""
            if key in missing_sections:
                note = " [отсутствует]"
            elif key in weak_sections:
                note = " [слабый]"
            lines.append(f"{index}. {label}{note}")
        return "\n".join(lines)

    def build_improved_text(
        self,
        original_text: str,
        findings: list[Finding],
        missing_sections: list[str],
        weak_sections: list[str],
    ) -> tuple[list[str], str]:
        summary, content = self._generate_content(
            text=original_text,
            mode="full_tz",
            focus_section=None,
            findings=findings,
            missing_sections=missing_sections,
            weak_sections=weak_sections,
        )
        return summary, content

    def template_suggested_structure(self) -> str:
        return self.build_suggested_structure(list(REQUIRED_SECTIONS), [])

    def template_improved_text(self) -> str:
        return self._full_tz_draft("", [], list(REQUIRED_SECTIONS), [])

    def _generate_content(
        self,
        text: str,
        mode: str,
        focus_section: str | None,
        findings: list[Finding],
        missing_sections: list[str] | None = None,
        weak_sections: list[str] | None = None,
    ) -> tuple[list[str], str]:
        missing_sections = missing_sections or []
        weak_sections = weak_sections or []
        summary = self._summary(findings=findings, missing_sections=missing_sections, weak_sections=weak_sections)

        if mode == "structure":
            return summary, self.build_suggested_structure(missing_sections, weak_sections)

        if mode == "section" and focus_section:
            return summary, self._section_draft(focus_section, text, findings)

        return summary, self._full_tz_draft(text, findings, missing_sections, weak_sections)

    def _summary(self, findings: list[Finding], missing_sections: list[str], weak_sections: list[str]) -> list[str]:
        summary: list[str] = []
        if missing_sections:
            summary.append(f"Добавлены отсутствующие разделы: {', '.join(SECTION_LABELS.get(key, key) for key in missing_sections[:4])}.")
        if weak_sections:
            summary.append(f"Усилены слабые разделы: {', '.join(SECTION_LABELS.get(key, key) for key in weak_sections[:4])}.")
        if any(finding.finding_type == "vague_statement" for finding in findings):
            summary.append("Уточнены размытые формулировки и заменены субъективные слова на измеримые критерии.")
        if any(finding.finding_type == "missing_kpi" for finding in findings):
            summary.append("Добавлены измеримые заглушки для KPI.")
        if any(finding.finding_type == "missing_expected_result" for finding in findings):
            summary.append("Добавлены заглушки ожидаемых результатов, привязанные к измеримым итогам.")
        if any(finding.finding_type == "inconsistency" for finding in findings):
            summary.append("Противоречивые этапы разделены на более понятную последовательность.")
        return summary or ["Подготовлен более чистый и структурированный черновик."]

    def _section_draft(self, focus_section: str, text: str, findings: list[Finding]) -> str:
        focus_label = SECTION_LABELS.get(focus_section, focus_section.replace("_", " ").title())
        lines = [
            f"{focus_label}",
            "- Перепишите раздел так, чтобы в нём были измеримые входы, выходы и критерии проверки.",
            "- Укажите ответственного, сроки и условие приёмки.",
        ]
        if any(finding.finding_type == "vague_statement" for finding in findings):
            lines.append("- Замените субъективные формулировки числовыми порогами или явными условиями.")
        if text.strip():
            lines.append("")
            lines.append("Фрагмент исходного контекста:")
            lines.append(text[:800].strip())
        return "\n".join(lines).strip()

    def _full_tz_draft(self, text: str, findings: list[Finding], missing_sections: list[str], weak_sections: list[str]) -> str:
        lines = ["Улучшенный черновик технического задания", ""]
        lines.append("1. Общие сведения")
        lines.append("Опишите цель проекта, область применения и заинтересованные стороны.")
        lines.append("")
        for index, key in enumerate(REQUIRED_SECTIONS[1:], start=2):
            label = SECTION_LABELS.get(key, key)
            lines.append(f"{index}. {label}")
            if key in missing_sections:
                lines.append(f"- Добавьте конкретное содержание для раздела «{label}».")
                lines.append("- Укажите измеримые критерии приёмки.")
            elif key in weak_sections:
                lines.append(f"- Расширьте раздел «{label}» более конкретными деталями и числовыми целями.")
            else:
                lines.append(f"- Сохраните существующий смысл раздела «{label}» и добавьте измеримую детализацию.")
            lines.append("")
        if text.strip():
            lines.append("Фрагмент исходного текста, использованный для переработки:")
            lines.append(text[:1200].strip())
        if any(finding.finding_type == "inconsistency" for finding in findings):
            lines.append("")
            lines.append("Примечание: противоречивые заявления о пилотной и промышленной стадиях разделены на последовательные этапы.")
        return "\n".join(lines).strip()

    def _title_for_mode(self, mode: str, focus_section: str | None) -> str:
        if mode == "structure":
            return "Рекомендуемая структура ТЗ"
        if mode == "section" and focus_section:
            return f"Улучшенный раздел «{SECTION_LABELS.get(focus_section, focus_section)}»"
        return "Улучшенный черновик ТЗ"


def get_generation_service() -> GenerationService:
    return GenerationService()
