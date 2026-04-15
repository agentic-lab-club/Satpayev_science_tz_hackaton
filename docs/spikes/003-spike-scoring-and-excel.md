# User Prompt
Excel:

Стратегическая релевантность = 16 из 20
Цель и задачи = 7 из 10
Научная новизна = 11 из 15
Практическая применимость = 18 из 20
Ожидаемые результаты = 12 из 15
Соц-экономический эффект = 8 из 10
Реализуемость = 9 из 10

---
Разбивку score

Например:
Structure — 60
Completeness — 50
Clarity — 55
KPI / Results — 40
Consistency — 65

---
нужно как то соединить для excel
или пусть в excel будет еще:

ai_document_analys_scoring_total (Structure, Clearity, KPI, и так далее)
ai_preliminary_total_score (на основе columns % excel)
final_reviewed_total_score (Админ/Эксепрт сам ставит баллы для columns % excel и выводит total или просто ставит оценку свою то есть final_reviewed or expert_review_score)



---
---
---
let's do the spike on this! does our system and requirements covers this or not?

# LLM

**Spike: Scoring And Excel**

spike-scoring-and-excel

Yes, our current system plan already covers this, but we should keep the model very explicit because there are two different meanings of “score”.

The correct model is **three scores**, not one.

**1. `ai_document_analysis_scorecard`**

This is the AI diagnostic score for document quality.

Example:

```txt
Structure       60 / 100
Completeness    50 / 100
Clarity         55 / 100
KPI / Results   40 / 100
Consistency     65 / 100
```

Total:

```txt
ai_document_analysis_total_score = average(...)
= (60 + 50 + 55 + 40 + 65) / 5
= 54 / 100
```

Purpose:
- helps Client understand “what is wrong with the document”;
- helps Admin quickly inspect AI findings;
- is useful for UI dashboards;
- should not directly fill the official Excel columns.

**2. `ai_preliminary_evaluation_scorecard`**

This is AI’s draft score using the **official Excel rubric**.

Your example:

```txt
Стратегическая релевантность      16 / 20
Цель и задачи                      7 / 10
Научная новизна                   11 / 15
Практическая применимость         18 / 20
Ожидаемые результаты              12 / 15
Соц-экономический эффект           8 / 10
Реализуемость                      9 / 10
```

Total:

```txt
ai_preliminary_total_score = 16 + 7 + 11 + 18 + 12 + 8 + 9
= 81 / 100
```

Purpose:
- AI draft expert-style evaluation;
- visible to Client and Admin;
- maps directly to Excel columns;
- Admin can use it as a starting point.

**3. `final_reviewed_evaluation_scorecard`**

This is the official Admin/Expert score.

Admin should edit the same Excel rubric categories:

```txt
Стратегическая релевантность      ? / 20
Цель и задачи                      ? / 10
Научная новизна                    ? / 15
Практическая применимость          ? / 20
Ожидаемые результаты               ? / 15
Соц-экономический эффект           ? / 10
Реализуемость                      ? / 10
```

Total:

```txt
final_reviewed_total_score = sum(admin category scores)
```

Important decision: Admin should **not manually type only one total score**. Admin should set category scores, and backend computes the total. This keeps Excel explainable and auditable.

**How This Connects To Excel**

The official Excel template currently has these columns:

```txt
Название ТЗ
Организация
Эксперт
Стратегическая релевантность (20%)
Цель и задачи (10%)
Научная новизна (15%)
Практическая применимость (20%)
Ожидаемые результаты (15%)
Соц-экономический эффект (10%)
Реализуемость (10%)
Итоговый балл
Комментарий эксперта
```

So official Excel export should use:

```txt
final_reviewed_evaluation_scorecard
```

If Admin has not reviewed yet, we can show a **draft Excel preview** using:

```txt
ai_preliminary_evaluation_scorecard
```

But official approved Excel should use final reviewed scores.

**Should Excel Include AI Diagnostic Score Too?**

Recommended:

For MVP:
- keep official Excel exactly aligned with the template;
- do not add diagnostic columns to the main sheet.

For extended version:
- add a second sheet named `AI Analysis`;
- include:
  - `ai_document_analysis_total_score`;
  - Structure;
  - Completeness;
  - Clarity;
  - KPI / Results;
  - Consistency;
  - top findings;
  - top recommendations.

This keeps the official evaluation clean while preserving AI diagnostic value.

**Frontend View**

Client should see two score panels:

```txt
AI Document Diagnosis
- Structure
- Completeness
- Clarity
- KPI / Results
- Consistency
- Total diagnostic score
```

```txt
AI Preliminary Evaluation
- Strategic relevance
- Goals and tasks
- Scientific novelty
- Practical applicability
- Expected results
- Socio-economic effect
- Feasibility
- Total preliminary score
```

Admin should see three areas:

```txt
AI Document Diagnosis
read-only
```

```txt
AI Preliminary Evaluation
read-only draft
```

```txt
Final Expert Review
editable official rubric scores
computed total
expert comment
decision: approved / rejected / needs_revision
```

**Does Our Current System Cover This?**

Yes, after the recent docs update it does:

- `PLAN.md` defines the three scorecards.
- `ARCHITECTURE.md` defines scorecards and scorecard items in ERD.
- `AGENTS.md` says not to collapse these scores into one.
- `ai-service/` template already reserves:
  - `ai_document_analysis_scorecard`;
  - `ai_preliminary_evaluation_scorecard`.

One thing still missing in implementation later:
- backend must persist all three scorecard types;
- backend must validate category max values;
- backend must compute totals;
- XLSX exporter must use `final_reviewed_evaluation_scorecard` for official export.

**Final Recommendation**

Use this canonical rule:

```txt
AI diagnostic score = document quality health.
AI preliminary score = draft Excel-rubric evaluation.
Final reviewed score = official expert Excel-rubric evaluation.
```