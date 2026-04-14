# Разбор Технического Задания

**User:** @dotpep (pepelnine@gmail.com)  
**Created:** 4/14/2026 11:00:17  
**Updated:** 4/14/2026 22:41:54  
**Exported:** 4/14/2026 23:05:03  
**Link:** [https://chatgpt.com/g/g-p-69ddd7d590e4819186e77b6f39094599-ht3-lab-satpayev-uni-2026-04-14-hackathon/c/69ddd7ef-a2e8-8393-80c3-1dc4273230cf](https://chatgpt.com/g/g-p-69ddd7d590e4819186e77b6f39094599-ht3-lab-satpayev-uni-2026-04-14-hackathon/c/69ddd7ef-a2e8-8393-80c3-1dc4273230cf)  

## Prompt:
4/14/2026, 11:00:17 AM

ТЗ\_официальное (1).docx

Document

сделай разбор технического задания!

## Response:
4/14/2026, 11:00:17 AM

Сначала разберу само ТЗ по смыслу: что именно требуется, где есть сильные стороны, где не хватает конкретики, и как это превратить в победный хакатонный scope.

> **Reading and analyzing SKILL.md document**
>
>
> **Considering citation approach and finalizing details**
>
> It seems like line numbers are tricky to pinpoint right now, so I might just go with a general citation. The instructions say to cite properly, and I think mclick output might not give precise lines, but I could still mark it with a proper citation. I'll finalize my approach to fit the guidelines better.
>
> **Breaking down project requirements and addressing inconsistencies**
>
> I'll structure the breakdown by focusing on the problem, must-have features, AI needs, architecture, deliverables, scoring, hidden ambiguities, MVP recommendation, and risks. Also, there seems to be a date discrepancy between 2025 and 2026. I’ll note this issue, likely in Russian, and cite the referenced file where necessary.
>
> Thought for 43s

Вот разбор твоего ТЗ.

По сути это ТЗ на **AI-прототип**, который принимает документ с техническим заданием, анализирует его структуру и содержание, находит проблемы, дает рекомендации, оценивает качество и помогает сформировать улучшенную версию документа. Важный момент: это именно **хакатонный прототип**, а не промышленная enterprise-система. В документе прямо зафиксированы загрузка файлов, AI-анализ, поиск ошибок и пробелов, генерация структуры, scoring и итоговый отчет. Также отдельно сказано, что применение AI является обязательным.

ТЗ\_официальное (1)

Что от вас реально хотят
------------------------

Из ТЗ видно, что жюри ожидает не просто “чат с GPT”, а **понятный прикладной инструмент** с демонстрацией ценности. Минимум, который должен быть виден на демо:

*   загрузка ТЗ;
*   разбор структуры документа;
*   выявление проблемных мест;
*   рекомендации по улучшению;
*   итоговая оценка качества;
*   генерация улучшенной версии или структуры;
*   работающий AI-модуль как отдельная ценность проекта.
    ТЗ\_официальное (1)

То есть ваш продукт должен отвечать на вопрос:  
**“Почему этот документ плохой, где именно он слабый, и как его исправить?”**

Сильные стороны самого ТЗ
-------------------------

Это ТЗ довольно удачное для хакатона, потому что:

*   проблема понятная и прикладная;
*   AI нужен не формально, а по делу;
*   результат можно показать за 2–5 минут на демо;
*   есть понятные deliverables: прототип, AI-модуль, презентация, архитектура, GitHub, описание проблемы/решения/аудитории/внедрения.
    ТЗ\_официальное (1)

Еще плюс в том, что критерии оценки явно смещены в сторону:

*   AI,
*   практической пользы,
*   работоспособности,
*   функциональности,
*   архитектуры,
*   презентации.
    ТЗ\_официальное (1)

Это значит, что выигрывает не тот, кто сделал “самый сложный ML”, а тот, кто сделал **понятный, полезный и хорошо показанный продукт**.

Что в ТЗ неоднозначно или расплывчато
-------------------------------------

Вот где у ТЗ есть слабые места как у постановки:

### 1\. Не определено, что такое “качественное ТЗ”

Там есть требования искать:

*   размытые формулировки,
*   отсутствующие требования,
*   несоответствия,
*   ошибки,
*   KPI,
*   ожидаемые результаты.
    ТЗ\_официальное (1)

Но не сказано:

*   по каким именно правилам это оценивается;
*   что считается обязательным разделом;
*   какой шаблон ТЗ берется за основу;
*   как объяснять score 0–100;
*   по каким доменам работает система: НИОКР, гранты, software, закупки, лаборатории?

Это значит, что **вам самим придется задать методику оценки**. И это не минус — это возможность. Если вы покажете собственную прозрачную rubric, это усилит проект.

### 2\. Нет четкого формата итогового отчета

Написано “формирование итогового отчета”, но не сказано:

*   в каком формате,
*   насколько подробного,
*   нужен ли PDF,
*   нужны ли ссылки на фрагменты исходного текста.
    ТЗ\_официальное (1)

Для хакатона это хорошо: можно сделать отчет в удобном для вас формате.

### 3\. “Генерация примера ТЗ” и “генерация улучшенной версии” — рискованно

Это звучит эффектно, но в 24 часа легко уйти в слишком большую задачу. Документ требует и рекомендаций, и пример ТЗ, и улучшенную версию.

ТЗ\_официальное (1)

На практике лучше не пытаться делать “полноценный автопереписыватель всего документа”, а сделать:

*   улучшение по секциям,
*   suggested rewrite,
*   skeleton template,
*   patch-режим: “было / стало / почему”.

Такой подход будет реалистичнее и убедительнее.

Что является must-have для MVP
------------------------------

Если резать scope до победного MVP, я бы оставил 6 ключевых функций:

1.  **Загрузка документа**  
    PDF/DOCX/TXT.
    ТЗ\_официальное (1)
2.  **Парсинг и разбиение на разделы**  
    Например: цель, задачи, сроки, требования, KPI, ожидаемые результаты, ресурсы.
3.  **Проверка полноты и структуры**  
    Есть ли обязательные блоки, чего не хватает. Это прямо отражено в ТЗ.
    ТЗ\_официальное (1)
4.  **AI-анализ качества текста**  
    Размытые формулировки, логические противоречия, непроверяемые требования, отсутствие метрик.
    ТЗ\_официальное (1)
5.  **Score + объяснение score**  
    Не просто “62/100”, а по критериям:
    *   структура,
*   полнота,
*   измеримость,
*   логичность,
*   конкретность,
*   реализуемость.
    6.  **Рекомендации + улучшенная секция**  
    Например:
    *   что плохо,
*   почему плохо,
*   как переписать,
*   пример исправленного текста.

Вот это уже будет сильный продукт.

Что можно не делать полностью
-----------------------------

Чтобы не утонуть, я бы не делал в полном объеме:

*   сложную user registration/auth;
*   полноценную историю документов с большим личным кабинетом;
*   OCR как отдельный тяжелый модуль, если PDF не сканированный;
*   ML-рекомендатель с обучением;
*   мобильное приложение;
*   идеальную генерацию всего ТЗ с нуля.
    ТЗ\_официальное (1)

В ТЗ это перечислено как возможные/рекомендуемые части, но для хакатона важнее рабочая демонстрация core value.

Как я бы интерпретировал AI-часть
---------------------------------

ТЗ требует обязательное применение AI и перечисляет варианты:

*   NLP,
*   LLM,
*   классификация разделов,
*   проверка полноты,
*   генерация структуры,
*   чат-бот,
*   рекомендации,
*   проверка соответствия требованиям грантов/НИОКР.
    ТЗ\_официальное (1)

Самая сильная и реалистичная комбинация для хакатона:

*   **LLM для анализа и рекомендаций**;
*   **rule-based слой** для объективной проверки структуры;
*   **scoring rubric** для прозрачности;
*   **chat assistant** как дополнительный интерфейс, а не как ядро продукта.

То есть не “AI ради AI”, а гибрид:

*   правила проверяют формальные вещи,
*   LLM объясняет качество и предлагает улучшения.

Это будет выглядеть взрослее, чем один большой prompt.

Разбор рекомендуемой архитектуры
--------------------------------

В ТЗ предлагаются:

*   Frontend,
*   Backend API,
*   AI-модуль,
*   база данных,
*   модуль анализа документов,
*   модуль генерации отчетов.
    ТЗ\_официальное (1)

Это хорошая логика. Для хакатона я бы упростил до 5 блоков:

**1\. Frontend**  
Одна страница:

*   upload,
*   результат анализа,
*   score,
*   рекомендации,
*   улучшенная версия,
*   чат.

**2\. Backend API**  
Оркестрация:

*   прием файла,
*   парсинг,
*   вызов AI,
*   сбор отчета.

**3\. Document Analyzer**  
Извлечение текста, секций, ключевых сущностей.

**4\. AI Engine**  
Промпты/LLM:

*   анализ качества,
*   генерация рекомендаций,
*   rewrite.

**5\. Report Generator**  
JSON/HTML/PDF-output.

База данных нужна только если вы реально делаете историю документов. Если времени мало — можно даже временно хранить без полноценной БД, хотя в ТЗ БД рекомендована.

ТЗ\_официальное (1)

На что жюри будет смотреть в реальности
---------------------------------------

Судя по баллам, максимальный эффект даст такая стратегия:

*   показать, что AI реально работает;
*   показать реальную пользу;
*   сделать стабильное демо без сбоев;
*   дать красивый и понятный интерфейс;
*   объяснить архитектуру без перегруза.
    ТЗ\_официальное (1)

Самые дорогие критерии — это:

*   AI — 15,
*   практическая полезность — 15,
*   работоспособность — 15.
    ТЗ\_официальное (1)

Это очень важный сигнал:  
**лучше сделать меньше функций, но чтобы они работали уверенно и были ценны пользователю.**

Где можно усилить проект сверх ТЗ
---------------------------------

Вот что может сделать ваш проект заметно сильнее:

### Прозрачная методика оценки

Не просто score, а:

*   структура — 20
*   полнота — 20
*   измеримость — 20
*   логичность — 20
*   формулировки — 20

### Подсветка проблем по тексту

Например:

*   “размытая формулировка”;
*   “нет KPI”;
*   “не определен результат”;
*   “нет критерия приемки”.

### Режим “было / стало”

Это сильно для демо:

*   исходный фрагмент;
*   замечание;
*   улучшенная версия.

### Шаблоны по типу проекта

Например:

*   научный проект,
*   НИОКР,
*   грантовая заявка,
*   software/dev project.

Тогда вы покажете, что система не просто анализирует абстрактный текст, а работает в прикладном контексте.

Основные риски
--------------

Главные риски тут такие:

### 1\. Слишком широкий scope

В ТЗ много функций. Если пытаться закрыть все, продукт получится сырой.

### 2\. Непрозрачный score

Если вы покажете балл без объяснения, жюри может не поверить в систему.

### 3\. Просто чат вместо системы

Если интерфейс будет выглядеть как “вставь текст — получи ответ LLM”, это может выглядеть слабо.

### 4\. Слабая демонстрация пользы

Нужно показать не только анализ, но и **конкретное улучшение документа**.

Мой вывод по ТЗ
---------------

Это **хорошее хакатонное ТЗ**, потому что оно:

*   решает реальную проблему;
*   хорошо ложится на LLM/NLP;
*   позволяет быстро сделать MVP;
*   дает пространство для сильной презентации.
    ТЗ\_официальное (1)

Но у него есть и важная особенность:  
оно **не задает точную методику оценки качества ТЗ**, поэтому ваша команда должна сама придумать понятную модель проверки. И именно это может стать вашим главным преимуществом.

Что я бы рекомендовал как финальную формулу проекта
---------------------------------------------------

Лучший вариант позиционирования:

**AI-система, которая**

*   проверяет полноту и структуру ТЗ,
*   находит слабые и неформализованные места,
*   объясняет риски,
*   выставляет прозрачную оценку,
*   предлагает улучшенный вариант формулировок,
*   помогает быстро привести ТЗ к качественному виду.

Это идеально попадает в постановку задачи, описанные функции и ожидаемый результат ТЗ.

ТЗ\_официальное (1)

Могу следующим сообщением сразу сделать тебе еще и **разбор в формате: MVP / архитектура / user flow / что показать на демо / как набрать максимум баллов**.

## Prompt:
4/14/2026, 11:04:52 AM

есть ли уже существующие сервисы или проекты в интернете? которые совпадают с описанием в ТЗ в какой то степени.

## Response:
4/14/2026, 11:04:56 AM

Проверю существующие продукты по нескольким корзинам: AI для анализа требований/ТЗ, AI для контрактов и документов, и academic/grant-writing assistants. Потом отфильтрую то, что реально похоже на ваш кейс.

Уже видно, что прямые аналоги есть, но в основном по соседним сегментам: requirements engineering, technical writing governance и grant writing. Сейчас доберу open-source и пойму, есть ли кто-то именно близкий к “проверке ТЗ + score + рекомендации + генерация улучшений”.

> **Searching for AI tools for document analysis and compliance**
>
> [AI driven requirements management | IBM Watson IoT](https://www.ibm.com/internet-of-things/learn/requirements-management-ai/)
> [How to Use AI to Write Better Grant Proposals](https://www.instrumentl.com/blog/grant-writing-with-ai)
> [We Tested 10 AI Grant Writing Tools on a Real Grant](https://www.grantable.co/blog/best-ai-grant-writing-tools-tested)
> [Grantable — AI Grant Writing & Management Platform](https://grantable.co/)
> [Mobbing with AI - Work Life by Atlassian](https://www.atlassian.com/blog/atlassian-engineering/mobbing-with-ai)
> [Perforce ALM (Helix ALM) Requirements Management](https://www.perforce.com/products/helix-requirements-management)
>
> **Looking for specific services or projects related to TZ**
>
> I think I'll need to refine my search to focus on platforms related to Acrolinx/Writer and possibly explore GitHub projects, both open-source and research-related. The user is asking about services matching TZ in some way, but it seems there aren't any mainstream ones specifically for scientific TZ in the Russian context. I'll check more carefully.
>
> **Searching for AI-driven documentation and requirements platforms**
>
> [Product and Technical Documentation With Acrolinx](https://www.acrolinx.com/for-product/)
> [The big book of agentic enterprise AI use cases](https://writer.com/guides/ai-use-cases/)
> [Free AI Requirements Writing Tool](https://reqi.io/rex)
>
> **Searching for open source GitHub projects on requirements analysis**
>
> [noumantechie/req-analyzer-ai](https://github.com/noumantechie/req-analyzer-ai)
> [How I Built an AI Assistant for GitHub | by PeterCat](https://medium.com/%40petercat.assistant/from-2-a-m-frustrations-to-smarter-repositories-how-i-built-an-ai-assistant-for-github-b7d6e641aa1d)
> [Using AI tools for SE, from Requirements Generation and ...](https://www.incose.org/wp-content/uploads/2026/01/presentation_528.pdf)
> [I Let an AI Agent Review My GitHub Repos](https://dev.to/aws-builders/i-let-an-ai-agent-review-my-github-repos-72)
> [Building and Deploying Repository-Specific AI Assistants ...](https://www.zenml.io/llmops-database/building-and-deploying-repository-specific-ai-assistants-for-github)
> [Accelerate developer productivity with these 9 open source ...](https://github.blog/open-source/accelerate-developer-productivity-with-these-9-open-source-ai-and-mcp-projects/)
> [How to build a GitHub PR review agent that analyses your ...](https://xpander.ai/blog/how-to-build-a-github-pr-review-agent-that-analyses-your-repo-auto-merges-more)
> [github-research-assistant — AI Skill — Termo](https://termo.ai/skills/github-research-assistant)
> [Production Multi-Agent GitHub Repository Health Analyzer](https://app.readytensor.ai/publications/drrepo-production-multi-agent-github-repository-health-analyzer-ou5iM8bN9ej8)
> [How AI Assistants Can Decode GitHub Repos for UI Writers](https://www.docker.com/blog/ai-for-ui-writers/)
> [Digital requirements engineering with an INCOSE-derived ...](https://arxiv.org/html/2410.21288v1)
>
> **Looking for grant features or technical analysis**
>
> I think I should focus on searching for specific features related to grant opportunities or tools like Instrumentl. It might also help to look into official resources on scientific grants or technical assignments, especially within the Russian context. I'm not sure if OpenAI is needed here, though. I’ll refine my search.
>
> **Searching for grant proposal and checklist extraction tools**
>
> [Grantable — AI Grant Writing & Management Platform](https://grantable.co/)
> [mlcourse_open/data/howpop_test.csv at master](https://github.com/zikrach/mlcourse_open/blob/master/data/howpop_test.csv)
> [Product](https://www.grantable.co/product)
>
> **Categorizing and citing relevant services or projects**
>
> I need to confirm that there are existing services or projects, and categorize them based on the user’s TZ requirements. While there isn’t a niche for scientific technical assignments in Russia/Kazakhstan, there are analogs available. I’ll cite all factual statements properly, including from the uploaded document. I'll also ensure minimal use of formatting without raw URLs. Let’s keep it concise but useful!
>
> Thought for 1m 2s

Да — такие сервисы и проекты уже есть, но **в основном не как точная копия вашего ТЗ**, а как близкие аналоги по отдельным частям: проверка требований, анализ технической документации, review/grant/RFP документов, генерация рекомендаций и улучшений. По вашему ТЗ это совпадает с идеей “загрузка документа → анализ структуры/полноты → поиск слабых мест → рекомендации → улучшенная версия/score”

ТЗ\_официальное (1)

Самый близкий коммерческий аналог, который я нашёл, это **Reqi / REX**. У них прямо заявлено, что инструмент анализирует требования по INCOSE 42-Point Guide, умеет загружать документ, извлекать требования, находить пробелы, неоднозначности и предлагать улучшения. Это очень близко к части вашего ТЗ про выявление размытых формулировок, отсутствующих требований и quality scoring. [Reqi+2Reqi+2](https://reqi.io/rex?utm_source=chatgpt.com)

В enterprise-сегменте близко подходят **IBM Engineering Requirements Management** и **IBM Engineering Rhapsody**. IBM продвигает AI для более точного управления требованиями, сокращения цикла и повышения качества, а Rhapsody отдельно пишет про извлечение use cases и actors из natural-language requirements с улучшением анализа и согласованности спецификаций. Это не “анализ ТЗ научных проектов” в чистом виде, но по духу это очень близко к системе проверки и структурирования требований. [IBM+1](https://www.ibm.com/internet-of-things/learn/requirements-management-ai/?utm_source=chatgpt.com)

Для блока “качество документа, ясность, compliance, consistency” близок **Acrolinx**. Он не про ТЗ научных проектов напрямую, а про technical/product documentation, но умеет AI-driven quality checks и подсказки по clarity, consistency и compliance. Это хороший аналог именно слоя “проверка качества текста и рекомендаций”. [Acrolinx+2Acrolinx+2](https://www.acrolinx.com/for-product/?utm_source=chatgpt.com)

Для части, связанной с **грантовыми заявками, RFP и научно-проектными документами**, близки **Grantable** и **Instrumentl**. Grantable умеет загружать RFP, автоматически превращать требования в checklist, помогать с drafting/revision и работать по секциям; Instrumentl продвигает Apply Advisor как AI writing partner для proposal refinement и alignment с требованиями funder. Это уже очень близко к вашему кейсу по НИОКР/грантам, только фокус у них больше на proposal writing, а не на универсальном “анализаторе ТЗ”. [instrumentl.com+4Grantable+4Grantable+4](https://grantable.co/?utm_source=chatgpt.com)

Есть и open-source/демо-проекты, которые совпадают с задачей частично. Например, **req-analyzer-ai** описывает себя как AI assistant для анализа, валидации и улучшения software requirements documents: поиск неоднозначностей, приоритизация, генерация use case diagrams и Q&A по документу. Есть **RequirementLinter**, который review’ит и улучшает user stories и requirements. Есть **ai-document-review**, который позиционируется как agentic accelerator для review документов в доменах, где важны compliance и accuracy. Ещё есть **sample-grants-genai-assistant** от AWS Samples для помощи исследователям с funding opportunities и улучшением narratives. [GitHub+3GitHub+3GitHub+3](https://github.com/noumantechie/req-analyzer-ai?utm_source=chatgpt.com)

Мой вывод такой: **да, рынок уже занят соседними решениями**, но я не увидел явного доминирующего продукта именно в формулировке вашего ТЗ:  
“AI-система для анализа и улучшения технических заданий научных проектов с проверкой структуры, полноты, KPI, логики, score и генерацией улучшенной версии”.  
Сейчас аналоги распадаются на 3 группы:

1.  requirements engineering tools,
2.  technical writing/compliance tools,
3.  grant/RFP writing assistants. [Reqi+2Acrolinx+2](https://reqi.io/?utm_source=chatgpt.com)

То есть для хакатона это даже хорошо: у вас есть подтверждение, что проблема **реальная и коммерчески валидная**, но при этом остаётся пространство для дифференциации. Самая сильная ниша для позиционирования — сделать продукт не просто “ещё один AI writer”, а **AI reviewer + AI structurer + AI improver именно для ТЗ/НИОКР/грантовых научных документов**. Это будет заметно уже по позиционированию на фоне Reqi, Acrolinx и Grantable. [Reqi+2Acrolinx+2](https://reqi.io/?utm_source=chatgpt.com)

Если хочешь, я могу следующим сообщением сделать тебе ещё более полезную штуку:  
**сравнительную матрицу “ваше ТЗ vs Reqi vs Acrolinx vs Grantable vs open-source проекты” и показать, где у вас уникальность.**

## Prompt:
4/14/2026, 11:56:37 AM

дай мне сервисы/модули в моно репозиторий, так же дай мне Functional Requirements, на основе ТЗ, технический стэк: React + Next frontend, backend golang + postgres, и LLM/ML/AI/AGENT python fastapi services, Cloud and Infrastructure as AWS and Terraform.

функционал по типа:
авторизация, 
чат
и тд

модули в Монорепо по типу основной бэкенд, фроненд, питон сервис LLM.

## Response:
4/14/2026, 11:56:45 AM

Соберу это как проектную структуру: модули монорепы, сервисы, bounded contexts и Functional Requirements, чтобы это уже можно было превращать в repo skeleton и backlog.

> **Structuring answer with functional and technical details**
>
> I need to structure my answer carefully, possibly using a monorepo tree and grouping functional requirements. I'll recommend services/modules, outline responsibilities per service, and maybe include database tables like user auth, analysis, and reporting. I'll mention Go as the core API and Python for AI. Keep things structured, using headers and minimal bullets.
>
> Thought for 58s

Да. Ниже я собрал это в виде **нормальной продуктовой декомпозиции под монорепо**: какие сервисы нужны, какие модули внутри, и какие **Functional Requirements** вытекают из ТЗ. Основа ТЗ тут такая: система должна загружать PDF/Word/TXT, анализировать структуру ТЗ, проверять обязательные разделы, находить размытые формулировки, пропуски, логические ошибки, KPI/expected results, генерировать рекомендации, score, улучшенную версию, отчет, а также давать чат с AI и историю документов.

ТЗ\_официальное (1)

ТЗ\_официальное (1)

Сразу важный архитектурный вывод: хотя в ТЗ backend рекомендован на Python, это именно рекомендация, а не жесткое ограничение. В вашем стэке логично сделать **Go как основной backend/API**, **Python FastAPI как AI/ML layer**, **React/Next.js как frontend**, **Postgres как system of record**, а на AWS вынести storage, compute, secrets и observability. Это все соответствует самой идее из ТЗ: frontend, backend, AI-модуль, база данных, модуль анализа документов, модуль отчетов.

ТЗ\_официальное (1)

1\. Рекомендуемая high-level архитектура
----------------------------------------

Я бы делал систему из 4 основных runtime-компонентов:

1.  **Web App (Next.js)**
    *   UI для auth
    *   upload документов
    *   просмотр анализа
    *   чат
    *   история документов
    *   генерация improved version / report download
2.  **Core API (Go)**
    *   основной REST API
    *   auth / users / projects / documents / reports / chat sessions
    *   orchestration анализа
    *   взаимодействие с Postgres, S3, очередями, Python AI service
3.  **AI Service (Python FastAPI)**
    *   NLP / LLM / classification / extraction / scoring / recommendations
    *   chat orchestration
    *   section classification
    *   rewrite / structure generation
    *   optional OCR post-processing / embeddings / retrieval
4.  **Data/Infra**
    *   Postgres
    *   S3-compatible object storage
    *   Redis / queue
    *   Terraform + AWS
    *   observability/logging/secrets

* * *

2\. Монорепо: рекомендуемая структура
-------------------------------------

Я бы предложил такую структуру:

```
repo/
  apps/
    web/                      # Next.js frontend
    api/                      # Go backend API
    ai-service/               # Python FastAPI LLM/NLP service
    worker/                   # optional Go or Python background jobs

  packages/
    ui/                       # shared React UI kit
    config/                   # shared config schemas/env templates
    types/                    # shared DTO/contracts (TS/OpenAPI generated)
    prompts/                  # prompt templates, evaluation rubrics
    docs/                     # ADR, architecture docs, product docs

  services/
    parsing/                  # optional isolated parsing/OCR logic
    reporting/                # optional isolated PDF/HTML report generation
    indexing/                 # optional embeddings/vector indexing

  infrastructure/
    terraform/
      modules/
        network/
        security/
        rds/
        s3/
        ecs/
        ecr/
        redis/
        secrets/
        monitoring/
      envs/
        dev/
        staging/
        prod/
    docker/
    github/
    scripts/

  database/
    migrations/
    seeds/
    schemas/

  openapi/
    api.yaml                  # Go API contract
    ai-service.yaml           # Python AI contract

  .github/
    workflows/
```

Для хакатона можно упростить до:

```
apps/web
apps/api
apps/ai-service
database/migrations
infrastructure/terraform
packages/ui
packages/prompts
```

* * *

3\. Какие сервисы реально нужны
-------------------------------

### A. `apps/web` — Frontend

Это Next.js приложение.

Основные экраны:

*   Landing / Home
*   Sign in / Sign up
*   Dashboard
*   Upload document
*   Analysis result
*   Document history
*   Chat assistant
*   Report preview / download
*   Improved version view
*   Profile / settings

Основные frontend-модули:

*   `auth`
*   `documents`
*   `analysis`
*   `chat`
*   `reports`
*   `history`
*   `settings`

### B. `apps/api` — Основной Go backend

Это главный orchestration-сервис.

Его зоны ответственности:

*   auth/session/token management
*   users/projects/documents CRUD
*   file metadata
*   job orchestration
*   вызов AI service
*   хранение analysis results
*   report requests
*   chat persistence
*   audit/logging
*   admin endpoints

### C. `apps/ai-service` — Python FastAPI

Это отдельный AI/NLP/LLM слой.

Его зоны ответственности:

*   document section classification
*   requirement extraction
*   ambiguity detection
*   completeness check
*   KPI/result extraction
*   inconsistency detection
*   scoring
*   recommendation generation
*   improved text generation
*   chat reasoning
*   template comparison
*   optional embeddings / retrieval

### D. `worker`

Нужен, если вы не хотите делать тяжелые операции синхронно.

Нагрузочные задачи:

*   doc parsing
*   OCR
*   long-running analysis
*   report PDF generation
*   embeddings indexing
*   email/notification later, если понадобится

Для hackathon MVP можно и без отдельного worker, но для нормальной архитектуры он полезен.

* * *

4\. Модули внутри Go backend
----------------------------

Вот это я бы заложил как bounded contexts в `apps/api/internal`:

```
internal/
  auth/
  users/
  organizations/      # optional
  projects/
  documents/
  uploads/
  analysis/
  scoring/
  recommendations/
  templates/
  reports/
  chat/
  ai/
  jobs/
  audit/
  common/
```

### Что делает каждый модуль

**auth**

*   registration
*   login
*   refresh tokens
*   password reset
*   role-based access

**users**

*   profile
*   account settings
*   preferences

**projects**

*   grouping documents by project/grant/research topic
*   optional: team collaboration

**documents**

*   upload metadata
*   file versions
*   source text
*   parsed sections
*   status lifecycle

**uploads**

*   S3 upload/init
*   file validation
*   mime detection
*   antivirus hook optional

**analysis**

*   start analysis
*   get analysis result
*   rerun analysis
*   status of pipeline

**scoring**

*   score rubric
*   score explanation
*   subscores per category

**recommendations**

*   issues list
*   suggestions
*   severity / priority
*   suggested rewrites

**templates**

*   standard section templates
*   reference structures
*   domain-specific templates

**reports**

*   build HTML/PDF report
*   export summary
*   download endpoints

**chat**

*   conversation sessions
*   context injection from analyzed document
*   ask-about-document mode

**ai**

*   client to Python FastAPI
*   retries, timeouts, idempotency
*   prompt version tracking

**jobs**

*   async processing
*   queue status
*   background pipeline execution

**audit**

*   who uploaded what
*   when analysis ran
*   report generation logs

* * *

5\. Модули внутри Python FastAPI AI service
-------------------------------------------

Я бы не делал один giant `main.py`. Лучше так:

```
app/
  api/
    routes/
      health.py
      analyze.py
      score.py
      rewrite.py
      chat.py
      extract.py
      templates.py

  core/
    config.py
    logging.py
    security.py

  domain/
    document.py
    analysis.py
    score.py
    recommendation.py
    chat.py

  services/
    parser_service.py
    section_classifier.py
    completeness_service.py
    ambiguity_service.py
    inconsistency_service.py
    kpi_extractor.py
    scoring_service.py
    recommendation_service.py
    rewrite_service.py
    chat_service.py
    template_match_service.py
    retrieval_service.py
    ocr_service.py

  providers/
    llm_provider.py
    embedding_provider.py
    ocr_provider.py

  prompts/
    analyze/
    score/
    rewrite/
    chat/
    templates/

  schemas/
    analyze.py
    chat.py
    score.py
```

* * *

6\. Functional Requirements на основе ТЗ
----------------------------------------

Ниже — уже почти готовый список для PRD/SRS/backlog.

FR-01. Authentication and User Management
-----------------------------------------

Система должна позволять пользователю:

*   зарегистрироваться;
*   войти в систему;
*   выйти из системы;
*   восстановить доступ;
*   просматривать и редактировать профиль.

Это следует из требования регистрации и авторизации пользователей.

ТЗ\_официальное (1)

### Подфункции

*   email/password auth
*   JWT/refresh token
*   RBAC: `user`, `admin`

* * *

FR-02. Document Upload and Storage
----------------------------------

Система должна позволять загружать ТЗ в форматах:

*   PDF
*   DOCX/Word
*   TXT

После загрузки система должна:

*   валидировать тип файла;
*   сохранять исходный файл;
*   извлекать текст;
*   создавать запись документа в БД.
    ТЗ\_официальное (1)

### Подфункции

*   upload status
*   parsing status
*   original file retention
*   re-upload new version

* * *

FR-03. Document Parsing and Structure Detection
-----------------------------------------------

Система должна уметь:

*   извлекать текст из загруженного документа;
*   разбивать документ на секции;
*   анализировать структуру;
*   выделять разделы и подзаголовки.

Это прямо заложено в анализ структуры загруженного документа.

ТЗ\_официальное (1)

### Подфункции

*   heading detection
*   section segmentation
*   metadata extraction
*   optional OCR for scanned PDFs

* * *

FR-04. Mandatory Section Validation
-----------------------------------

Система должна проверять наличие обязательных разделов ТЗ и указывать:

*   какие разделы присутствуют;
*   какие отсутствуют;
*   какие частично заполнены.

Это следует из пункта про проверку наличия обязательных разделов и проверку полноты документа.

ТЗ\_официальное (1)

ТЗ\_официальное (1)

### Примеры секций

*   цель
*   задачи
*   требования
*   сроки
*   KPI
*   ожидаемые результаты
*   ограничения
*   критерии приемки

* * *

FR-05. AI-based Text Analysis
-----------------------------

Система должна выполнять AI-анализ текста ТЗ и определять:

*   размытые формулировки;
*   отсутствующие требования;
*   логические ошибки;
*   внутренние несоответствия;
*   отсутствие KPI;
*   отсутствие expected outcomes.
    ТЗ\_официальное (1)

### Подфункции

*   issue classification
*   severity tagging
*   sentence-level issue marking
*   explanations per issue

* * *

FR-06. Requirement / KPI / Deadline Extraction
----------------------------------------------

Система должна автоматически выделять из документа:

*   требования;
*   сроки;
*   показатели KPI;
*   ожидаемые результаты.

Это прямо указано в AI-модуле ТЗ.

ТЗ\_официальное (1)

### Подфункции

*   requirement list extraction
*   measurable indicators extraction
*   due date extraction
*   expected outcome extraction

* * *

FR-07. Document Completeness and Template Matching
--------------------------------------------------

Система должна:

*   оценивать полноту ТЗ;
*   сравнивать документ с эталонными шаблонами;
*   определять, какие элементы отсутствуют относительно шаблона.
    ТЗ\_официальное (1)

### Подфункции

*   template selection by project type
*   completeness matrix
*   missing section recommendations

* * *

FR-08. Quality Scoring
----------------------

Система должна присваивать ТЗ score от 0 до 100 и объяснять его. ТЗ прямо требует оценку качества по шкале от 0 до 100 баллов.

ТЗ\_официальное (1)

### Рекомендуемые подсчеты

*   structure score
*   completeness score
*   clarity score
*   measurability score
*   consistency score
*   result-orientation score

### Важно

Не делайте только один итоговый балл. Нужен breakdown, иначе система будет выглядеть “магической”.

* * *

FR-09. Recommendation Generation
--------------------------------

Система должна генерировать рекомендации по улучшению ТЗ. Это прямо указано в ТЗ.

ТЗ\_официальное (1)

### Подфункции

*   issue → recommendation mapping
*   grouped recommendations by section
*   quick fixes vs major fixes
*   recommendation priority

* * *

FR-10. Improved Version / Rewrite Generation
--------------------------------------------

Система должна уметь:

*   предлагать улучшенную формулировку отдельных фрагментов;
*   генерировать улучшенную версию раздела;
*   формировать улучшенную версию документа целиком или частично.
    ТЗ\_официальное (1)

### Практически для MVP

Лучше сделать:

*   rewrite by section
*   rewrite selected paragraph
*   generate improved structure + sample text

* * *

FR-11. Recommended Structure Generation
---------------------------------------

Система должна автоматически формировать рекомендуемую структуру технического задания. Это прямо есть и в основных задачах, и в AI-части ТЗ.

ТЗ\_официальное (1)

### Подфункции

*   skeleton by domain
*   ordered sections
*   section descriptions
*   examples of what to include

* * *

FR-12. Example Technical Specification Generation
-------------------------------------------------

Система должна генерировать пример ТЗ на основе:

*   шаблона;
*   выбранного типа проекта;
*   требований пользователя.
    ТЗ\_официальное (1)

### Подфункции

*   start from blank template
*   start from project description
*   generate first draft

* * *

FR-13. Final Report Generation and Download
-------------------------------------------

Система должна формировать итоговый отчет по результатам анализа и позволять его скачать. Это прямо указано в ТЗ.

ТЗ\_официальное (1)

ТЗ\_официальное (1)

### Содержимое отчета

*   summary
*   score
*   found issues
*   missing sections
*   extracted requirements/KPI/results
*   recommendations
*   optional improved fragments

### Форматы

*   HTML for UI
*   PDF for export
*   JSON for API

* * *

FR-14. AI Chat Assistant
------------------------

Система должна предоставлять чат с AI-ассистентом, через который пользователь может:

*   задавать вопросы по своему ТЗ;
*   просить пояснить ошибки;
*   просить переписать фрагмент;
*   просить сгенерировать структуру;
*   получать guidance по заполнению секций.
    ТЗ\_официальное (1)
    ТЗ\_официальное (1)

### Режимы чата

*   general assistant
*   document-aware assistant
*   section rewrite assistant
*   checklist assistant

* * *

FR-15. Document History
-----------------------

Система должна хранить историю загруженных документов и их анализов. Это явно указано в ТЗ.

ТЗ\_официальное (1)

### Подфункции

*   list of uploads
*   analysis timestamps
*   rerun analysis
*   version history
*   compare version A vs B

* * *

FR-16. Analysis Lifecycle Management
------------------------------------

Система должна показывать состояние обработки документа:

*   uploaded
*   parsing
*   analyzing
*   scored
*   report\_ready
*   failed

Это не прописано дословно в ТЗ, но необходимо для нормальной реализации требований анализа, отчета и UX.

* * *

FR-17. Admin / Template Management
----------------------------------

Для расширяемости нужен admin functionality:

*   управление эталонными шаблонами;
*   управление scoring rubric;
*   управление prompt versions;
*   просмотр системных логов анализа.

Это уже derived requirement, но очень полезный модуль.

* * *

7\. Основные API домены
-----------------------

### Go API endpoints

Примерно так:

```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
GET    /api/v1/me

POST   /api/v1/documents/upload
GET    /api/v1/documents
GET    /api/v1/documents/{id}
GET    /api/v1/documents/{id}/content

POST   /api/v1/documents/{id}/analyze
GET    /api/v1/documents/{id}/analysis
GET    /api/v1/documents/{id}/score
GET    /api/v1/documents/{id}/recommendations
POST   /api/v1/documents/{id}/rewrite
GET    /api/v1/documents/{id}/report
GET    /api/v1/documents/{id}/history

POST   /api/v1/chat/sessions
POST   /api/v1/chat/sessions/{id}/messages
GET    /api/v1/chat/sessions/{id}

GET    /api/v1/templates
POST   /api/v1/templates/{id}/generate
```

### Python AI endpoints

Примерно так:

```
POST /ai/v1/analyze
POST /ai/v1/score
POST /ai/v1/extract
POST /ai/v1/rewrite
POST /ai/v1/structure/generate
POST /ai/v1/template/compare
POST /ai/v1/chat/respond
GET  /ai/v1/health
```

* * *

8\. Таблицы в Postgres
----------------------

Минимальный набор:

```
users
sessions
projects
documents
document_versions
document_contents
document_sections
analysis_runs
analysis_findings
document_scores
recommendations
reports
chat_sessions
chat_messages
templates
audit_logs
```

### Ключевые поля

**documents**

*   id
*   user\_id
*   project\_id
*   title
*   original\_filename
*   mime\_type
*   storage\_key
*   status
*   created\_at

**analysis\_runs**

*   id
*   document\_id
*   status
*   model\_name
*   prompt\_version
*   started\_at
*   completed\_at

**analysis\_findings**

*   id
*   analysis\_run\_id
*   finding\_type
*   severity
*   section\_name
*   source\_text
*   explanation
*   recommendation

**document\_scores**

*   analysis\_run\_id
*   total\_score
*   structure\_score
*   completeness\_score
*   clarity\_score
*   consistency\_score
*   kpi\_score

* * *

9\. AWS + Terraform модули
--------------------------

Для AWS я бы предложил такую раскладку:

### Terraform modules

*   `network` — VPC, subnets, routing
*   `security` — SG, IAM
*   `rds` — PostgreSQL
*   `s3` — document/report storage
*   `ecs` — deploy web/api/ai/worker
*   `ecr` — container registry
*   `redis` — ElastiCache or self-managed
*   `secrets` — Secrets Manager / Parameter Store
*   `monitoring` — CloudWatch alarms/log groups
*   `dns` — Route53
*   `cdn` — CloudFront for frontend

### Где что запускать

*   **web**: Vercel или AWS ECS/Amplify
*   **api**: ECS Fargate
*   **ai-service**: ECS Fargate
*   **worker**: ECS service / one-off tasks
*   **db**: RDS PostgreSQL
*   **files**: S3
*   **secrets**: AWS Secrets Manager

Для hackathon MVP даже можно:

*   web на Vercel,
*   api + ai на ECS,
*   Postgres на RDS,
*   files на S3.

* * *

10\. Что я бы считал обязательным MVP
-------------------------------------

Если у вас мало времени, режьте до этого:

1.  auth
2.  upload PDF/DOCX/TXT
3.  parse text
4.  AI analysis
5.  score 0–100
6.  recommendations
7.  improved version by section
8.  report export
9.  chat over analyzed document
10.  history

Это почти полностью покрывает ТЗ и выглядит сильно на демо.

ТЗ\_официальное (1)

ТЗ\_официальное (1)

* * *

11\. Что можно отложить на post-MVP
-----------------------------------

*   team collaboration
*   comments/annotations between users
*   advanced admin panel
*   full OCR pipeline for low-quality scans
*   vector search over many documents
*   domain-specialized models
*   multi-tenant organizations
*   billing/subscriptions

* * *

12\. Моя итоговая рекомендация по монорепо
------------------------------------------

Если коротко, я бы выбрал такой каркас:

```
apps/
  web/          # Next.js
  api/          # Go REST API
  ai-service/   # Python FastAPI
  worker/       # background jobs

packages/
  ui/
  prompts/
  config/
  types/

database/
  migrations/

infrastructure/
  terraform/
```

А продуктово заложил бы 8 доменов:

*   Auth
*   Documents
*   Analysis
*   Scoring
*   Recommendations
*   Chat
*   Reports
*   Templates

Это очень хорошо бьется с ТЗ и вашим стеком.

ТЗ\_официальное (1)

Следующим сообщением я могу собрать для тебя уже **готовый skeleton монорепо в виде папок и README**, либо сразу сделать **backend modules + API contracts + database schema draft**.

## Prompt:
4/14/2026, 12:11:59 PM

дай мне общую архитектуру, ценность, уникальность, и также архитектурные диаграммы в plantuml по типу C4 Container Diagram, ERD и другое.

## Response:
4/14/2026, 12:12:04 PM

Соберу это как уже почти готовый architecture section для презентации и README: ценность, уникальность, high-level архитектура и набор PlantUML-диаграмм, которые можно сразу вставить в репозиторий.

> **Figuring out how to cite and provide PlantUML diagrams**
>
> Okay, there’s no line numbering in the Mclick output, which complicates citing. Maybe I can use file search citations without line ranges; previous assistant did that. For the diagrams, we’re looking at PlantUML code for architecture, ERD, and flow. I’ll stick with a concise overview, ensuring PlantUML syntax is correct.
>
> **Deciding between C4 and basic PlantUML diagrams**
>
> The user asked for a C4-style container diagram, but also preferred offline PlantUML. I’m thinking of providing both: a basic version without external includes like rectangles and a full C4 diagram with external links. I'll need to mention assumptions about the stack and align the diagrams with the user’s requirements.
>
> Thought for 39s

Ниже — уже готовый **architecture section** для презентации, README и защиты.

Основа решения хорошо ложится на ТЗ: системе нужны загрузка PDF/Word/TXT, анализ структуры, проверка обязательных разделов, AI-анализ текста, поиск размытых формулировок и пропусков, score 0–100, рекомендации, улучшенная версия, отчет, чат и история документов. Также в ТЗ отдельно зафиксированы frontend, backend API, AI-модуль, БД, модуль анализа документов и модуль генерации отчетов.

ТЗ\_официальное (1)

* * *

1\. Ценность продукта
=====================

Проблема
--------

Технические задания научных проектов часто пишутся неструктурированно, с размытыми формулировками, без четких требований, KPI и ожидаемых результатов. Это ухудшает реализацию проекта, закупки, разработку и отчетность.

ТЗ\_официальное (1)

Ценность
--------

Наш продукт превращает “сырой документ” в **проверяемое, более формализованное и улучшенное ТЗ**.

Он дает пользователю:

*   быструю проверку качества ТЗ;
*   объяснение, **что именно плохо**;
*   рекомендации, **как исправить**;
*   улучшенную структуру и текст;
*   score с понятной логикой;
*   AI-чат по конкретному документу.

Бизнес-ценность
---------------

Для вузов, НИОКР-центров, грантовых команд и стартапов это:

*   снижение числа слабых заявок и ТЗ;
*   ускорение подготовки документов;
*   стандартизация качества;
*   меньше ручного ревью;
*   более прозрачная подготовка к защите, гранту или запуску проекта.

* * *

2\. Уникальность
================

Прямых “идеальных копий” под ваше ТЗ почти нет. Сильнее всего продукт выглядит так:

Уникальность 1 — не просто AI writer, а AI reviewer + improver
--------------------------------------------------------------

Большинство решений либо просто генерируют текст, либо просто дают чат.  
У вас система:

*   анализирует структуру;
*   проверяет полноту;
*   находит проблемы;
*   оценивает качество;
*   предлагает rewrite;
*   формирует отчет.

Это прямо соответствует постановке из ТЗ.

ТЗ\_официальное (1)

Уникальность 2 — hybrid AI
--------------------------

Не один “магический prompt”, а гибрид:

*   rule-based checks;
*   шаблоны/эталоны;
*   NLP/LLM-анализ;
*   explainable scoring.

Уникальность 3 — фокус на научные проекты, НИОКР, гранты
--------------------------------------------------------

В ТЗ отдельно упомянуты научные и инновационные проекты, а также соответствие требованиям грантов и НИОКР.

ТЗ\_официальное (1)

Это дает нишевую специализацию, а не “общий AI для документов”.

Уникальность 4 — explainable score
----------------------------------

Не просто “63/100”, а:

*   структура;
*   полнота;
*   измеримость;
*   логичность;
*   качество формулировок;
*   наличие KPI и expected outcomes.

* * *

3\. Общая архитектурная идея
============================

Архитектурный стиль
-------------------

Лучше всего подходит **modular monolith + dedicated AI service**:

*   **Frontend**: React + Next.js
*   **Core Backend**: Go + REST API
*   **AI Service**: Python FastAPI
*   **DB**: PostgreSQL
*   **Object Storage**: S3
*   **Infra**: AWS + Terraform

Почему так
----------

ТЗ требует одновременно:

*   нормальный пользовательский интерфейс,
*   REST backend,
*   AI-модуль,
*   анализ документов,
*   генерацию отчетов.
    ТЗ\_официальное (1)

Поэтому оптимально разделить ответственность так:

*   **Next.js** — UX, dashboard, upload, analysis view, chat;
*   **Go API** — auth, documents, orchestration, persistence, report metadata;
*   **Python AI Service** — NLP/LLM, scoring, extraction, rewrite, chat reasoning;
*   **Postgres** — source of truth;
*   **S3** — файлы и отчеты.

* * *

4\. High-level архитектура
==========================

Главные подсистемы
------------------

1.  **Web App**
2.  **Core API**
3.  **AI Analysis Service**
4.  **Database**
5.  **Object Storage**
6.  **Optional Queue / Worker**
7.  **LLM Provider / ML Models**

Основной flow
-------------

1.  Пользователь логинится
2.  Загружает документ
3.  Файл сохраняется в S3
4.  Core API создает document + analysis run
5.  AI Service:
    *   извлекает структуру
    *   классифицирует секции
    *   проверяет полноту
    *   ищет ambiguities/inconsistencies
    *   извлекает KPI, сроки, expected outcomes
    *   считает score
    *   генерирует рекомендации и improved version
6.  Результат сохраняется в Postgres
7.  Frontend показывает analysis/report/chat

* * *

5\. Architectural decisions
===========================

ADR-01. Go как основной backend
-------------------------------

Почему:

*   быстрый REST API;
*   удобная orchestration-логика;
*   хорош для production backend;
*   проще держать как core business layer.

ADR-02. Python отдельным AI service
-----------------------------------

Почему:

*   легче интегрировать LLM/NLP стек;
*   проще работать с spaCy/Transformers/Pydantic/FastAPI;
*   отделяет AI-эксперименты от core API.

ADR-03. Postgres как main relational store
------------------------------------------

Почему:

*   хорошо подходит под users/documents/analysis/history/chat/report metadata;
*   транзакционность;
*   удобные relations.

ADR-04. S3 для файлов
---------------------

Почему:

*   исходные документы, промежуточные артефакты, PDF reports;
*   не надо хранить тяжелые бинарники в БД.

ADR-05. AI scoring должен быть explainable
------------------------------------------

Почему:

*   иначе жюри и пользователи не будут доверять результату;
*   score должен разлагаться по критериям.

* * *

6\. PlantUML — System Context Diagram
=====================================

```
@startuml
title AI System for Analysis and Improvement of Technical Specifications - System Context

actor "Researcher / Student /\nProject Author" as User
actor "Reviewer / Expert" as Reviewer
actor "Admin" as Admin

rectangle "AI System for Analysis and Improvement\nof Technical Specifications" as System {
}

rectangle "LLM Provider\n(OpenAI / Local Model)" as LLM
rectangle "Email / Notification Service" as Notify
rectangle "Object Storage\n(AWS S3)" as S3

User --> System : Upload document\nView score and recommendations\nChat with assistant
Reviewer --> System : Review results\nInspect report
Admin --> System : Manage templates\nMonitor system

System --> LLM : Prompt-based analysis\nRewrite / chat / scoring support
System --> S3 : Store original files\nStore generated reports
System --> Notify : Optional notifications

@enduml
```

* * *

7\. PlantUML — C4 Container Diagram
===================================

```
@startuml
title C4 Container Diagram - AI Technical Specification Analysis Platform
skinparam rectangleStyle rounded

actor "User" as user
actor "Admin" as admin

rectangle "System Boundary: AI TS Analysis Platform" {
  rectangle "Web App\nNext.js + React" as web
  rectangle "Core API\nGo REST API" as api
  rectangle "AI Service\nPython FastAPI" as ai
  database "PostgreSQL\nUsers, Documents,\nAnalysis, Chat, Reports" as db
  rectangle "Object Storage\nAWS S3" as s3
  queue "Job Queue / Worker\n(Optional)" as queue
}

rectangle "External LLM Provider\nOpenAI / Local LLM" as llm
rectangle "Observability\nCloudWatch / Grafana" as obs

user --> web : Uses via browser
admin --> web : Uses admin UI

web --> api : HTTPS / JSON API
api --> db : Read / write data
api --> s3 : Upload / download files
api --> ai : Analyze / rewrite / score / chat
api --> queue : Enqueue long jobs
queue --> ai : Async analysis jobs

ai --> llm : LLM inference
ai --> db : Store AI artifacts (optional)\nor return to API
ai --> s3 : Read source documents / write artifacts

api --> obs : Logs / metrics
ai --> obs : Logs / metrics

@enduml
```

* * *

8\. PlantUML — Component Diagram for AI Analysis Service
========================================================

```
@startuml
title AI Analysis Service - Component Diagram
skinparam rectangleStyle rounded

rectangle "AI Service (FastAPI)" {
  component "API Layer" as api
  component "Document Parser" as parser
  component "Section Classifier" as classifier
  component "Completeness Checker" as completeness
  component "Issue Detector\n(ambiguity / inconsistency / missing requirements)" as issues
  component "Extractor\n(KPI / deadlines / expected outcomes)" as extractor
  component "Scoring Engine" as scoring
  component "Recommendation Engine" as reco
  component "Rewrite Engine" as rewrite
  component "Chat Orchestrator" as chat
  component "Template Matcher" as template
  component "Prompt Registry" as prompts
}

database "PostgreSQL / Cache" as db
rectangle "LLM Provider" as llm
rectangle "Source File / Text" as source

api --> parser
parser --> classifier
classifier --> completeness
classifier --> template
parser --> issues
parser --> extractor
completeness --> scoring
issues --> scoring
extractor --> scoring
template --> scoring

scoring --> reco
issues --> reco
extractor --> reco
reco --> rewrite

chat --> prompts
reco --> prompts
rewrite --> prompts
issues --> llm
extractor --> llm
reco --> llm
rewrite --> llm
chat --> llm

api --> db
scoring --> db
reco --> db
rewrite --> db

source --> parser

@enduml
```

* * *

9\. PlantUML — ERD
==================

```
@startuml
title ERD - Core Data Model
hide methods
hide stereotypes
skinparam linetype ortho

entity users {
  *id : uuid
  --
  email : varchar
  password_hash : varchar
  full_name : varchar
  role : varchar
  created_at : timestamp
}

entity projects {
  *id : uuid
  --
  owner_user_id : uuid
  title : varchar
  description : text
  created_at : timestamp
}

entity documents {
  *id : uuid
  --
  project_id : uuid
  uploaded_by_user_id : uuid
  title : varchar
  original_filename : varchar
  mime_type : varchar
  storage_key : varchar
  status : varchar
  created_at : timestamp
}

entity document_versions {
  *id : uuid
  --
  document_id : uuid
  version_number : int
  storage_key : varchar
  extracted_text : text
  created_at : timestamp
}

entity document_sections {
  *id : uuid
  --
  document_version_id : uuid
  section_name : varchar
  section_order : int
  content : text
  detected_confidence : numeric
}

entity analysis_runs {
  *id : uuid
  --
  document_version_id : uuid
  status : varchar
  model_name : varchar
  prompt_version : varchar
  started_at : timestamp
  completed_at : timestamp
}

entity analysis_findings {
  *id : uuid
  --
  analysis_run_id : uuid
  finding_type : varchar
  severity : varchar
  section_name : varchar
  source_excerpt : text
  explanation : text
  recommendation : text
}

entity document_scores {
  *id : uuid
  --
  analysis_run_id : uuid
  total_score : int
  structure_score : int
  completeness_score : int
  clarity_score : int
  consistency_score : int
  kpi_score : int
  outcome_score : int
}

entity recommendations {
  *id : uuid
  --
  analysis_run_id : uuid
  category : varchar
  priority : varchar
  title : varchar
  recommendation_text : text
  improved_text : text
}

entity reports {
  *id : uuid
  --
  analysis_run_id : uuid
  format : varchar
  storage_key : varchar
  created_at : timestamp
}

entity chat_sessions {
  *id : uuid
  --
  user_id : uuid
  document_id : uuid
  created_at : timestamp
}

entity chat_messages {
  *id : uuid
  --
  chat_session_id : uuid
  role : varchar
  content : text
  created_at : timestamp
}

users ||--o{ projects
users ||--o{ documents
projects ||--o{ documents
documents ||--o{ document_versions
document_versions ||--o{ document_sections
document_versions ||--o{ analysis_runs
analysis_runs ||--o{ analysis_findings
analysis_runs ||--|| document_scores
analysis_runs ||--o{ recommendations
analysis_runs ||--o{ reports
users ||--o{ chat_sessions
documents ||--o{ chat_sessions
chat_sessions ||--o{ chat_messages

@enduml
```

* * *

10\. PlantUML — Sequence Diagram for “Analyze Document”
=======================================================

```
@startuml
title Sequence - Analyze Technical Specification

actor User
participant "Web App" as Web
participant "Core API" as API
participant "S3" as S3
participant "PostgreSQL" as DB
participant "AI Service" as AI
participant "LLM Provider" as LLM

User -> Web : Upload document
Web -> API : POST /documents/upload
API -> S3 : Store original file
API -> DB : Create document + version
API -> AI : Start analysis(document_id, text/file)

AI -> AI : Parse text
AI -> AI : Detect sections
AI -> AI : Validate completeness
AI -> AI : Extract requirements/KPI/deadlines
AI -> LLM : Analyze issues / generate recommendations
LLM --> AI : Findings + suggestions
AI -> AI : Compute score
AI -> DB : Save analysis_run, findings,\nscore, recommendations
AI --> API : Analysis complete
API --> Web : Return analysis summary

User -> Web : Open analysis result
Web -> API : GET /documents/{id}/analysis
API -> DB : Load results
API --> Web : Score + issues + recommendations

@enduml
```

* * *

11\. PlantUML — Deployment Diagram on AWS
=========================================

```
@startuml
title Deployment Diagram - AWS

node "User Device" {
  artifact "Browser" as browser
}

cloud "AWS" {
  node "CloudFront / CDN" as cdn
  node "Next.js Web App\n(Vercel or ECS/Amplify)" as web
  node "API Service\nECS Fargate" as api
  node "AI Service\nECS Fargate" as ai
  database "RDS PostgreSQL" as rds
  folder "S3 Bucket" as s3
  queue "SQS / Redis Queue" as queue
  node "CloudWatch" as cw
  node "Secrets Manager" as secrets
}

cloud "External" {
  node "LLM Provider" as llm
}

browser --> cdn
cdn --> web
web --> api
api --> rds
api --> s3
api --> queue
api --> secrets
queue --> ai
ai --> rds
ai --> s3
ai --> secrets
ai --> llm
api --> cw
ai --> cw

@enduml
```

* * *

12\. Как объяснять архитектуру на защите
========================================

Вот короткий устный вариант:

**“Мы построили систему из трех основных уровней.  
Frontend на Next.js отвечает за пользовательский опыт: загрузка документа, просмотр анализа, чат и отчеты.  
Go backend — это основной orchestration слой: авторизация, документы, история, запуск анализа, хранение результатов.  
Python AI service — специализированный слой для NLP и LLM: анализ структуры, поиск проблем, scoring, рекомендации и улучшение текста.  
Файлы хранятся в S3, бизнес-данные и результаты анализа — в PostgreSQL.  
Такое разделение делает систему расширяемой, объяснимой и готовой как для hackathon MVP, так и для дальнейшего production-развития.”**

* * *

13\. Как сформулировать ценность в 1 слайд
==========================================

One-liner
---------

**AI-платформа, которая проверяет качество технических заданий научных проектов, находит слабые места, объясняет ошибки и помогает быстро сформировать улучшенную версию документа.**

Value Proposition
-----------------

**Мы сокращаем время подготовки качественного ТЗ, повышаем его формальную полноту и помогаем пользователю перейти от “сырого текста” к структурированному, проверяемому и более сильному документу.**

* * *

14\. Как сформулировать уникальность в 1 слайд
==============================================

**Наше отличие не в том, что мы “просто используем LLM”, а в том, что мы строим explainable AI reviewer для ТЗ научных и инновационных проектов:**

*   анализируем структуру документа;
*   проверяем полноту и обязательные разделы;
*   ищем логические и формулировочные проблемы;
*   считаем прозрачный score;
*   генерируем улучшения и отчет;
*   даем grounded chat по самому документу.

* * *

15\. Что я бы показал как итоговую архитектурную формулу
========================================================

Архитектурный тезис
-------------------

**Modular platform with separated AI intelligence layer**

Формула
-------

**Next.js UI + Go Core API + Python AI Service + PostgreSQL + S3 + AWS/Terraform**

Почему это сильный выбор
------------------------

Потому что он прямо покрывает требования ТЗ по:

*   frontend;
*   backend API;
*   AI-модулю;
*   анализу документов;
*   отчетам;
*   истории;
*   чату;
*   score и рекомендациям.
    ТЗ\_официальное (1)

Если хочешь, следующим сообщением я могу собрать это уже в формате **готовых слайдов для презентации: 6–8 архитектурных слайдов с коротким текстом для защиты**.

## Prompt:
4/14/2026, 3:00:42 PM

как мне сделать реализацию чата который будет с ИИ и также будет понимать контекст и ПДФ самого пользователя?

## Response:
4/14/2026, 3:00:51 PM

Я разложу это на практическую схему: самый быстрый MVP, production-вариант и конкретный pipeline “PDF → индексация → retrieval → чат”.

Уже есть хорошая практическая развилка: либо быстрый managed-вариант на File Search, либо свой RAG-контур с pgvector. Для вашего стека я бы брал свой RAG как основной, а managed File Search — как самый быстрый MVP.

> **Planning technical answer on AI chat implementation**
>
> The user seems to want help with implementing a chat system that understands context and PDFs, likely asking in Russian. I'll focus on using primary sources, such as OpenAI docs for API and file search. I might also touch on our use of RAG. No image needed for this plan. Keep it concise!
>
> **Outlining tech stack for AI chat with context and PDFs**
>
> I’ll rely on OpenAI docs with possible mention of PyMuPDF and LangChain for PDF parsing. My answer will cover architecture options, like MVP vs. custom RAG, to fit the user’s stack (Next.js, Go, Python FastAPI). I’ll touch on OCR for scanned PDFs but note it’s a last-resort option.
>
> **Searching OpenAI, PyMuPDF, and pgvector documentation**
>
> [Vector store file batches | OpenAI API Reference](https://platform.openai.com/docs/api-reference/vector-stores-file-batches?_clear=true&lang=node.js&utm_source=chatgpt.com)
> [PyMuPDF documentation](https://pymupdf.readthedocs.io/)
> [pgvector/pgvector: Open-source vector similarity search for ...](https://github.com/pgvector/pgvector)
>
> **Looking up OpenAI docs for file search and vector store**
>
> I’ll search through OpenAI’s official docs to find more specific details about the file search tool in the Responses API, and any mentions of vector stores for file batches. I’ll make sure to get relevant citations from the web as I go, keeping the sources reliable and current.
>
> **Searching OpenAI docs for file_search and vector stores**
>
> [Vector store files | OpenAI API Reference](https://platform.openai.com/docs/api-reference/vector-stores-files/getContent?_clear=true&lang=node.js&utm_source=chatgpt.com)
>
> **Searching for information on the Responses API**
>
> I’m thinking of checking the official guide for the Responses API. This will ensure I get concrete, up-to-date information to answer the user’s question accurately. It’s important to reference the official docs to ensure reliability and precision in what I provide.
>
> **Searching for official OpenAI Responses API guide**
>
>
> **Reviewing API reference and docs**
>
> I think I can rely on the API reference itself, but it might also be helpful to explore other relevant doc pages. I’ll go ahead and pull up the search results to find further details, just to make sure I’m covering all the necessary ground.
>
> **Opening API reference and documentation search results**
>
> [File Batches | OpenAI API Reference](https://platform.openai.com/docs/api-reference/vector-stores-file-batches?_clear=true&lang=node.js&utm_source=chatgpt.com)
> [PyMuPDF4LLM - PyMuPDF documentation](https://pymupdf.readthedocs.io/en/latest/pymupdf4llm/)
> [GitHub - pgvector/pgvector: Open-source vector similarity search for Postgres · GitHub](https://github.com/pgvector/pgvector)
>
> **Searching OpenAI Responses API for file search info**
>
> I need to look up the OpenAI Responses API docs, specifically focusing on the file_search feature. I’ll search the official documentation using keywords like "responses API built-in tools file search" to find the details. That should give me the right info for the user’s question.
>
> **Searching OpenAI Responses API and file search tools**
>
> [File search | OpenAI API](https://developers.openai.com/api/docs/guides/tools-file-search)
>
> **Looking up official docs for retrieval API**
>
> I should also check the official documentation for the retrieval API. It’ll be helpful for answering the user’s question, ensuring I provide accurate and up-to-date information. I’ll search for the relevant docs in the results, focusing on those specifics.
>
> **Searching for official documentation on retrieval API**
>
> [File search | OpenAI API](https://developers.openai.com/api/docs/guides/tools-file-search)
>
> **Designing a custom architecture for the user**
>
> I’m considering how to provide the user with a well-rounded solution. I'll likely mention custom RAG with embeddings and pgvector in Postgres for fine control—while keeping it simple with OpenAI File Search for minimal logic. I should include document extraction with PyMuPDF and reading order concerns, plus a clear architecture using their stack (React/Next, Go, Python, AWS). I'll also include succinct pseudocode and sample data models, while being diligent with citations for everything.
>
> **Explaining custom search options and document privacy**
>
> I’m considering two options for the user’s search: using OpenAI’s managed File Search, which automatically handles parsing and embedding, or a custom solution involving chunking and embedding PDFs with PyMuPDF4LLM, storing in pgvector, and retrieving top-k responses. I should clarify the privacy concerns, like filtering by user-specific vector stores or document IDs to ensure data confidentiality. It would be good to explain document-aware chat and when the Retrieval API is really necessary.
>
> Thought for 1m 47s

Да. Правильная реализация такого чата — это не “просто отправлять PDF в prompt”, а собрать **document-aware chat** из двух частей:  
**память диалога** + **retrieval по самому документу**.  
Для этого у тебя есть два рабочих пути:

1.  **Быстрый MVP** — OpenAI Responses API + `file_search`: OpenAI сам парсит, чанкует документы, строит эмбеддинги и делает и семантический, и keyword search по загруженным файлам. Responses API при этом поддерживает stateful multi-turn взаимодействие, то есть можно передавать прошлые ответы как контекст диалога. [OpenAI Developers+2OpenAI Developers+2](https://developers.openai.com/api/docs/guides/tools-file-search)
2.  **Нормальный production-вариант под ваш стек** — свой RAG-контур: Python FastAPI парсит PDF, режет его на чанки, строит embeddings, хранит их в Postgres через `pgvector`, а на каждый вопрос вытаскивает top-k релевантных фрагментов и только их отправляет в LLM вместе с краткой памятью диалога. `pgvector` как раз предназначен для vector similarity search в Postgres и поддерживает exact/approximate nearest neighbor search и cosine distance. Эмбеддинги OpenAI возвращаются как массивы чисел через embeddings endpoint. [GitHub+1](https://github.com/pgvector/pgvector)

Для твоего стека я бы рекомендовал так:  
**Next.js** — чатовый UI, upload, просмотр источников;  
**Go backend** — auth, документы, chat sessions, права доступа, orchestration;  
**Python FastAPI** — ingest, chunking, retrieval, answer generation;  
**Postgres + pgvector** — metadata + vectors;  
**S3** — исходные PDF. Это лучше, чем пытаться засунуть весь pipeline в один backend. [GitHub+1](https://github.com/pgvector/pgvector)

Самая правильная логика работы
------------------------------

Когда пользователь загружает PDF, ты не отвечаешь по нему сразу. Сначала запускается ingest pipeline:

1.  сохранить оригинальный PDF в S3;
2.  создать `document` в Postgres;
3.  извлечь текст;
4.  разбить документ на логические чанки;
5.  построить embeddings;
6.  сохранить чанки и векторы;
7.  пометить документ как `ready_for_chat`.

И уже потом чат работает поверх этих чанков. Это дает нормальную скорость, ссылки на источники и предсказуемое качество. Сам OpenAI для managed file search тоже использует схему “загрузи файл → vector store → search по knowledge base”. У file batches даже есть отдельные статусы `in_progress`, `completed`, `failed`, что удобно для асинхронного ingest. [OpenAI Developers+1](https://developers.openai.com/api/docs/guides/tools-file-search)

Как сделать, чтобы чат “понимал PDF”
------------------------------------

Нужен RAG-паттерн:

*   пользователь задает вопрос;
*   система ищет релевантные куски именно из его документа;
*   в prompt уходит не весь PDF, а только top-k чанков;
*   модель отвечает только на основе этих кусков и короткой памяти диалога;
*   в ответе ты возвращаешь ссылки на страницы/секции, откуда взят ответ.

Это лучше, чем просто “вставить весь текст PDF в prompt”, потому что длинные документы быстро ломают контекстное окно, дороже стоят и хуже контролируются. OpenAI file search именно для этого и существует: модель сначала ищет по файлам, а потом отвечает. [OpenAI Developers+1](https://developers.openai.com/api/docs/guides/tools-file-search)

Как парсить PDF
---------------

Для Python-сервиса я бы взял **PyMuPDF / PyMuPDF4LLM**. У PyMuPDF4LLM прямо заявлена ориентация на LLM и RAG: он превращает PDF в более чистые структурированные данные, умеет layout analysis без GPU и экспорт в Markdown, JSON и TXT. Это очень удобно для последующего chunking. [PyMuPDF](https://pymupdf.readthedocs.io/en/latest/pymupdf4llm/)

Если использовать чистый PyMuPDF, то текст можно извлекать по страницам через `page.get_text()`. Документация отдельно предупреждает, что обычный extract может не совпадать с “естественным” порядком чтения, и для переупорядочивания можно использовать `sort=True`. Это важно для PDF, где колонки, таблицы и блоки стоят не по линейному порядку. [PyMuPDF+1](https://pymupdf.readthedocs.io/en/latest/app1.html)

Практически я бы делал так:

*   сначала пробуешь `PyMuPDF4LLM -> Markdown`;
*   если результат плохой, падаешь на page-level extraction;
*   если текст почти пустой, отправляешь документ в OCR fallback.

Как хранить данные
------------------

Минимально тебе нужны такие сущности:

*   `documents` — сам документ, владелец, статус, S3 key;
*   `document_chunks` — текст чанка, страница, section, порядок;
*   `document_chunk_embeddings` или вектор прямо в `document_chunks`;
*   `chat_sessions`;
*   `chat_messages`.

Если идешь через Postgres, `pgvector` позволяет хранить векторы рядом с обычными реляционными данными и искать ближайшие соседи по cosine similarity прямо в БД. Это удобнее, чем тащить отдельную vector DB на хакатоне или раннем MVP. [GitHub+1](https://github.com/pgvector/pgvector)

Как резать документ на чанки
----------------------------

Не режь тупо “по 1000 символов”. Для PDF лучше делать **structure-aware chunking**:

*   заголовок секции;
*   текст секции;
*   страница;
*   соседний контекст;
*   ограничение по размеру.

Хороший чанк — это обычно 1 небольшой логический фрагмент, а не полстраницы случайного текста. PyMuPDF4LLM помогает именно тем, что старается отдать более структурированное представление документа для LLM/RAG. [PyMuPDF+1](https://pymupdf.readthedocs.io/en/latest/pymupdf4llm/)

Я бы сохранял для каждого чанка:

*   `document_id`
*   `page_number`
*   `section_title`
*   `chunk_text`
*   `chunk_index`
*   `embedding`

И отдельно — `token_count` или `char_count`, чтобы потом контролировать размер контекста.

Как делать retrieval
--------------------

На каждый user message ты делаешь примерно так:

1.  берешь вопрос пользователя;
2.  при желании добавляешь краткий conversation summary;
3.  строишь embedding запроса;
4.  ищешь top-k похожих чанков по `document_id`;
5.  опционально добавляешь 1 соседний чанк слева/справа;
6.  формируешь final prompt.

OpenAI embeddings endpoint как раз возвращает embedding vector, который потом можно использовать для similarity search. Retrieval API у OpenAI тоже описан как semantic search по своим данным. [OpenAI Platform+1](https://platform.openai.com/docs/api-reference/embeddings?_clear=true&lang=node.js&utm_source=chatgpt.com)

Очень важный момент: поиск всегда должен фильтроваться по `user_id` и `document_id`, чтобы один пользователь никогда не получил контекст из чужого файла. Это уже твоя бизнес-логика на стороне Go API и SQL.

Как собирать prompt
-------------------

Нормальный prompt для ответа должен содержать 4 блока:

1.  **System rules**  
    “Отвечай только по предоставленному контексту. Если в контексте нет ответа — скажи, что в документе это не найдено.”
2.  **Conversation memory**  
    Короткое summary 3–8 предыдущих сообщений, не весь лог.
3.  **Retrieved context**  
    Top-k чанков с page number и section title.
4.  **User question**  
    Текущий вопрос.

Это лучше, чем тащить весь chat history целиком. Responses API позволяет строить stateful multi-turn взаимодействие, но даже при этом для production-качества обычно полезно держать свою короткую память/summary, а retrieval делать отдельно. [OpenAI Developers+1](https://developers.openai.com/api/reference/responses/overview/)

Пример system prompt:

```
Ты AI-ассистент по документу пользователя.
Отвечай только на основе retrieved context.
Если ответа нет в контексте, прямо скажи об этом.
Всегда указывай страницы и секции, на которые ты опирался.
Не выдумывай факты вне документа.
```

Как должен выглядеть ответ модели
---------------------------------

Возвращай не просто `answer`, а структуру:

```
{
  "answer": "…",
  "citations": [
    {"page": 3, "section": "Требования", "chunk_id": "…"},
    {"page": 5, "section": "Сроки", "chunk_id": "…"}
  ],
  "confidence": "high"
}
```

Если ты пойдешь через managed file search, OpenAI Responses API умеет возвращать результаты file search tool call, включая retrieved text и relevance score. Это удобно, если хочешь быстро показать источники в интерфейсе. [OpenAI Developers](https://developers.openai.com/api/reference/resources/responses/methods/create/)

Как сделать память диалога
--------------------------

У тебя должно быть 2 слоя памяти:

**Короткая память** — последние 6–10 сообщений.  
**Длинная память по сессии** — summary разговора, обновляемый после каждых N сообщений.

Почему так: если ты будешь на каждый запрос отправлять весь лог чата, стоимость и latency начнут расти. А если хранить summary, можно держать длинные диалоги без потери темы. Responses API поддерживает stateful interactions, но в вашем собственном приложении summary memory все равно обычно полезна для контроля стоимости и предсказуемости. [OpenAI Developers](https://developers.openai.com/api/reference/responses/overview/)

Как это разложить по вашим сервисам
-----------------------------------

### Go backend

Отвечает за:

*   auth;
*   upload metadata;
*   chat sessions;
*   access control;
*   orchestration вызовов Python-сервиса.

### Python FastAPI

Отвечает за:

*   PDF extraction;
*   chunking;
*   embeddings;
*   retrieval;
*   answer generation;
*   summarization memory.

### Next.js frontend

Отвечает за:

*   upload UI;
*   чат;
*   отображение ответа;
*   раскрытие источников по страницам;
*   история сообщений.

Пример API
----------

В Go API:

```
POST /api/v1/documents/upload
GET  /api/v1/documents/{id}
POST /api/v1/documents/{id}/ingest
POST /api/v1/chat/sessions
POST /api/v1/chat/sessions/{id}/messages
GET  /api/v1/chat/sessions/{id}
```

В Python AI service:

```
POST /ai/v1/ingest-document
POST /ai/v1/retrieve
POST /ai/v1/chat-answer
POST /ai/v1/summarize-session
```

Самый практичный flow
---------------------

### Upload

*   frontend грузит PDF;
*   Go API сохраняет файл в S3;
*   Go API создает `document`;
*   Go API дергает `POST /ai/v1/ingest-document`.

### Ingest

*   Python забирает PDF;
*   извлекает текст;
*   режет на чанки;
*   строит embeddings;
*   пишет чанки и vectors в Postgres;
*   возвращает `ready`.

### Chat

*   frontend отправляет вопрос;
*   Go API проверяет права на документ;
*   Go API вызывает Python `/chat-answer`;
*   Python делает retrieval по `document_id`;
*   Python вызывает LLM;
*   Python возвращает answer + citations;
*   Go API пишет сообщение в `chat_messages`;
*   frontend показывает ответ.

Что я бы советовал лично тебе
-----------------------------

Для вашего hackathon/MVP пути лучше так:

**Вариант A — самый быстрый**

*   OpenAI Responses API
*   `file_search`
*   vector store per user or per document group
*   citations from tool output

Это реально быстро поднимается, потому что OpenAI сам делает parsing/chunking/embeddings/search. [OpenAI Developers+1](https://developers.openai.com/api/docs/assistants/tools/file-search?utm_source=chatgpt.com)

**Вариант B — правильный под ваш монорепо**

*   Python FastAPI + PyMuPDF4LLM
*   embeddings
*   Postgres + pgvector
*   свой retrieval + свои citations
*   Go orchestration

Это лучше для контроля, explainability, multi-tenant security и дальнейшего развития. `pgvector` позволяет оставить vector search внутри Postgres, а PyMuPDF4LLM хорошо подходит именно под LLM/RAG extraction. [PyMuPDF+2GitHub+2](https://pymupdf.readthedocs.io/en/latest/pymupdf4llm/)

Главные ошибки, которых стоит избежать
--------------------------------------

Не загружай весь PDF в prompt на каждый вопрос.  
Не храни только “сырой extracted text” без page/section metadata.  
Не смешивай retrieval по всем документам без фильтрации по владельцу.  
Не возвращай ответ без ссылок на куски документа.  
Не делай чат без async ingest pipeline — иначе первый ответ будет медленным и нестабильным.

Мой рекомендуемый выбор для вас
-------------------------------

С учетом твоего стека я бы делал так:

*   **Go** — auth, documents, chat sessions, orchestration
*   **Python FastAPI** — ingest/retrieval/LLM
*   **Postgres + pgvector** — chunks + vectors
*   **S3** — PDF
*   **Next.js** — chat UI
*   **OpenAI model** — answer generation
*   **OpenAI embeddings** — embeddings layer

Это даст тебе чат, который реально “понимает PDF пользователя”, потому что он отвечает не из воздуха, а из найденных кусков документа. [OpenAI Platform+2GitHub+2](https://platform.openai.com/docs/api-reference/embeddings?_clear=true&lang=node.js&utm_source=chatgpt.com)

Следующим сообщением я могу дать тебе уже **готовый минимальный backend design: SQL schema + Python FastAPI endpoints + пример retrieval prompt + sequence diagram**.

---

**Sources:**

- [File search | OpenAI API](https://developers.openai.com/api/docs/guides/tools-file-search)
- [GitHub - pgvector/pgvector: Open-source vector similarity search for Postgres · GitHub](https://github.com/pgvector/pgvector)
- [PyMuPDF4LLM - PyMuPDF documentation](https://pymupdf.readthedocs.io/en/latest/pymupdf4llm/)
- [Embeddings | OpenAI API Reference](https://platform.openai.com/docs/api-reference/embeddings?_clear=true&lang=node.js&utm_source=chatgpt.com)

## Prompt:
4/14/2026, 7:34:51 PM

![Uploaded image](https://chatgpt.com/backend-api/estuary/content?id=file_000000008f54720892ba486e90302fd4&ts=493386&p=fs&cid=1&sig=6ea654e0d639e708f54340126ff3922c75b70d50bff4e775f3697afe451479d0&v=0)

![Uploaded image](https://chatgpt.com/backend-api/estuary/content?id=file_00000000b7a87208a8cf3057348bd481&ts=493386&p=fs&cid=1&sig=a9db7a6db3925a787ddb94d60f9c531c21714fdb9d147d107444070e683e832b&v=0)

![Uploaded image](https://chatgpt.com/backend-api/estuary/content?id=file_000000009264722fbbde37985d59a76e&ts=493386&p=fs&cid=1&sig=90cbe21621e8752888db0bc5ae4462283520d63e8b6f62cb1abe109066186bfc&v=0)

d29b4c3d-bef4-4534-a302-2dcbb197eb15.docx

Document

65ddf1ec-3392-4127-a266-2595954ba821.docx

Document

251734f2 5780 4956 ac6f 913cd717ca99

Unable to display visualization

Я хочу сделать:

Monorepo modules/services:
- frontend/
- backend/ (основной golang backend с postgres + minio/s3)
- infrastrcuture/ (terraform aws cloud production)
- llm/ or [somename]/: Python FastAPI LLM/AI services.
docker compose (for all monorepo services to run)

---
AI Services:

- LLM Analysis (service/module on monorepo)

3. Проверка наличия обязательных разделов технического задания
2.	Анализ структуры загруженного документа.
4.	Анализ текста с применением технологий искусственного интеллекта.
6.	Генерация рекомендаций по улучшению технического задания.

- Generate Example

7.	Автоматическое формирование структуры технического задания.
8.	Генерация примера технического задания.

- Scoring 0/100 and Points (service/module on monorepo)

5.	Выявление: размытых формулировок; отсутствующих требований; внутренних несоответствий; логических ошибок; отсутствующих показателей KPI и ожидаемых результатов.

9.	Оценка качества технического задания по балльной шкале (score).

- LLM final report analysis results (excel doc)

10.	Формирование итогового отчёта по результатам анализа.

---

Страницы на Frontend and Functionals:

1. Страница Авторизаций:
- Регистрация и авторизация пользователей.
2. Основная Страница Клиента
- Загрузка документа в систему.
- Просмотр результатов анализа.
- Получение рекомендаций по улучшению ТЗ.
- Генерация улучшенной версии технического задания.

---
Контекст:

## Документы Хакатона

- Техническое Задание Хакатона (RUS): [/docs/ТЗ_официальное.docx](/docs/ТЗ_официальное.docx)
- Шаблон Научного ТЗ для обработки: [/docs/Шаблон_для_ТЗ_рус.docx](/docs/Шаблон_для_ТЗ_рус.docx)
- Пример Научного ТЗ для обработки: [/docs/TZ_digital_polegon.docx](/docs/TZ_digital_polegon.docx)
- Шаблон Итоговая Таблица Оценки Научных ТЗ: [/docs/Оценка_ТЗ_шаблон.xlsx](/docs/Оценка_ТЗ_шаблон.xlsx)
---
Мое понимание:

есть 2 сущности, 
это Client and Admin,
Client может загружать PDF ТЗ свое и получать анализ и рекомендаций
Admin может просматривать все ТЗ PDF запросы самих Client и также может видеть (итоговый отчёт)

---
Вопросы на основе ТЗ Хакатона и вопросы реализаций:

Что это значит?
–	Скачивание итогового отчёта.

как это сделать и что это имеется ввиду? (какой функционал от нас ожидают)
–	Взаимодействие с AI-ассистентом посредством чата.

что это значит?
–	Доступ к истории загруженных документов.

Что значат AI-модуль, модуль анализа документов и модуль генераций отчетов? (имеется ли ввиду что это отдельные сервисы в monorepo? и как мы можем его разделить в специальный функционал?)
Система может включать следующие компоненты:
–	Frontend-интерфейс (веб-приложение или мобильное приложение);
–	Backend-сервер (REST API);
–	AI-модуль;
–	база данных;
–	модуль анализа документов;
–	модуль генерации отчётов.

Можешь разобрать что это значит:
Целью настоящего технического задания является разработка интеллектуальной системы на основе искусственного интеллекта, обеспечивающей:
–	автоматизированный анализ технических заданий;
–	выявление ошибок и неточностей в тексте ТЗ;
–	формирование рекомендаций по доработке и улучшению ТЗ;
–	автоматическое построение структуры технического задания;
–	повышение качества научных и инженерных проектов в целом.

Разбери все части step by step в ТЗ по типу:
3. ОСНОВНЫЕ ЗАДАЧИ ПРИЛОЖЕНИЯ

---
также можешь дать улучшение по Компонент сервисам в monorepo

## Response:
4/14/2026, 7:35:01 PM

> **Evaluating response structure and tools**
>
> The user likely wants the answer in Russian. I need to analyze the provided documents and images. There are questions about TZ interpretation, monorepo improvements, report downloads, and AI modules that I should address. I could inspect images directly, but using Python isn't necessary right now. I'll consider whether to cite document sections, though line numbers aren't available.
>
> **Clarifying citation and web usage**
>
> File search results don’t show line numbers, just full file contents. I could potentially cite the full file instead, as suggested by the developer, using inline citations. The user’s questions seem to focus on architecture rather than up-to-date specifics, so I don’t need to reference the web for the answer.
>
> Thought for 1m 25s

Да — у тебя уже **правильное направление**, и твой набросок очень близок к хорошему hackathon MVP.

Главное: **не делить всё слишком рано на много микросервисов**. Для 24-часового хакатона вам нужен не “идеальный enterprise”, а **понятный monorepo с 1 web app, 1 core backend, 1 AI service и общей БД/хранилищем**. В самом ТЗ от вас ждут: загрузку PDF/Word/TXT, анализ структуры, проверку обязательных разделов, AI-анализ текста, поиск проблем, рекомендации, генерацию структуры/примера ТЗ, score 0–100, итоговый отчёт, чат и историю загруженных документов.

d29b4c3d-bef4-4534-a302-2dcbb19…

* * *

1\. Что на самом деле означает ТЗ хакатона
------------------------------------------

Фраза:

> “разработка интеллектуальной системы на основе искусственного интеллекта”

в вашем случае означает не просто “чат с LLM”, а систему, которая умеет:

*   принять документ,
*   разобрать его как ТЗ,
*   понять его структуру,
*   проверить полноту,
*   найти слабые места,
*   объяснить проблемы,
*   предложить улучшения,
*   дать итоговую оценку,
*   показать это пользователю в удобном интерфейсе.
    d29b4c3d-bef4-4534-a302-2dcbb19…

То есть продуктовая суть такая:

**Input:** пользователь загружает своё ТЗ  
**Processing:** система анализирует документ  
**Output:** score, замечания, рекомендации, улучшенная версия, отчёт, чат-помощник

* * *

2\. Разбор твоего понимания ролей
---------------------------------

### `Client`

Да, это основная роль.  
Он:

*   регистрируется/логинится;
*   загружает ТЗ;
*   смотрит анализ;
*   получает рекомендации;
*   скачивает отчёт;
*   общается с AI-ассистентом;
*   смотрит историю своих документов.
    d29b4c3d-bef4-4534-a302-2dcbb19…

### `Admin`

Это **не прописано прямо** в ТЗ как обязательная роль, но это очень разумная **derived requirement**.

Admin может:

*   видеть все документы;
*   видеть все analysis runs;
*   смотреть итоговые отчёты;
*   управлять шаблонами/рубрикой оценивания;
*   смотреть системные логи.

То есть:

*   **Client** — обязателен по логике ТЗ,
*   **Admin** — хорошее архитектурное усиление, но не обязательный must-have для MVP.

* * *

3\. Ответы на твои точечные вопросы
-----------------------------------

Что значит “Скачивание итогового отчёта”
----------------------------------------

Это значит, что после анализа пользователь должен получить **сформированный артефакт**, который можно скачать. В ТЗ не зафиксирован строгий формат, там сказано именно “скачивание итогового отчёта”, но не сказано “только PDF” или “только Excel”.

d29b4c3d-bef4-4534-a302-2dcbb19…

### Что от вас реально ожидают

Минимально — кнопка:

**Download Report**

И скачивается файл, в котором есть:

*   название документа;
*   дата анализа;
*   score;
*   список найденных проблем;
*   отсутствующие разделы;
*   рекомендации;
*   улучшенные формулировки или suggested structure.

### Как лучше сделать на хакатоне

У вас уже есть шаблон итоговой таблицы оценки в `.xlsx`, поэтому самый практичный вариант:

*   **backend** собирает структурированный результат анализа;
*   заполняет excel-шаблон;
*   отдает пользователю `.xlsx`.

Дополнительно можно сделать:

*   `PDF report` — красиво для презентации;
*   `XLSX report` — удобно для формальной оценки.

### Что я бы рекомендовал

Для MVP:

*   основной downloadable report = **XLSX**
*   UI-preview report = **HTML page**
*   optional = PDF export позже

* * *

Что значит “Взаимодействие с AI-ассистентом посредством чата”
-------------------------------------------------------------

Это значит, что пользователь может не только получить статический анализ, но и **задавать вопросы системе**.

Например:

*   “Почему у меня низкий score?”
*   “Какие разделы отсутствуют?”
*   “Перепиши раздел ожидаемых результатов”
*   “Сгенерируй пример KPI”
*   “Что не так с этой формулировкой?”
*   “Сравни мой документ с шаблоном”

Это прямо соответствует требованию про чат-бота-ассистента и AI-ассистента посредством чата.

d29b4c3d-bef4-4534-a302-2dcbb19…

### Как это реализовать по смыслу

Чат должен быть **document-aware**, а не просто общим чат-ботом.

То есть он должен понимать:

*   текущий документ клиента;
*   результаты анализа;
*   шаблон/эталон;
*   историю беседы.

Иначе это будет просто “LLM без контекста”, а не AI-ассистент по ТЗ.

* * *

Что значит “Доступ к истории загруженных документов”
----------------------------------------------------

Это значит страница, где пользователь видит свои прошлые загрузки.

Минимально там должно быть:

*   название документа;
*   дата загрузки;
*   статус анализа;
*   итоговый score;
*   кнопка “Открыть анализ”;
*   кнопка “Скачать отчёт”.

Это прямо следует из требования доступа к истории загруженных документов.

d29b4c3d-bef4-4534-a302-2dcbb19…

### Для MVP достаточно

Страница `History` с таблицей:

*   Document Name
*   Uploaded At
*   Status
*   Score
*   View
*   Download Report

* * *

Что значат AI-модуль, модуль анализа документов и модуль генерации отчётов
--------------------------------------------------------------------------

Очень важный момент:

**это не обязательно отдельные деплоящиеся сервисы.**  
В ТЗ сказано “система может включать следующие компоненты”, то есть это логические части системы, а не жесткое требование “делать 3 отдельных микросервиса”.

d29b4c3d-bef4-4534-a302-2dcbb19…

### Как это правильно интерпретировать

#### 1\. AI-модуль

Это логика, которая делает:

*   LLM/NLP анализ;
*   scoring;
*   generation;
*   recommendations;
*   chat.

#### 2\. Модуль анализа документов

Это логика, которая делает:

*   парсинг PDF/DOCX/TXT;
*   извлечение текста;
*   выделение секций;
*   проверку структуры;
*   проверку обязательных разделов.

#### 3\. Модуль генерации отчётов

Это логика, которая делает:

*   сбор итогового structured output;
*   формирование XLSX/PDF/HTML report;
*   отдачу файла пользователю.

### Практический вывод

Для вашего монорепо лучше так:

*   **AI-модуль** = подмодули внутри Python FastAPI service
*   **document analysis module** = тоже внутри Python FastAPI service
*   **report generation module** = либо в Go backend, либо как shared module

### Мой совет

На хакатоне так будет проще:

*   Python AI service отвечает за:
    *   parsing
    *   section analysis
    *   scoring
    *   recommendations
    *   generation
*   Go backend отвечает за:
    *   users/auth
    *   documents
    *   orchestration
    *   persistence
    *   report assembly/export

То есть **report generation лучше держать в backend**, потому что отчёт — это уже business output для клиента, а не только AI-логика.

* * *

4\. Step by step разбор раздела 3 ТЗ — “Основные задачи приложения”
===================================================================

Теперь разберу каждую функцию **в виде реального продукта**.

1\. Загрузка технического задания в форматах PDF, Word, TXT
-----------------------------------------------------------

Что это значит:

*   пользователь выбирает файл;
*   фронтенд отправляет его;
*   backend сохраняет файл в S3/MinIO;
*   создаётся запись `document`;
*   запускается pipeline анализа.
    d29b4c3d-bef4-4534-a302-2dcbb19…

### Нужные компоненты

*   frontend upload page
*   backend upload endpoint
*   object storage
*   file metadata in postgres

* * *

2\. Анализ структуры загруженного документа
-------------------------------------------

Что это значит:

*   система должна понять, из каких секций состоит документ;
*   определить заголовки и блоки;
*   попытаться сопоставить их с ожидаемой структурой ТЗ.
    d29b4c3d-bef4-4534-a302-2dcbb19…

У вас для этого очень полезен загруженный шаблон научного ТЗ: там уже видны типовые разделы:

*   общие сведения,
*   цели и задачи,
*   стратегические документы,
*   ожидаемые результаты,
*   конечный результат,
*   бюджет.
    65ddf1ec-3392-4127-a266-2595954…

### Практически

AI service:

*   extract text
*   split by headings
*   classify sections
*   compare against template structure

* * *

3\. Проверка наличия обязательных разделов технического задания
---------------------------------------------------------------

Что это значит:

*   проверить, есть ли все обязательные части;
*   отметить missing sections;
*   отметить partial sections.
    d29b4c3d-bef4-4534-a302-2dcbb19…

### Пример

Если в шаблоне есть:

*   цель программы
*   задачи программы
*   ожидаемые результаты
*   конечный результат
*   количественные показатели

а в документе клиента не хватает “количественных показателей”, то система должна сказать:

> Отсутствуют измеримые показатели результатов.

Шаблон прямо подталкивает к проверке количественных показателей и ожидаемых результатов.

65ddf1ec-3392-4127-a266-2595954…

* * *

4\. Анализ текста с применением AI
----------------------------------

Что это значит:

*   проверить сами формулировки;
*   найти слабые/размытые места;
*   выявить логические проблемы;
*   понять, насколько документ формализован.
    d29b4c3d-bef4-4534-a302-2dcbb19…

### Пример

Фраза:

> “проект должен значительно улучшить ситуацию”

может быть помечена как:

*   vague wording
*   lacks measurable KPI
*   lacks acceptance criteria

* * *

5\. Выявление размытых формулировок, отсутствующих требований, внутренних несоответствий, логических ошибок, отсутствующих KPI и ожидаемых результатов
------------------------------------------------------------------------------------------------------------------------------------------------------

Это уже ядро продукта.

d29b4c3d-bef4-4534-a302-2dcbb19…

По сути система должна выдавать findings примерно таких типов:

*   `missing_section`
*   `missing_requirement`
*   `vague_statement`
*   `inconsistency`
*   `missing_kpi`
*   `missing_expected_result`
*   `logic_issue`

### Пример output

*   Проблема: отсутствуют количественные KPI
*   Фрагмент: “улучшить качество исследований”
*   Почему это проблема: невозможно проверить достижение результата
*   Рекомендация: указать измеримый показатель, например % точности, срок, число публикаций и т.д.

* * *

6\. Генерация рекомендаций по улучшению ТЗ
------------------------------------------

Что это значит:  
система должна не просто критиковать, а **предлагать исправление**.

d29b4c3d-bef4-4534-a302-2dcbb19…

Лучший формат:

*   Issue
*   Why it matters
*   Recommendation
*   Improved text

* * *

7\. Автоматическое формирование структуры ТЗ
--------------------------------------------

Что это значит:  
если пользователь хочет начать с нуля или его документ очень слабый, система должна уметь выдать skeleton:

1.  Общие сведения
2.  Цель
3.  Задачи
4.  Требования
5.  KPI
6.  Ожидаемые результаты
7.  Сроки
8.  Критерии приемки

Это также можно привязать к научному шаблону, который ты загрузил.

65ddf1ec-3392-4127-a266-2595954…

* * *

8\. Генерация примера технического задания
------------------------------------------

Это значит:  
система может сгенерировать **пример документа или пример секции** по шаблону.

d29b4c3d-bef4-4534-a302-2dcbb19…

### Для MVP не делай полный “магический документ”

Лучше сделать:

*   generate sample section
*   generate improved draft by template
*   generate blank structured template with example text

Так будет реалистичнее.

* * *

9\. Оценка качества ТЗ по балльной шкале
----------------------------------------

Это score 0–100.

d29b4c3d-bef4-4534-a302-2dcbb19…

Но очень важно:  
не просто один балл, а разложение:

*   structure score
*   completeness score
*   clarity score
*   consistency score
*   KPI score
*   expected outcomes score

И только потом:

*   total score

* * *

10\. Формирование итогового отчёта по результатам анализа
---------------------------------------------------------

Это итоговый собранный артефакт.

d29b4c3d-bef4-4534-a302-2dcbb19…

Хороший отчет содержит:

*   summary;
*   найденные проблемы;
*   missing sections;
*   score breakdown;
*   recommendations;
*   improved fragments;
*   metadata о документе.

* * *

5\. Как я бы улучшил твою структуру монорепо
============================================

Твоя идея уже хорошая:

*   `frontend/`
*   `backend/`
*   `infrastructure/`
*   `llm/`
*   `docker-compose`

Но я бы сделал чуть более чисто.

Рекомендуемая структура
-----------------------

```
repo/
  frontend/                 # Next.js
  backend/                  # Go API
  ai-service/               # Python FastAPI
  infrastructure/           # Terraform AWS
  database/
    migrations/
    seeds/
  packages/
    prompts/                # prompt templates / scoring rubric
    contracts/              # OpenAPI / shared schemas
    docs/                   # ADR / architecture docs
  docker-compose.yml
  .env.example
```

* * *

6\. Что должно быть внутри каждого сервиса
==========================================

`frontend/`
-----------

Это UI.

### Основные страницы

1.  `Auth page`
    *   registration
    *   login
2.  `Dashboard`
    *   upload document
    *   recent analyses
    *   CTA to chat/analyze
3.  `Document Analysis page`
    *   score
    *   missing sections
    *   findings
    *   recommendations
    *   improved version
    *   report download
4.  `Chat page` или chat panel inside analysis page
    *   ask AI about current document
5.  `History page`
    *   previous uploads
    *   status
    *   score
    *   report
6.  `Admin page` optional
    *   list all docs
    *   reports
    *   logs

### Frontend modules

*   auth
*   documents
*   analysis
*   recommendations
*   reports
*   chat
*   history
*   admin

* * *

`backend/` — Go
---------------

Это главный orchestration слой.

### Должен отвечать за

*   auth
*   users
*   documents
*   uploads
*   storage access
*   analysis runs
*   chat sessions
*   report download
*   admin access
*   integration with ai-service

### Внутренние модули

```
backend/internal/
  auth/
  users/
  documents/
  uploads/
  analysis/
  recommendations/
  scoring/
  reports/
  chat/
  admin/
  ai/
  storage/
  common/
```

* * *

`ai-service/` — Python FastAPI
------------------------------

Вот здесь должны жить твои AI-модули.

### Я бы разделил так

```
ai-service/app/
  api/
    analyze.py
    generate.py
    score.py
    chat.py
    health.py

  services/
    document_parser.py
    section_classifier.py
    completeness_checker.py
    issue_detector.py
    scoring_engine.py
    recommendation_engine.py
    draft_generator.py
    chat_engine.py
    template_matcher.py
    report_export_data.py

  prompts/
    analyze/
    score/
    generate/
    chat/

  schemas/
    analysis.py
    score.py
    chat.py
    report.py
```

### Логически внутри AI service у тебя будет 4 крупных блока

#### 1\. LLM Analysis

*   структура
*   обязательные разделы
*   AI-анализ текста
*   рекомендации

#### 2\. Generate Example

*   формирование структуры ТЗ
*   генерация примера ТЗ

#### 3\. Scoring

*   выявление проблем
*   подсчет баллов
*   score breakdown

#### 4\. Report Data Builder

*   отдаёт структурированные данные для excel/pdf report

* * *

7\. Как я бы разделил ваши AI Services
======================================

Ты написал хорошую идею, но я бы чуть подправил.

Не делай слишком много отдельных сервисов
-----------------------------------------

Для хакатона лучше:

### Один `ai-service`, внутри которого 4 доменных модуля:

*   `analysis`
*   `generation`
*   `scoring`
*   `chat`

То есть не 4 контейнера, а **1 Python service с 4 submodules**.

Почему
------

*   быстрее собрать;
*   проще дебажить;
*   проще docker compose;
*   меньше сетевых точек отказа;
*   проще показать на демо.

* * *

8\. Моя рекомендуемая финальная разбивка функционала
====================================================

Core MVP
--------

Вот что реально надо сделать в первую очередь:

### Client flow

1.  Auth
2.  Upload TЗ
3.  Run analysis
4.  View score + findings
5.  View recommendations
6.  Generate improved structure / example section
7.  Download report
8.  Ask AI in chat
9.  View history

Это почти идеально покрывает ТЗ.

d29b4c3d-bef4-4534-a302-2dcbb19…

* * *

9\. Как я бы интерпретировал “Шаблон научного ТЗ”
=================================================

Ваш загруженный шаблон — это не просто пример документа. Это почти готовая **rubric base** для системы. В нем уже зашиты важные ожидаемые элементы:

*   цель программы;
*   задачи;
*   стратегические документы;
*   прямые результаты;
*   конечный результат;
*   количественные показатели;
*   социально-экономический/экологический эффект;
*   целевые потребители результатов;
*   бюджет.
    65ddf1ec-3392-4127-a266-2595954…

То есть из него можно сделать:

### A. checklist обязательных секций

### B. эталонную структуру

### C. основу scoring rubric

### D. базу для generate-example

Это очень сильная идея для вашего AI service.

* * *

10\. Как бы я сформулировал ваши модули по-продуктовому
=======================================================

Вариант нейминга
----------------

### `frontend/`

User-facing platform

### `backend/`

Core platform API

### `ai-service/`

Document Intelligence Engine

### `infrastructure/`

Cloud and deployment layer

### `database/`

Schema and migrations

### `packages/prompts/`

AI Prompt & Evaluation Assets

* * *

11\. Что можно упростить ради хакатона
======================================

Не обязательно делать сразу:

*   сложную admin panel;
*   продвинутую multi-tenant систему;
*   полноценную OCR-поддержку плохих scan PDF;
*   отдельный report microservice;
*   отдельный scoring microservice.

Лучше сделать:

*   один AI service;
*   один Go backend;
*   один frontend;
*   postgres;
*   minio/s3;
*   docker compose.

* * *

12\. Мой итоговый совет по архитектуре
======================================

Я бы утвердил такой вариант:

```
frontend/        -> Next.js client UI
backend/         -> Go REST API + Postgres + MinIO/S3 orchestration
ai-service/      -> Python FastAPI for analysis/generation/scoring/chat
infrastructure/  -> Terraform AWS
database/        -> migrations/seeds
packages/        -> prompts/contracts/docs
docker-compose.yml
```

Где какая ответственность
-------------------------

### Frontend

*   auth
*   upload
*   analysis result
*   recommendations
*   improved version
*   history
*   chat
*   report download

### Backend

*   users/auth
*   roles
*   documents
*   file storage
*   analysis run lifecycle
*   report export
*   admin access
*   ai-service integration

### AI service

*   parse text
*   analyze structure
*   validate sections
*   detect issues
*   score
*   recommend improvements
*   generate example
*   document-aware chat

* * *

13\. Самый важный практический вывод
====================================

То, что ты нарисовал, уже можно превратить в очень хороший scope:

Must-have
---------

*   Auth
*   Upload PDF/DOCX/TXT
*   Structure analysis
*   Missing sections
*   AI findings
*   Recommendations
*   Score 0–100
*   Downloadable report
*   Chat over the analyzed document
*   History

Optional
--------

*   Admin panel
*   Full example generation
*   AWS production deploy
*   advanced dashboards

* * *

14\. Как бы я сформулировал вашу систему в одном предложении
============================================================

**AI-платформа для анализа и улучшения научных технических заданий: пользователь загружает документ, система проверяет его структуру и полноту, находит ошибки и слабые формулировки, выставляет score, предлагает улучшения, формирует отчёт и позволяет общаться с AI-ассистентом по самому документу.**

Если хочешь, следующим сообщением я могу собрать тебе уже **готовый monorepo skeleton с деревом папок, названиями модулей, API endpoints и SQL-таблицами**.

## Prompt:
4/14/2026, 7:55:24 PM

смотри я думаю что нужно добавить еще один сервис который условно будет называться как то.

это ИИшка который занимается генераций/выдачи и "10.	Формирование итогового отчёта по результатам анализа." and "–	Скачивание итогового отчёта." это по сути excel xlsx документ который - "Шаблон Итоговая Таблица Оценки Научных ТЗ: /Оценка_ТЗ_шаблон.xlsx " который я прикреплял с Полями: "Название ТЗ	Организация	Эксперт	Стратегическая релевантность (20%)	Цель и задачи (10%)	Научная новизна (15%)	Практическая применимость (20%)	Ожидаемые результаты (15%)	Соц-экономический эффект (10%)	Реализуемость (10%)	Итоговый балл	Комментарий эксперта
"

смотри я хочу понять как нам реализовать 2 роли, Клиент который будет загружать файл ТЗ научного проекта, получать feedback analysis и recommendation по улучшению (так у него есть чат) и так далее.

есть Админ который может получить Итоговый отчет,

но тут не понятно как это должно работать и не совсем ясно! помоги мне понять это!

## Response:
4/14/2026, 7:55:34 PM

> **Considering user needs and spreadsheet inspection**
>
> The user likely speaks Russian, so I'll respond in Russian. They've uploaded an xlsx file and are asking about roles and reports. I don't necessarily need to inspect the file, but it might help if I use the given information. Since creating/modifying spreadsheets isn't required here, I probably don't need to refer to the spreadsheet skill documentation.
>
> **Addressing user's confusion and citations clarification**
>
> To answer the user, I’ll likely cite the TЗ doc for roles and functions, but I need to clarify the client/admin report workflow. For the xlsx file, I can mention it but since it's local, I can’t provide citations. I’ll avoid over-claiming and instead stick to what they've specifically provided.
>
> **Clarifying system flow and report generation**
>
> For the system, admins review docs, see AI-generated scores, and can add comments or export xlsx. The expert evaluation form matches the admin/expert role. The backend should focus on AI analysis, while the report-export module could be an optional addition. The final report might just be an xlsx, not AI-generated text. I'll clarify client flow: login, upload, analysis, review, and resubmission.
>
> **Clarifying admin flow and report options**
>
> The admin flow involves logging in, reviewing submissions, and managing scores. They can act as experts or assign roles, perhaps adding a "Reviewer/Expert" role. There should be two types of reports: detailed client reports (PDF/HTML) and the official admin XLSX. The report-exporter module can handle the export, consuming data from the scoring service.
>
> **Considering score calculation and file citations**
>
> For the score, I’ll use a weighted sum, and "Strategic Relevance" might require comparing documents to strategic ones. To simplify for the MVP, I could approximate it using completeness or LLM evaluation. I should cite relevant TЗ sections for functional requirements, ensuring proper citation formats with line ranges.
>
> **Inspecting xlsx columns and sheets**
>
> I’m thinking about checking the xlsx sheet names and headers to confirm the columns, though the user may have already provided this info. I could use Python to quickly inspect the workbook, but it may not be necessary unless there are multiple sheets that need closer inspection.
>
> **Inspecting workbook sheet names**
>
>
> **Retrying with Python**
>
> Okay, I’m thinking of trying Python again to process things. I’ll run the steps I need and see if it works better this time. Sometimes it needs a bit of a reset, but I’m confident it’ll come together. Let’s see what happens!
>
> **Inspecting Excel sheet data**
>
>
> **Clarifying workbook and service details**
>
> I want to mention the workbook’s formula, but I don’t think a citation is necessary here. Maybe I can just refer to "in your template," based on our direct observation. 
> 
> As for the service, it might be better to call it `reporting-service` or `evaluation-service`, focused on deterministic Excel export and possibly generating expert comments.
>
> **Clarifying report workflow and roles**
>
> There are two main artifacts: 
> 1) Interactive analysis for clients.
> 2) Official scoring report (XLSX) for admins/experts.
> 
> The pipeline is: raw document → parser → analysis → scoring → reporting. The report generates from the analysis result, not the raw PDF. 
> 
> Clients download their individual report, and admins access all reports. Admins can review, override, and export the official XLSX. 
> 
> We could keep just two roles, with admins doubling as experts.
>
> Thought for 3m 18s

Да, здесь у тебя возникла **очень правильная мысль**, но я бы её чуть переформулировал:

**тебе нужен не “ещё один AI-сервис”, а отдельный `reporting / evaluation` слой**, который собирает итоговый отчёт из результатов анализа.  
AI тут нужен только для части содержимого отчёта, например:

*   draft комментария эксперта,
*   пояснения по баллам,
*   summary по сильным и слабым сторонам.

А вот **заполнение Excel-шаблона, экспорт `.xlsx`, хранение и скачивание** — это уже не AI-задача, а **report generation / export** задача. В самом ТЗ действительно отдельно указаны и “формирование итогового отчёта по результатам анализа”, и “скачивание итогового отчёта”, а также модуль генерации отчётов как часть архитектуры.

ТЗ\_официальное (1)

ТЗ\_официальное (1)

Самая важная мысль
------------------

У тебя сейчас смешались **два разных результата системы**:

### 1\. Результат для Client

Это:

*   analysis,
*   findings,
*   recommendations,
*   improved version,
*   chat,
*   history,
*   downloadable report по его документу.
    d29b4c3d-bef4-4534-a302-2dcbb19…

### 2\. Результат для Admin / Expert

Это:

*   просмотр всех загруженных ТЗ,
*   итоговая оценочная карточка,
*   финальный экспертный отчёт,
*   экспорт в официальный Excel-шаблон.

И вот твой `.xlsx` шаблон очень сильно похож именно на **экспертную оценочную форму**, а не на просто “сырой AI output”.

* * *

Как это правильно понять
========================

Что означает “итоговый отчёт” в вашем продукте
----------------------------------------------

Я бы разделил его на **2 формы**.

### A. Client Report

Это отчёт по одному документу клиента:

*   название ТЗ;
*   score 0–100;
*   разбор по категориям;
*   найденные проблемы;
*   рекомендации;
*   suggested rewrite;
*   summary.

Это то, что клиент видит и может скачать.

### B. Admin / Expert Evaluation Report

Это уже официальный `.xlsx` по вашему шаблону:

*   Название ТЗ
*   Организация
*   Эксперт
*   Стратегическая релевантность
*   Цель и задачи
*   Научная новизна
*   Практическая применимость
*   Ожидаемые результаты
*   Соц-экономический эффект
*   Реализуемость
*   Итоговый балл
*   Комментарий эксперта

У тебя в шаблоне `Итоговый балл` уже считается формулой из колонок `E:K`, то есть это прямо готовая scorecard-модель для админского/экспертного отчёта.

* * *

Значит ли это, что нужен отдельный сервис?
==========================================

Для хакатона — не обязательно
-----------------------------

Честно: **как отдельный deployable microservice — скорее нет**.

Для MVP лучше так:

*   `frontend/`
*   `backend/`
*   `ai-service/`
*   `reporting module` внутри backend

То есть:

*   AI сервис считает баллы, находит проблемы, генерирует рекомендации и draft comment;
*   backend/reporting берет этот structured result и вставляет его в `.xlsx`.

Когда отдельный сервис оправдан
-------------------------------

Отдельный `report-service` нужен, если:

*   будет много форматов отчёта;
*   нужен batch export;
*   будут тяжёлые long-running exports;
*   захочешь отделить business reporting от core API.

Но для hackathon MVP лучше модуль, не сервис.

* * *

Как я бы это назвал
===================

Не `llm-report-service`, а что-то вроде:

*   `reporting`
*   `evaluation-reporting`
*   `assessment-export`
*   `expert-reporting`

Лучший нейминг для монорепо:

```
backend/internal/reporting
```

или если очень хочешь отдельный runtime later:

```
report-service/
```

Но сейчас я бы оставил **модулем в backend**.

* * *

Как должны работать 2 роли
==========================

И вот здесь у тебя самое главное архитектурное решение.

Вариант, который я советую
--------------------------

### Role 1: Client

Client — это автор ТЗ.

Он может:

*   зарегистрироваться и войти;
*   загрузить PDF/DOCX/TXT;
*   запустить анализ;
*   посмотреть findings;
*   посмотреть score;
*   получить рекомендации;
*   сгенерировать improved version;
*   пообщаться с AI-чатом по своему документу;
*   посмотреть историю своих документов;
*   скачать свой отчёт.
    d29b4c3d-bef4-4534-a302-2dcbb19…

### Role 2: Admin

Admin — это оператор / эксперт / жюри / модератор.

Он может:

*   видеть все документы;
*   открывать любой analysis result;
*   видеть auto-generated scorecard;
*   видеть draft “комментария эксперта” от AI;
*   при желании редактировать/подтверждать комментарий;
*   назначать поле “Эксперт”;
*   скачивать официальный `.xlsx`;
*   скачивать batch-отчёт по нескольким документам.

* * *

Где именно у тебя сейчас была неясность
=======================================

Неясность вот в чем:

> Если клиент уже получил score и рекомендации, зачем тогда admin?

Ответ:  
**потому что клиентский анализ и официальный экспертный отчёт — это не одно и то же.**

AI делает:

*   предварительный анализ;
*   предварительный score;
*   draft expert comment.

Admin делает:

*   просмотр;
*   валидацию;
*   подтверждение;
*   финальный экспорт.

Даже если на hackathon всё будет полностью автоматически, сама логика ролей становится понятной:

*   **Client** — получает сервис;
*   **Admin** — получает контроль и итоговую форму для оценки.

* * *

Лучшая продуктовая модель для вас
=================================

Я бы построил это так:

Уровень 1 — AI draft
--------------------

Система автоматически после загрузки документа строит:

*   findings,
*   recommendations,
*   score breakdown,
*   official report draft.

Уровень 2 — Admin review
------------------------

Admin открывает этот draft и:

*   подтверждает его без изменений, или
*   меняет поля `Эксперт` и `Комментарий эксперта`, или
*   чуть поправляет баллы по категориям.

Уровень 3 — Final export
------------------------

После этого жмёт:  
**Finalize Report**  
и система генерирует `.xlsx`.

Вот тогда роль Admin становится полностью логичной.

* * *

Как это будет работать по шагам
===============================

Flow 1 — Client
---------------

1.  Client регистрируется
2.  Загружает ТЗ
3.  Backend сохраняет файл
4.  AI service анализирует документ
5.  Система показывает:
    *   structure analysis
    *   missing sections
    *   findings
    *   recommendations
    *   score
    *   improved version
6.  Client может открыть чат и спросить:
    *   “что не так с целями?”
    *   “перепиши ожидаемые результаты”
    *   “почему низкая практическая применимость?”
7.  Client скачивает personal report

Flow 2 — Admin
--------------

1.  Admin входит в admin panel
2.  Видит список всех submissions
3.  Открывает конкретное ТЗ
4.  Видит:
    *   client document
    *   AI findings
    *   score breakdown
    *   draft expert comment
    *   draft excel row
5.  Нажимает:
    *   approve
    *   edit
    *   export xlsx

* * *

Что именно должно заполняться в Excel
=====================================

Вот как бы я маппил поля шаблона.

### Из системы

*   `Название ТЗ` ← `document.title`
*   `Организация` ← `client.organization_name`
*   `Эксперт` ← `admin.full_name` или `AI Draft`
*   `Стратегическая релевантность` ← score category
*   `Цель и задачи` ← score category
*   `Научная новизна` ← score category
*   `Практическая применимость` ← score category
*   `Ожидаемые результаты` ← score category
*   `Соц-экономический эффект` ← score category
*   `Реализуемость` ← score category
*   `Итоговый балл` ← формула Excel или precomputed total
*   `Комментарий эксперта` ← AI-generated summary + optional admin edit

Очень важный вывод
------------------

Значит, тебе нужна **не просто одна общая score цифра 0–100**, а **score breakdown по категориям Excel-шаблона**.

То есть scoring engine должен выдавать не только:

*   `total_score`

но и:

*   `strategic_relevance_score`
*   `goals_and_tasks_score`
*   `scientific_novelty_score`
*   `practical_applicability_score`
*   `expected_results_score`
*   `socioeconomic_effect_score`
*   `feasibility_score`

И уже из них строится итоговая таблица.

* * *

Значит ли это, что scoring надо переделать?
===========================================

Да — чуть-чуть.

Сейчас у тебя scoring был ближе к:

*   structure
*   completeness
*   clarity
*   consistency
*   kpi
*   outcomes

Для client UI это нормально.  
Но для official xlsx тебе нужен **второй слой маппинга**.

Правильная модель
-----------------

Держи **2 score view**:

### 1\. Internal AI quality score

Для клиентского интерфейса:

*   structure
*   completeness
*   clarity
*   consistency
*   KPI/results

### 2\. Expert evaluation scorecard

Для Excel:

*   strategic relevance
*   goals/tasks
*   novelty
*   applicability
*   results
*   socio-economic effect
*   feasibility

То есть одно и то же analysis ядро, но **два представления результатов**.

* * *

Как бы я построил сервисно
==========================

Рекомендуемая схема
-------------------

### `ai-service`

Отвечает за:

*   parse document
*   classify sections
*   detect findings
*   recommendations
*   chat
*   scoring draft
*   expert comment draft

### `backend`

Отвечает за:

*   auth
*   users
*   roles
*   documents
*   analysis run lifecycle
*   admin panel data
*   report generation/export

### `reporting module` внутри backend

Отвечает за:

*   взять structured scoring result
*   вставить в xlsx template
*   сохранить generated report
*   отдать download url

* * *

Как бы я это разложил в коде
============================

```
backend/internal/
  auth/
  users/
  documents/
  analysis/
  chat/
  admin/
  scoring/
  reporting/
  storage/
  ai/
```

А внутри `reporting/`:

```
reporting/
  service.go
  template_loader.go
  excel_exporter.go
  mapper.go
```

### Что делает `mapper`

Превращает AI output в поля шаблона:

```
{
  "document_title": "...",
  "organization_name": "...",
  "expert_name": "...",
  "strategic_relevance": 16,
  "goals_and_tasks": 8,
  "scientific_novelty": 11,
  "practical_applicability": 15,
  "expected_results": 10,
  "socioeconomic_effect": 7,
  "feasibility": 8,
  "expert_comment": "..."
}
```

А потом `excel_exporter` вставляет это в `Оценка_ТЗ_шаблон.xlsx`.

* * *

Как я бы сделал страницы
========================

Client pages
------------

*   Login/Register
*   Dashboard
*   Upload document
*   Document result
*   Chat with AI
*   History
*   Download report

Admin pages
-----------

*   Admin login
*   All submissions
*   Submission details
*   Review scorecard
*   Edit expert comment
*   Export report
*   Batch export optional

* * *

Нужен ли третий role — Expert?
==============================

На будущее — да, но для hackathon **не нужен**.

Для MVP оставь 2 роли:

*   `client`
*   `admin`

И трактуй `admin` как:  
**admin = expert reviewer**

Этого более чем достаточно.

* * *

Самая правильная формулировка продукта
======================================

Смотри, вот в таком виде всё становится логичным:

**Client загружает ТЗ и получает AI-анализ, рекомендации, улучшения и чат-помощника.  
Admin просматривает сгенерированную AI оценку, при необходимости корректирует экспертный комментарий и экспортирует официальный итоговый отчёт в Excel-шаблон.**

Это уже цельная модель.

* * *

Мой прямой ответ на твой вопрос
===============================

Да, отчёт в `.xlsx` у вас имеет смысл.
--------------------------------------

И он очень хорошо ложится на поле “Скачивание итогового отчёта”.

Но:
---

это **не должен быть отдельный AI-сервис**.

Правильнее так:

*   AI считает и пишет выводы;
*   reporting модуль собирает `.xlsx`.

И да:
-----

две роли у вас вполне логичны, если разделить:

*   **Client** = получение AI сервиса
*   **Admin** = подтверждение/экспорт экспертной оценки

* * *

Что я бы рекомендовал прямо сейчас утвердить как решение
========================================================

Финальная схема
---------------

*   `frontend/`
*   `backend/`
*   `ai-service/`
*   `infrastructure/`

Внутри backend
--------------

добавить модуль:

*   `reporting/`

Роли
----

*   `client`
*   `admin`

Артефакты
---------

*   client report
*   admin expert xlsx report

Процесс
-------

*   upload → analysis → score → recommendation → chat → report draft → admin review → xlsx export

Если хочешь, следующим сообщением я могу дать тебе уже **точную domain model: таблицы Postgres, статусы документа, API endpoints и mapping AI output → Excel template fields**.

## Prompt:
4/14/2026, 8:11:13 PM

напиши очень подробный User story!!! как Flow, чтобы я понял окончательно.
---
смотри Client кидает только один раз, после он итерирует/делает loop и улучшает свои ТЗ документ, после он должен будет его скачать, окей.

но смотри Client будет отправлять? (или выделять из самой системы то что понравилось, по сути должно быть из самой системы чтобы сохранилось score и так далее и это можно было использовать в report-xlsx admin (где будут не только 1 проект научный от одного человека но будет множества научных проектов от разных Client или я не прав?)) в отдельным окне свое окончательное ТЗ, админам (чтобы они сделали excel и отправили на грант или выдавали грант) которые могут просмотреть и получить report?

админ также может для каждого пришедшего ТЗ от client делать aprove/reject или нет?

админ может оставлять коментарий в самом excel xlsx (если что его можно адаптировать и изменять тоже я думаю).

может ли один человек который Client закинуть несколько ТЗ научных проектов? или например получить/создать несколько заявок или помошь от нашей системы? или как это будет работать!
---
напиши очень подробный User story!!! как Flow, чтобы я понял окончательно!!!

## Response:
4/14/2026, 8:11:16 PM

> **Providing detailed response based on provided docs and TZ**
>
> I need to answer in Russian as the user asks for a detailed flow. I’ll structure it with headers and numbered steps, referencing the uploaded TZ and template for context. My response will clarify design decisions and assumptions, avoiding “if you want”. I’ll include one follow-up suggestion about BPMN as a possible model, but it’s optional.
>
> **Outlining entities and recommended flow**
>
> I need to suggest entities like User, Project, Submission, AnalysisRun, FinalSubmission, ExpertReview, and ReportBatch. I’ll focus on detailed user stories and include a "recommended final flow" with sections outlining what’s fixed by TZ vs product decisions. I'll also clarify statuses like draft, analyzed, approved, etc. User can edit with AI and re-upload or use in-system versioning for better control.
>
> Thought for 25s

Да — сейчас тебе нужно **зафиксировать одну финальную продуктовую логику**, иначе всё будет путаться между “AI-анализом”, “улучшением документа”, “финальной отправкой” и “админским Excel”.

Ниже я дам **окончательную рекомендованную модель**, очень подробно и по шагам.

Сразу главное: по ТЗ хакатона от системы точно ожидаются загрузка документа, анализ, рекомендации, улучшенная версия, чат, история документов и скачивание итогового отчёта. Также AI должен анализировать структуру, полноту, ошибки, KPI, expected results и формировать score.

d29b4c3d-bef4-4534-a302-2dcbb19…

Но **approve/reject, экспертная очередь, финальная отправка в грант** — это уже не прямо написано в ТЗ, а **ваше продуктовое расширение**, и оно хорошее.

* * *

1\. Самая правильная финальная логика продукта
==============================================

Я бы закрепил такую модель:

Есть 2 роли:
------------

### 1\. Client

Это автор научного ТЗ или заявки.

Он:

*   загружает документ;
*   получает AI-анализ;
*   улучшает документ в несколько итераций;
*   выбирает финальную версию;
*   отправляет её на рассмотрение Admin;
*   потом может увидеть статус: approved / rejected / needs revision.

### 2\. Admin

Это эксперт / модератор / комиссия / оператор.

Он:

*   видит очередь финальных заявок;
*   открывает каждое финальное ТЗ;
*   видит AI-анализ, score, историю версий;
*   при необходимости оставляет комментарий;
*   делает approve / reject / return for revision;
*   экспортирует официальный `.xlsx` отчёт по одному или нескольким проектам.

* * *

2\. Самая важная развилка: что именно сохраняется
=================================================

Вот здесь у тебя был самый важный вопрос.

Ты спрашиваешь по сути:

> Клиент просто загружает PDF один раз, потом дорабатывает его вне системы, или всё улучшение должно жить внутри системы, чтобы сохранить score, историю и потом использовать это в admin report xlsx?

Мой ответ:

Правильнее — всё ключевое улучшение должно жить **внутри системы**
------------------------------------------------------------------

Потому что тогда вы сохраняете:

*   историю версий;
*   изменения score;
*   какие рекомендации были приняты;
*   какая версия стала финальной;
*   какой документ ушёл админу.

Именно это делает систему цельной.

Значит, не просто “upload once and forget”
------------------------------------------

А вот так:

1.  Client загружает Version 1
2.  Система анализирует Version 1
3.  Client получает рекомендации
4.  Client:
    *   либо вручную редактирует текст в системе,
    *   либо принимает AI suggestions,
    *   либо загружает новую версию файла
5.  Система сохраняет Version 2
6.  Система снова анализирует Version 2
7.  Score меняется
8.  Client сравнивает версии
9.  Когда доволен — нажимает **Submit Final Version**
10.  Именно эта версия попадает в admin queue

* * *

3\. Самая правильная модель сущностей
=====================================

Чтобы тебе окончательно стало понятно, нужно не думать “страницы”, а думать **сущности**.

Основные сущности
-----------------

### `User`

Один пользователь системы.

Поля:

*   id
*   role: `client` / `admin`
*   name
*   email
*   organization\_name

* * *

### `Project`

Один научный проект / одна заявка / одно ТЗ как бизнес-сущность.

Очень важно:  
**один Client может иметь несколько Projects.**

То есть:

*   User 1 → Project A
*   User 1 → Project B
*   User 1 → Project C

Это абсолютно логично.

* * *

### `DocumentVersion`

Конкретная версия ТЗ внутри проекта.

Например:

*   Project A
    *   Version 1: original upload
    *   Version 2: improved draft
    *   Version 3: final submission

Это лучше, чем хранить просто “один документ”.

* * *

### `AnalysisRun`

Результат AI-анализа конкретной версии.

То есть:

*   Version 1 → AnalysisRun 1
*   Version 2 → AnalysisRun 2
*   Version 3 → AnalysisRun 3

* * *

### `ReviewSubmission`

Финальная отправка версии на админское рассмотрение.

Очень важно:  
не каждая версия автоматически попадает админу.  
Только **выбранная финальная версия**.

* * *

### `ExpertReview`

Результат админского рассмотрения.

Поля:

*   status: `approved` / `rejected` / `needs_revision`
*   admin\_comment
*   approved\_at
*   reviewed\_by

* * *

### `ReportExport`

Сформированный `.xlsx` файл.

Поля:

*   submission\_id
*   report\_type
*   file\_key
*   generated\_at

* * *

4\. Ответ на твой важный вопрос: один Client может несколько ТЗ?
================================================================

Да, обязательно может
---------------------

И это даже более правильно, чем ограничивать одним документом.

Потому что в реальной жизни один человек может:

*   готовить несколько научных проектов;
*   пробовать разные заявки;
*   делать несколько версий одной идеи;
*   участвовать в нескольких программах.

Значит, правильная модель такая:

### Один Client

может иметь:

*   много `Projects`
*   у каждого Project — много `DocumentVersions`
*   у каждого Version — свой `AnalysisRun`

То есть:

**Client 1**

*   Project “AI for Medicine”
*   Project “Smart Irrigation”
*   Project “Digital Polygon”

И внутри каждого проекта — свой цикл улучшений.

* * *

5\. Теперь самый важный кусок: очень подробный User Story и Flow
================================================================

Ниже даю **окончательную продуктовую историю**, как это должно работать.

* * *

USER STORY 1 — Client впервые приходит в систему
================================================

Контекст
--------

Клиент — автор научного ТЗ.  
У него есть черновик документа в PDF/DOCX/TXT.  
Он хочет понять качество документа и улучшить его перед отправкой на рассмотрение.

Сценарий
--------

1.  Client открывает систему.
2.  Видит страницу регистрации / входа.
3.  Регистрируется как пользователь.
4.  После входа попадает на Dashboard.
5.  На Dashboard видит:
    *   кнопку “Create New Project”
    *   список старых проектов
    *   список последних анализов

Что это означает продуктово
---------------------------

Система для Client — это не просто “загрузчик PDF”, а **workspace для подготовки ТЗ**.

* * *

USER STORY 2 — Client создаёт новый проект
==========================================

Контекст
--------

Client хочет подготовить конкретную научную заявку.

Шаги
----

1.  Client нажимает **Create New Project**
2.  Заполняет:
    *   название проекта
    *   организация
    *   краткое описание
    *   тип заявки / тип ТЗ
3.  Система создаёт `Project`
4.  Статус проекта:
    *   `draft`

Что видит пользователь
----------------------

Он попадает на страницу проекта, где пока нет версий документа.

* * *

USER STORY 3 — Client загружает первую версию ТЗ
================================================

Контекст
--------

У него уже есть файл документа.

Шаги
----

1.  Client нажимает **Upload Document**
2.  Выбирает PDF/DOCX/TXT
3.  Frontend отправляет файл
4.  Backend:
    *   валидирует файл
    *   сохраняет в S3/MinIO
    *   создаёт `DocumentVersion = v1`
    *   создаёт `AnalysisRun` со статусом `pending`
5.  AI service запускает анализ

Что происходит в AI pipeline
----------------------------

Система:

*   извлекает текст;
*   анализирует структуру;
*   ищет обязательные разделы;
*   сравнивает с шаблоном;
*   ищет размытые формулировки;
*   ищет отсутствующие требования;
*   проверяет KPI и expected results;
*   генерирует рекомендации;
*   считает score.

Что видит Client
----------------

На экране:

*   статус “Analyzing...”
*   progress / spinner
*   после завершения — карточка анализа

* * *

USER STORY 4 — Client получает первый анализ
============================================

Контекст
--------

Система завершила анализ.

Что видит Client
----------------

На странице `Project / Version 1` он видит:

### A. Общий score

Например:

*   58 / 100

### B. Разбивку score

Например:

*   Structure — 60
*   Completeness — 50
*   Clarity — 55
*   KPI / Results — 40
*   Consistency — 65

### C. Найденные проблемы

Например:

*   отсутствует секция “Количественные показатели”
*   цель сформулирована слишком общо
*   задачи не связаны с ожидаемыми результатами
*   нет явного соц-экономического эффекта

### D. Рекомендации

Например:

*   добавить количественные KPI
*   конкретизировать ожидаемые результаты
*   переписать цель через measurable outcome

### E. Generated improvements

Например:

*   suggested structure
*   improved text for section
*   sample wording

### F. Chat

Чат по документу:

*   “почему score низкий?”
*   “что добавить в expected results?”
*   “перепиши цель и задачи”

* * *

USER STORY 5 — Client начинает итерационный loop улучшения
==========================================================

Вот это и есть твой главный flow.

Важная мысль
------------

Client не должен просто посмотреть анализ и уйти.

Он должен войти в **improvement loop**.

Как именно проходит loop
------------------------

### Шаг 1

Client смотрит findings.

### Шаг 2

Client выбирает проблему, например:

*   “Missing KPI”

### Шаг 3

Он нажимает:

*   `Ask AI`  
    или
*   `Generate Improved Section`

### Шаг 4

Система предлагает:

*   новый текст
*   пример KPI
*   улучшенный блок

### Шаг 5

Client делает одно из трех:

1.  Принимает suggestion полностью
2.  Редактирует suggestion вручную
3.  Игнорирует suggestion

### Шаг 6

Система сохраняет изменения как:

*   либо `Draft Changes`
*   либо `New Version Draft`

### Шаг 7

Client нажимает:  
**Re-analyze**

### Шаг 8

Создаётся:

*   `DocumentVersion = v2`
*   `AnalysisRun = #2`

### Шаг 9

Система пересчитывает score

### Шаг 10

Client сравнивает:

*   v1 score = 58
*   v2 score = 73

* * *

USER STORY 6 — Как именно лучше реализовать улучшение документа
===============================================================

Тут есть два варианта.

Вариант A — простой для хакатона
--------------------------------

Client:

*   загружает первый документ,
*   получает рекомендации,
*   копирует улучшения,
*   вручную правит файл у себя,
*   снова загружает новую версию.

Это проще технически.

Вариант B — сильнее продуктово
------------------------------

Client:

*   редактирует документ или секции прямо в системе;
*   может нажать “Apply AI suggestion”;
*   система формирует новую версию внутри платформы.

Это лучше для UX, но сложнее.

Мой совет
---------

Для hackathon MVP:

*   разрешить **оба способа**:
    *   “Upload New Version”
    *   “Apply Suggestion and Save as New Draft”

Так вы закроете и простоту, и ценность.

* * *

USER STORY 7 — Client выбирает финальную версию
===============================================

Контекст
--------

После нескольких итераций Client считает, что документ готов.

Допустим:

*   v1 = 58
*   v2 = 73
*   v3 = 82

Он решает, что `v3` — финальная.

Шаги
----

1.  Client открывает Version 3
2.  Нажимает:  
    **Submit for Review**
3.  Система спрашивает подтверждение:
    *   “Вы уверены, что хотите отправить эту версию на рассмотрение?”
4.  Client подтверждает
5.  Система создаёт:
    *   `ReviewSubmission`
6.  Статус проекта меняется:
    *   `submitted_for_review`

Очень важный момент
-------------------

После этого именно **эта версия** становится официальной для админа и отчёта.

Не все версии.  
Не все драфты.  
А только выбранная финальная.

* * *

USER STORY 8 — Что именно уходит админу
=======================================

Тут был твой важный вопрос:

> Client будет отправлять отдельное окончательное ТЗ админам?  
> Или использоваться должно то, что собрано внутри системы?

Правильный ответ:

Уходить админу должна **финальная версия проекта внутри системы**
-----------------------------------------------------------------

То есть:

*   связанный файл/текст версии
*   её score
*   её findings
*   её рекомендации
*   её AI summary
*   её generated expert draft

Именно поэтому versioning в системе так важен.

### Админу не нужно получать “что-то на почту отдельно”

У него должна быть **admin queue inside the platform**.

То есть Client не “отправляет файл админу руками”, а нажимает:  
**Submit Final Version**

И дальше это попадает в admin queue.

* * *

USER STORY 9 — Admin получает очередь заявок
============================================

Контекст
--------

Есть несколько клиентов и несколько проектов.

Например:

*   Client A → Project 1
*   Client A → Project 2
*   Client B → Project 3
*   Client C → Project 4

У каждого проекта финально отправлена одна версия.

Что видит Admin
---------------

На странице `Review Queue`:

*   Submission ID
*   Project Title
*   Client Name
*   Organization
*   Submitted At
*   AI Score
*   Status

Статусы:

*   submitted
*   under\_review
*   approved
*   rejected
*   needs\_revision

Что делает Admin
----------------

Открывает одну заявку.

* * *

USER STORY 10 — Admin открывает конкретную заявку
=================================================

Что он видит
------------

### Блок 1. Информация о проекте

*   название ТЗ
*   организация
*   клиент
*   дата отправки

### Блок 2. Сам документ

*   PDF preview / text preview
*   текущая финальная версия

### Блок 3. AI analysis

*   score
*   breakdown
*   missing sections
*   findings
*   recommendations

### Блок 4. История

*   v1
*   v2
*   v3 final

### Блок 5. Draft expert evaluation

Поля под Excel:

*   strategic relevance
*   goals and tasks
*   novelty
*   practical applicability
*   expected results
*   socio-economic effect
*   feasibility
*   total score
*   expert comment draft

* * *

USER STORY 11 — Admin approve / reject / return for revision
============================================================

Да — это очень логичный flow.

Хотя прямо в ТЗ этого нет, это **сильное продуктовое решение**.

Какие действия нужны Admin
--------------------------

### 1\. Approve

Значит:

*   документ принят;
*   финальный отчёт можно экспортировать;
*   заявка готова дальше.

### 2\. Reject

Значит:

*   документ отклонён;
*   можно оставить причину.

### 3\. Needs Revision / Return for Revision

Это самый полезный статус.

Значит:

*   Client должен доработать документ;
*   проект не закрыт;
*   можно снова отправить позже.

Почему это правильно
--------------------

Потому что между `approve` и `reject` часто нужен третий вариант:  
**“не отклоняем совсем, а верните на доработку”**

Я бы рекомендовал именно такие 3 статуса:

*   `approved`
*   `rejected`
*   `needs_revision`

* * *

USER STORY 12 — Может ли Admin оставлять комментарий?
=====================================================

Да, обязательно
---------------

И лучше не “в Excel руками”, а **внутри системы**, а потом это вставлять в Excel.

Это очень важный продуктовый выбор.

### Почему не редактировать Excel напрямую

Потому что:

*   неудобно;
*   сложно для UI;
*   тяжело контролировать версионирование;
*   потом трудно сохранять комментарии в БД.

### Правильнее так

Admin в UI видит поле:

**Expert Comment**

Он:

*   либо принимает AI draft,
*   либо редактирует его,
*   либо пишет свой.

Потом при экспорте `.xlsx` это поле попадает в колонку:  
**Комментарий эксперта**

Значит:
-------

### Да, Admin может оставлять комментарий

Но лучше:

*   не в самом Excel-файле как редактор,
*   а в системе,
*   с последующим export to xlsx.

* * *

USER STORY 13 — Как формируется Excel report
============================================

Теперь самая важная связка с твоим шаблоном.

Когда формируется `.xlsx`
-------------------------

Не на каждом черновике клиента.

А в одном из двух режимов:

### Режим A — draft report

Система может сгенерировать предварительный `.xlsx` даже до admin review.

### Режим B — final report

После admin review и подтверждения — формируется официальный `.xlsx`.

Что подставляется в Excel
-------------------------

*   Название ТЗ ← Project / final version title
*   Организация ← client.organization
*   Эксперт ← admin name
*   Баллы по критериям ← expert scorecard
*   Итоговый балл ← formula or computed
*   Комментарий эксперта ← AI draft + admin edits

* * *

USER STORY 14 — Batch report для множества проектов
===================================================

Ты правильно понял:

> report-xlsx admin может быть не для одного проекта, а для множества научных проектов от разных Client

Да, это абсолютно правильно
---------------------------

И даже очень логично.

У Admin может быть 20 submitted projects.  
Он может:

*   открыть один проект;
*   экспортировать один `.xlsx`;
*   или выбрать 10 approved submissions и сделать batch export.

Значит, должно быть 2 типа отчётов
----------------------------------

### 1\. Single submission report

Отчёт по одному проекту

### 2\. Batch evaluation workbook

Один Excel, где несколько строк для нескольких проектов

Это очень хорошо ложится на ваш шаблон, который по своей природе похож на табличный evaluation sheet.

* * *

USER STORY 15 — Что происходит, если Admin вернул на доработку
==============================================================

Очень важный цикл.

Flow
----

1.  Client отправил final version v3
2.  Admin посмотрел
3.  Admin поставил `needs_revision`
4.  Оставил комментарий:
    *   “Уточнить ожидаемые количественные показатели”
    *   “Добавить связь с программными документами”
5.  Client в своём проекте видит:
    *   статус `needs_revision`
    *   admin comment
6.  Client создаёт:
    *   v4
7.  Система снова анализирует v4
8.  Client снова жмёт Submit for Review
9.  Admin видит новую submission version

Это очень хорошая продуктовая модель
------------------------------------

Она делает систему не просто one-shot analyzer, а реальным workflow-инструментом.

* * *

USER STORY 16 — Может ли Client делать несколько заявок
=======================================================

Да, не просто может — так и нужно проектировать
-----------------------------------------------

### Один Client может:

*   создать несколько проектов;
*   у каждого проекта иметь несколько версий;
*   часть проектов оставить draft;
*   часть отправить на review;
*   часть уже approved.

Пример:

### Client: Aigerim

*   Project 1 — submitted
*   Project 2 — draft
*   Project 3 — needs revision
*   Project 4 — approved

Это полностью нормальная модель.

* * *

USER STORY 17 — Окончательный end-to-end flow
=============================================

Вот теперь даю **окончательный полный flow**, уже в одной линии.

Полный жизненный цикл проекта
-----------------------------

### Этап 1. Client onboarding

1.  Client регистрируется
2.  Входит в систему
3.  Попадает на dashboard

### Этап 2. Создание проекта

4.  Создаёт новый scientific project
5.  Заполняет базовую информацию

### Этап 3. Первая загрузка

6.  Загружает первую версию ТЗ
7.  Система сохраняет файл
8.  AI запускает анализ
9.  Система строит:
    *   structure analysis
    *   missing sections
    *   issues
    *   score
    *   recommendations
    *   generated improvements

### Этап 4. Improvement loop

10.  Client изучает findings
11.  Использует chat
12.  Принимает / редактирует AI suggestions
13.  Либо правит текст в системе
14.  Либо загружает новую версию
15.  Система повторно анализирует
16.  Score обновляется
17.  История версий сохраняется

### Этап 5. Финализация

18.  Client выбирает лучшую версию
19.  Нажимает Submit for Review
20.  Система фиксирует именно эту версию как final submission

### Этап 6. Admin queue

21.  Admin заходит в review queue
22.  Видит список submitted projects
23.  Открывает один проект
24.  Смотрит:
    *   документ
*   AI analysis
*   version history
*   draft expert scorecard
*   expert comment draft

### Этап 7. Admin decision

25.  Admin выбирает:
    *   approve
*   reject
*   needs\_revision
    26.  При необходимости редактирует:
    *   scores
*   expert comment
    27.  Система сохраняет review decision

### Этап 8. Report export

28.  Система генерирует official `.xlsx`
29.  Admin скачивает Excel
30.  Client видит итоговый статус

* * *

6\. Самая правильная схема статусов
===================================

Вот это тебе очень поможет.

Статус Project / Submission
---------------------------

*   `draft`
*   `analyzing`
*   `ready`
*   `improving`
*   `submitted_for_review`
*   `under_review`
*   `approved`
*   `rejected`
*   `needs_revision`

Статус Version
--------------

*   `uploaded`
*   `analyzed`
*   `selected_as_final`

Статус Report
-------------

*   `not_generated`
*   `draft_generated`
*   `final_generated`

* * *

7\. Самая правильная продуктовая формулировка
=============================================

Теперь всё можно сформулировать очень просто:

Что делает Client
-----------------

Client использует систему как **AI workspace для подготовки ТЗ**:

*   загружает документ,
*   анализирует,
*   улучшает,
*   сравнивает версии,
*   выбирает финальную,
*   отправляет на review.

Что делает Admin
----------------

Admin использует систему как **workflow-панель экспертной оценки**:

*   просматривает финальные версии,
*   использует AI как помощника,
*   подтверждает или корректирует оценку,
*   оставляет комментарий,
*   экспортирует итоговый Excel.

* * *

8\. Самый короткий окончательный ответ на твои вопросы
======================================================

Client кидает только один раз?
------------------------------

Нет.  
Лучше, чтобы Client мог:

*   загрузить первую версию,
*   потом делать loop улучшений,
*   сохранять новые версии,
*   и только потом отправить финальную.

Client должен отправлять отдельное окончательное ТЗ?
----------------------------------------------------

Да, но не “отдельно вне системы”.  
Он должен **внутри системы выбрать финальную версию и отправить её на review**.

Нужно ли сохранять score и историю?
-----------------------------------

Да, обязательно.  
Именно поэтому versioning внутри системы очень важен.

Может ли Admin approve/reject?
------------------------------

Да, это очень разумно.  
Я бы добавил еще:

*   `needs_revision`

Может ли Admin оставлять комментарий?
-------------------------------------

Да.  
Но лучше в UI, а затем экспортировать в Excel.

Может ли один Client иметь несколько ТЗ?
----------------------------------------

Да, обязательно.  
Один Client → много Projects → у каждого Project много Versions.

* * *

9\. Что я рекомендую утвердить как финальную модель
===================================================

Утверди вот это без колебаний:

### Роли

*   `client`
*   `admin`

### Главная сущность

*   `project`

### Внутри проекта

*   `document_versions`
*   `analysis_runs`

### Финализация

*   `submit final version for review`

### Review

*   `approve / reject / needs_revision`

### Export

*   single xlsx
*   batch xlsx

* * *

10\. Одна финальная user story в человеческом виде
==================================================

**Как Client**, я хочу загрузить своё научное ТЗ, получить AI-анализ, несколько раз улучшить документ с помощью рекомендаций и чата, сохранить лучшую версию и отправить её на экспертное рассмотрение.

**Как Admin**, я хочу видеть очередь присланных финальных ТЗ, просматривать AI-анализ и версии документа, оставлять экспертный комментарий, принимать решение approve/reject/needs revision и экспортировать официальный итоговый Excel-отчёт по одному или нескольким проектам.

* * *

Следующим сообщением я могу превратить это в **готовый BPMN-like flow / state machine / SQL entities / API endpoints**, чтобы у тебя уже была полностью инженерная спецификация.

## Prompt:
4/14/2026, 8:34:29 PM

USER STORY 12

окей тут я понял и согласен что нужно в Admin UI оставлять Комментарий к Проекту, но можешь его лучше описать! смотри он получается до approve/reject оставляет комментарий и потом он уходит как feedback к клиенту (если reject или также если accept? или только reject) или если проект идет в финальный xlsx документ (тогда accepted and has comment)??? или как?

---
USER STORY 13 — Как формируется Excel report

для этого что ты имеешь ввиду Режим А и Режим B? какой мне выбрать или сделать обе? я не понял в чем суть генераций draft report xlsx предварительно до admin review? ты имеешь ввиду генерация до Admin Review (но что значит admin review - это значит что он оставил comment and accept сделал? или для reject тоже генерить, хотя это не логично генерировать финальный отчет для выделение грантов на основе проектов которые rejected), 

что ты имеешь ввиду формируется официальный .xlsx, там же по сути не сразу же будет генерация, а будет так что админ смотрит approved projects (table) и может сгенировать .xlsx документ который будет финальным и в котором хорошие ТЗ проектов Clients которые были улучшены в системе, или как? 

также что будем делать с:

Provided Example Excel File columns: 
Название ТЗ	Организация	Эксперт	Стратегическая релевантность (20%)	Цель и задачи (10%)	Научная новизна (15%)	Практическая применимость (20%)	Ожидаемые результаты (15%)	Соц-экономический эффект (10%)	Реализуемость (10%)	Итоговый балл	Комментарий эксперта.

что делать для полей где есть Проценты?
это мы должны отдельно анализ делать или это анализ на основе ai-service который видит и Client и Admin? или это поля и анализ только для Admin? как лучше?

откуда брать Итоговый Балл? (для Admin отдельно или для Client тоже из ai-service?)

---

## Response:
4/14/2026, 8:34:40 PM

> **Clarifying product design citation sources**
>
> The user asks for a product design answer, not related to the latest trends, so I don't need web sources. I do need citations from files uploaded by the user, but I’m unsure about referencing snippets without line numbers. I'll try searching specific phrases from the uploaded files to gather accurate references.
>
> **Clarifying scoring and report mode options**
>
> The user gave column labels but didn’t provide line numbers from the xlsx file, so we can’t cite specific lines. I’ll base the response on the provided columns. For the report modes, I'll recommend Mode B for a final xlsx for the hackathon and suggest using the same scoring engine for both internal and admin versions, with clean categories that map to a 0-100 scale.
>
> **Simplifying scoring and feedback structures**
>
> To avoid confusion, I'll recommend using a single core scoring model for both admin and client. Clients see the AI's preliminary score, and admins can edit it before finalizing the score. Regarding feedback, I'll suggest using two separate fields: one for internal notes to the client and another for expert comments in the final report. This avoids ambiguity.
>
> Thought for 48s

Да — у тебя здесь смешались **две разные сущности комментария** и **два разных смысла Excel**, поэтому и появилась путаница.

Ниже дам уже **окончательное решение**, которое я бы рекомендовал вам зафиксировать.

ТЗ требует и анализ документа, и score, и рекомендации, и скачивание итогового отчёта, и чат, и историю документов. Также там отдельно есть “модуль генерации отчётов” и AI-функции вроде анализа, выявления ошибок, score 0–100, генерации структуры и сравнения с эталонными шаблонами.

ТЗ\_официальное (1)

ТЗ\_официальное (1)

* * *

1\. USER STORY 12 — комментарий Admin: как правильно сделать
============================================================

Главная проблема
----------------

Сейчас у тебя один “комментарий Admin” пытается выполнять сразу 3 роли:

1.  feedback клиенту на доработку
2.  пояснение решения approve/reject
3.  официальный комментарий эксперта в Excel

Так делать **не надо**.

Правильное решение
------------------

Нужно разделить комментарий на **2 разных поля**.

### Поле A — `review_feedback`

Это комментарий **для Client**.

Он нужен, чтобы Client понял:

*   почему проект вернули;
*   что нужно исправить;
*   почему его отклонили;
*   что именно понравилось, если проект approved.

### Поле B — `expert_report_comment`

Это комментарий **для итогового Excel / экспертной формы**.

Он нужен, чтобы попасть в колонку:  
**“Комментарий эксперта”**

* * *

Как работает `review_feedback`
------------------------------

Это поле связано с workflow review.

### Когда используется

*   `needs_revision` — обязательно
*   `rejected` — обязательно
*   `approved` — опционально

### Что видит Client

Когда Admin завершает review, Client видит:

*   status
*   review\_feedback

### Примеры

#### Если `needs_revision`

> Уточните количественные показатели прямых результатов и добавьте связь с программными документами.

#### Если `rejected`

> Документ недостаточно формализован, отсутствуют ключевые ожидаемые результаты и критерии реализуемости.

#### Если `approved`

> Проект хорошо структурирован, ожидаемые результаты сформулированы понятно, замечаний по логике нет.

То есть:

*   для reject/revision это **feedback**
*   для approve это скорее **final note**

* * *

Как работает `expert_report_comment`
------------------------------------

Это уже не workflow feedback, а **официальное экспертное резюме**, которое попадет в `.xlsx`.

### Когда используется

Я бы рекомендовал так:

*   для `approved` — обязательно
*   для `rejected` — не включать в финальный grant xlsx
*   для `needs_revision` — не включать в финальный grant xlsx

### Почему

Потому что финальный Excel у вас по смыслу нужен как **итоговая таблица оценки проектов**, которые реально прошли review и готовы дальше.  
Для отклонённых или возвращённых на доработку отдельный final export не нужен.

* * *

Значит ли это, что approved проект может иметь comment?
-------------------------------------------------------

Да, обязательно
---------------

И это нормально.

У approved проекта comment не означает “есть проблема”.  
Он означает:

*   краткое экспертное резюме;
*   сильные стороны;
*   возможно, небольшие замечания;
*   пояснение оценки.

### Пример

> Проект обладает высокой практической применимостью и хорошо описанными ожидаемыми результатами, однако научная новизна раскрыта умеренно.

Это хороший **accepted + has comment** сценарий.

* * *

Мой финальный совет по USER STORY 12
------------------------------------

Не делайте один универсальный comment.

Сделайте так:

*   `review_feedback` — для общения с Client
*   `expert_report_comment` — для официального Excel

Это сразу убирает 90% путаницы.

* * *

2\. Как выглядит Admin Review в реальном flow
=============================================

Вот правильный flow.

Admin открывает submission
--------------------------

Он видит:

*   документ
*   AI analysis
*   score
*   breakdown
*   history versions
*   draft comments

Потом Admin выбирает decision
-----------------------------

### Вариант 1 — `approved`

Тогда:

*   может заполнить `review_feedback` опционально
*   должен заполнить `expert_report_comment`
*   submission попадает в pool approved projects

### Вариант 2 — `needs_revision`

Тогда:

*   должен заполнить `review_feedback`
*   `expert_report_comment` не обязателен
*   в final xlsx не попадает

### Вариант 3 — `rejected`

Тогда:

*   должен заполнить `review_feedback`
*   `expert_report_comment` не обязателен
*   в final xlsx не попадает

* * *

3\. USER STORY 13 — как на самом деле должен формироваться Excel report
=======================================================================

Теперь к самому важному.

Ты правильно заметил, что моя старая формулировка “Mode A / Mode B” могла запутать.

Мой обновлённый и более правильный совет
----------------------------------------

### Для hackathon MVP выбирай только **один основной режим**

И этот режим должен быть:

**Final Admin Export Only**
---------------------------

То есть:

*   Excel генерируется **не заранее**
*   Excel генерируется **после review**
*   Excel генерируется **по approved проектам**

Это самый логичный, чистый и понятный вариант.

* * *

Что я имел в виду под “draft report”
------------------------------------

Я имел в виду теоретически можно было бы делать предварительный xlsx до admin review.  
Но для вашего продукта это сейчас **не нужно**.

### Почему не нужно

Потому что:

*   это создаёт путаницу “черновой report vs финальный report”;
*   админ всё равно должен посмотреть проект;
*   rejected/needs\_revision проекты не должны попадать в grant-like final workbook;
*   на хакатоне лучше меньше сложных веток.

Поэтому:
--------

### Делайте только:

*   UI preview в системе
*   final xlsx export после admin review

* * *

4\. Какой именно flow Excel я рекомендую
========================================

Вот финальная модель.

Шаг 1
-----

Client загружает и улучшает ТЗ.

Шаг 2
-----

Client отправляет финальную версию на review.

Шаг 3
-----

Admin просматривает submission.

Шаг 4
-----

Admin принимает решение:

*   approved
*   needs\_revision
*   rejected

Шаг 5
-----

Только `approved` submissions попадают в раздел:  
**Approved Projects**

Шаг 6
-----

Admin открывает таблицу approved projects.

Шаг 7
-----

Admin выбирает:

*   один approved project  
    или
*   несколько approved projects

Шаг 8
-----

Жмёт:  
**Generate Final XLSX**

Шаг 9
-----

Система генерирует Excel:

*   по одному проекту  
    или
*   по нескольким approved проектам

* * *

5\. Значит ли это, что xlsx генерируется “сразу после approve”?
===============================================================

Не обязательно
--------------

И даже лучше — **не сразу**.

Я бы делал так:

### После approve

submission просто попадает в состояние:

*   `approved`
*   `ready_for_export`

### А уже потом

Admin сам запускает:

*   `Export Selected`  
    или
*   `Export All Approved`

Это гораздо лучше.

### Почему

Потому что:

*   удобно собрать batch из нескольких хороших проектов;
*   нет лишней генерации файлов;
*   проще workflow;
*   понятнее демо.

* * *

6\. Итоговый правильный flow по Excel
=====================================

Не так:
-------

*   upload → auto xlsx
*   review → ещё один xlsx
*   reject → тоже xlsx

А так:
------

*   upload
*   analyze
*   improve
*   submit
*   admin review
*   approved pool
*   export xlsx from approved pool

Это и есть чистая продуктовая логика.

* * *

7\. Что делать с колонками Excel и процентами
=============================================

Теперь про ваш Excel-шаблон:

*   Название ТЗ
*   Организация
*   Эксперт
*   Стратегическая релевантность (20%)
*   Цель и задачи (10%)
*   Научная новизна (15%)
*   Практическая применимость (20%)
*   Ожидаемые результаты (15%)
*   Соц-экономический эффект (10%)
*   Реализуемость (10%)
*   Итоговый балл
*   Комментарий эксперта

Что означают проценты
---------------------

Это **веса критериев**, а не просто подписи.

### Самая правильная реализация

Оценивать каждую категорию **сразу в её максимальном весе**:

*   Стратегическая релевантность: 0–20
*   Цель и задачи: 0–10
*   Научная новизна: 0–15
*   Практическая применимость: 0–20
*   Ожидаемые результаты: 0–15
*   Соц-экономический эффект: 0–10
*   Реализуемость: 0–10

### Тогда:

**Итоговый балл = простая сумма всех категорий = 0–100**

Это лучший вариант.

* * *

Почему это лучше, чем ставить каждой категории 0–100
----------------------------------------------------

Потому что тогда пришлось бы ещё раз умножать на веса.  
А это сложнее и для UI, и для Excel, и для объяснения.

### Значит:

Ставьте баллы сразу в weighted points.

Например:

*   Стратегическая релевантность = 16 из 20
*   Цель и задачи = 7 из 10
*   Научная новизна = 11 из 15
*   Практическая применимость = 18 из 20
*   Ожидаемые результаты = 12 из 15
*   Соц-экономический эффект = 8 из 10
*   Реализуемость = 9 из 10

Итог:  
16 + 7 + 11 + 18 + 12 + 8 + 9 = 81

* * *

8\. Эти поля должен видеть только Admin или и Client тоже?
==========================================================

Вот здесь есть два хороших варианта, но я рекомендую один.

Вариант 1 — показывать только Admin
-----------------------------------

Минус:

*   Client не понимает, по каким критериям потом будут смотреть его проект;
*   теряется прозрачность.

Вариант 2 — показывать Client и Admin
-------------------------------------

Это лучше.

### Но:

показывать Client их нужно как **AI preliminary evaluation**, а Admin — как **reviewable expert scorecard**.

* * *

Правильная модель
-----------------

### Client видит

*   предварительную AI-оценку по тем же категориям
*   это помогает ему улучшать ТЗ

### Admin видит

*   те же категории
*   может подтвердить или скорректировать
*   именно эта версия становится финальной

Почему это лучший выбор
-----------------------

Потому что тогда:

*   одна scoring model;
*   нет двух разных миров;
*   Client понимает, как улучшать документ;
*   Admin не начинает с пустого листа.

* * *

9\. Значит ли это, что анализ по этим полям должен делать AI-service?
=====================================================================

Да
--

Именно AI-service должен выдавать **draft scorecard** по этим критериям.

### То есть AI-service должен вернуть что-то вроде:

```
{
  "strategic_relevance": {
    "score": 16,
    "max": 20,
    "reason": "Проект связан с приоритетами программы, но связь раскрыта не полностью"
  },
  "goals_and_tasks": {
    "score": 7,
    "max": 10,
    "reason": "Цель сформулирована понятно, но задачи частично дублируются"
  },
  "scientific_novelty": {
    "score": 11,
    "max": 15,
    "reason": "Новизна присутствует, но описана без достаточного сравнения с существующими решениями"
  }
}
```

И так по всем категориям.

* * *

10\. Тогда откуда брать “Итоговый Балл”?
========================================

Правильный ответ:
-----------------

Итоговый балл берётся **из этой же scorecard**, а не из отдельной магии.

### Формула:

`total_score = sum(weighted category scores)`

Но важно:
---------

у вас должно быть **2 состояния этого total\_score**.

### 1\. `ai_preliminary_total_score`

Это то, что видит Client и Admin до review.

### 2\. `final_reviewed_total_score`

Это то, что подтверждает Admin.

* * *

Значит ли это, что Client и Admin видят разные total scores?
------------------------------------------------------------

Не обязательно разные, но **разного статуса**.

### Client

видит:

*   “Предварительная AI-оценка: 81/100”

### Admin

видит:

*   “Предварительная AI-оценка: 81/100”
*   может изменить некоторые категории
*   после подтверждения получается:
    *   “Итоговая подтвержденная оценка: 79/100”

* * *

11\. Самая правильная финальная scoring-модель
==============================================

Я бы рекомендовал вам **не делать две независимые score systems**.

Делайте одну official scorecard
-------------------------------

На основе колонок Excel.

То есть и Client, и Admin работают вокруг одной rubric:

*   strategic\_relevance (0–20)
*   goals\_and\_tasks (0–10)
*   scientific\_novelty (0–15)
*   practical\_applicability (0–20)
*   expected\_results (0–15)
*   socio\_economic\_effect (0–10)
*   feasibility (0–10)

И дополнительно
---------------

можно отдельно иметь internal technical checks:

*   missing sections
*   vague wording
*   missing KPI
*   inconsistencies

Но они не отдельный второй score, а **drivers** для этих категорий.

* * *

12\. Как это красиво связать с шаблоном научного ТЗ
===================================================

Ваш шаблон научного ТЗ очень помогает вот где:

*   цели и задачи прямо есть;
*   ожидаемые результаты прямо есть;
*   требуются количественные показатели;
*   есть конечный результат и соц-экономический эффект.

То есть AI-service может использовать:

*   структуру шаблона,
*   expected sections,
*   наличие measurable results,
*   socio-economic effect,
*   strategic alignment

чтобы выдавать score по official rubric.

* * *

13\. Окончательное решение, которое я советую вам утвердить
===========================================================

Комментарии
-----------

Сделать 2 поля:

*   `review_feedback`
*   `expert_report_comment`

Решения review
--------------

*   `approved`
*   `needs_revision`
*   `rejected`

Excel
-----

Генерировать **только после admin review**  
и только для:

*   approved submissions

Export flow
-----------

Admin открывает:

*   approved projects table

и дальше:

*   export one  
    или
*   export selected many

Оценка
------

Одна official weighted scorecard:

*   7 категорий
*   сумма = 100

AI-service
----------

Генерирует:

*   draft category scores
*   reasons per category
*   draft expert report comment

Admin
-----

Подтверждает или редактирует:

*   category scores
*   expert report comment

Итоговый балл
-------------

*   preliminary: из AI-service
*   final: после admin confirmation

* * *

14\. Самый короткий ответ на твои вопросы
=========================================

Comment у Admin — до approve/reject или после?
----------------------------------------------

Во время review.  
Потом он сохраняется вместе с решением.

Этот comment уходит Client?
---------------------------

`review_feedback` — да.  
`expert_report_comment` — нет, это для xlsx.

Approved проект может иметь comment?
------------------------------------

Да, и это нормально.

Делать Mode A и Mode B?
-----------------------

Нет.  
Для MVP делайте только:  
**final xlsx export after admin review**

Что значит “official xlsx”?
---------------------------

Это файл, который Admin генерирует из таблицы approved projects.

Что делать с процентами?
------------------------

Использовать их как максимальные баллы по категориям.

Откуда брать итоговый балл?
---------------------------

Из суммы категорий scorecard.

Для Client и Admin score один или разный?
-----------------------------------------

Ядро одно и то же.  
Client видит preliminary AI score.  
Admin видит и подтверждает final score.

* * *

Если хочешь, следующим сообщением я могу сделать тебе уже **готовую таблицу domain model: поля сущностей Submission / Review / Scorecard / ReportExport**, чтобы ты сразу передал это в backend и frontend.

## Prompt:
4/14/2026, 8:45:00 PM

хорошо мне нравиться я понял.

давай теперь перейдем к Обязанностям/Сферам которые будет обрабатывать/реализовывать backend и ai-service,

в основном backend будет postgres база данных,

будет ли в ai-service своя база данных или мы будем делать запрос из основного backend и получать данные и сохранять у себя в базе данных?

как правильно сделать чат? в плане где где он будет и как он будет работать что будет понимать контекст для Client и его отправленного документа, сгенированных с ai-service рекомендациями и так далее?

## Response:
4/14/2026, 8:45:11 PM

> **Answering without web search and using reasoning**
>
> The user's request about architecture design doesn't require the latest updates, just general tech insights. I can focus on reasoning without needing current facts because architecture doesn't change drastically. For backend vs. AI-service responsibilities, I’ll provide concise, helpful answers without web citations. I'll cite the user's file for relevant factual details, but no need to refer to docs.
>
> **Defining architecture responsibilities for chat flow**
>
> For architecture, the backend should own the primary Postgres database and handle writes. The AI service can remain stateless but may need read access to certain tables for chat retrieval. For simplicity, using one shared Postgres with separate schemas (for example, public/app and ai schemas) should work well for a quick solution like a hackathon.
>
> Thought for 49s

Да. Здесь лучше сразу зафиксировать **один чистый принцип**:

Главный принцип
---------------

**Backend — system of record и владелец бизнес-сущностей.**  
**AI-service — вычислительный и интеллектуальный слой.**

Это хорошо совпадает с ТЗ, где отдельно есть backend, AI-модуль, база данных, модуль анализа документов и модуль генерации отчётов. То есть backend не должен превращаться в “тонкий прокси”, а AI-service не должен становиться “вторым главным приложением”.

d29b4c3d-bef4-4534-a302-2dcbb19…

* * *

1\. Как правильно разделить Backend и AI-service
================================================

Backend отвечает за бизнес и состояние системы
----------------------------------------------

То есть backend должен владеть всем, что связано с:

*   пользователями;
*   ролями;
*   проектами;
*   версиями документов;
*   статусами;
*   отправкой на review;
*   admin review;
*   report export;
*   историей;
*   правами доступа;
*   chat sessions и chat messages как бизнес-объектами.

Backend — это “скелет продукта”.

### Значит backend должен делать:

*   auth / registration / login;
*   users and roles;
*   projects;
*   document versions;
*   file metadata;
*   storage integration with S3/MinIO;
*   запуск analysis run;
*   сохранение результатов анализа;
*   submit for review;
*   approve / reject / needs\_revision;
*   export xlsx;
*   history;
*   chat session lifecycle;
*   audit / logs.

* * *

AI-service отвечает за интеллект и вычисления
---------------------------------------------

AI-service не должен жить как “ещё один полноценный product backend”.  
Он должен быть специализированным сервисом, который умеет:

*   извлечь текст из PDF/DOCX/TXT;
*   выделить секции;
*   проверить обязательные разделы;
*   сравнить с шаблоном;
*   найти проблемы;
*   вычислить scorecard;
*   сгенерировать рекомендации;
*   сгенерировать improved text;
*   сгенерировать draft expert comment;
*   отвечать в чате по документу.

AI-service — это “мозг анализа”.

* * *

2\. Что именно должно жить в Backend
====================================

Я бы закрепил за backend такие домены.

`auth`
------

*   register
*   login
*   refresh
*   session control
*   RBAC

`users`
-------

*   profile
*   organization
*   role

`projects`
----------

*   один client может иметь много scientific projects
*   project metadata
*   project status

`documents`
-----------

*   загрузка исходного файла
*   document versions
*   selected final version

`analysis`
----------

*   запуск анализа
*   хранение analysis run status
*   отдача результатов во frontend

`review`
--------

*   submit for review
*   admin queue
*   approve / reject / needs\_revision
*   review feedback

`scorecard`
-----------

*   хранение предварительной и финальной scorecard

`reporting`
-----------

*   генерация final xlsx
*   batch export approved projects

`chat`
------

*   chat sessions
*   chat messages
*   conversation ownership
*   streaming response orchestration

* * *

3\. Что именно должно жить в AI-service
=======================================

Я бы закрепил за AI-service такие модули.

`document_parser`
-----------------

*   PDF/DOCX/TXT extraction
*   optional OCR fallback

`section_analyzer`
------------------

*   heading detection
*   section classification
*   completeness check

`issue_detector`
----------------

*   vague wording
*   missing requirements
*   inconsistencies
*   logical issues
*   missing KPI / expected outcomes

`scoring_engine`
----------------

*   draft weighted scorecard
*   reasons per criterion
*   total preliminary score

`recommendation_engine`
-----------------------

*   actionable recommendations
*   improved fragments
*   section rewrite suggestions

`generation_engine`
-------------------

*   recommended structure
*   example section / example draft

`chat_engine`
-------------

*   document-aware retrieval
*   answer generation
*   context summarization
*   citations

Это хорошо соответствует самому ТЗ: анализ структуры, проверка обязательных разделов, AI-анализ текста, выявление ошибок и неточностей, score, рекомендации, generation и чат.

d29b4c3d-bef4-4534-a302-2dcbb19…

* * *

4\. Нужна ли AI-service своя база данных
========================================

Мой короткий ответ:
-------------------

**отдельную вторую PostgreSQL базу для AI-service делать не надо.**

Для вашего monorepo и hackathon/MVP правильнее:

Один общий Postgres
-------------------

Но с **логическим разделением ответственности**.

* * *

Как лучше сделать
-----------------

### Вариант, который я рекомендую

**Один Postgres на всю систему.**

Backend и AI-service работают с одной БД, но:

*   backend — основной владелец данных;
*   AI-service — пишет и читает только свои AI-артефакты или временные данные.

### Лучше всего через схемы

Например:

*   `app.*` — бизнес-таблицы backend
*   `ai.*` — AI-таблицы и артефакты

* * *

Почему это лучше
----------------

Потому что:

*   меньше инфраструктуры;
*   проще docker-compose;
*   проще локальная разработка;
*   меньше синхронизации между двумя БД;
*   легче делать joins и собирать report;
*   легче для чата и retrieval.

* * *

Когда отдельная БД для AI была бы нужна
---------------------------------------

Отдельная БД или отдельный vector store нужен позже, если:

*   документов станет очень много;
*   retrieval станет тяжёлым;
*   появится отдельный data science pipeline;
*   будет need for scaling independently.

Но сейчас это избыточно.

* * *

5\. Кто должен сохранять результаты анализа
===========================================

Здесь есть 2 возможные модели.

Модель A — backend как единственный писатель
--------------------------------------------

AI-service возвращает JSON, backend сохраняет всё в Postgres.

### Плюсы

*   очень чистое ownership;
*   backend полностью контролирует запись.

### Минусы

*   большие ответы;
*   неудобно для embeddings/chunks;
*   сложнее для chat retrieval.

* * *

Модель B — shared DB, AI-service пишет свои таблицы
---------------------------------------------------

Backend создаёт `analysis_run`, вызывает AI-service.  
AI-service:

*   читает документ;
*   пишет `ai.document_chunks`
*   пишет `ai.findings`
*   пишет `ai.scorecards`
*   пишет `ai.recommendations`
*   помечает run completed

### Плюсы

*   удобно для AI pipeline;
*   удобно для чата;
*   удобно для embeddings/RAG;
*   меньше JSON-трафика.

### Минусы

*   надо дисциплинированно разделить ownership.

* * *

Что я советую
-------------

Для вашей задачи — **гибрид, но ближе к Модели B**:

*   backend создаёт и контролирует сущности;
*   AI-service пишет только в `ai.*` таблицы;
*   backend читает агрегированные результаты и показывает их пользователю.

То есть:

*   backend — хозяин workflow,
*   AI-service — хозяин AI output.

Это лучший баланс.

* * *

6\. Окончательная рекомендация по базе данных
=============================================

Вот как бы я зафиксировал.

Backend-owned tables
--------------------

*   `app.users`
*   `app.projects`
*   `app.project_members` optional
*   `app.document_versions`
*   `app.review_submissions`
*   `app.admin_reviews`
*   `app.chat_sessions`
*   `app.chat_messages`
*   `app.report_exports`

AI-owned tables
---------------

*   `ai.document_chunks`
*   `ai.section_classifications`
*   `ai.analysis_findings`
*   `ai.scorecard_drafts`
*   `ai.recommendations`
*   `ai.generated_sections`
*   `ai.chat_summaries`
*   `ai.chunk_embeddings` or vector column in chunks

* * *

7\. Как правильно сделать чат
=============================

Вот здесь самое важное.

Чат не должен быть “общим ChatGPT”
----------------------------------

Он должен быть:

**project-aware**
-----------------

и

**document-version-aware**
--------------------------

То есть чат всегда работает **в контексте конкретного проекта и конкретной версии документа**.

* * *

Где он должен быть в UI
-----------------------

Лучший вариант:

### чат встроен в страницу анализа документа

То есть на странице `Project / Version / Analysis` есть вкладки или блоки:

*   Overview
*   Findings
*   Recommendations
*   Improved Version
*   Chat

Так Client понимает, что он говорит не с “общим ИИ”, а именно с ассистентом по своему ТЗ.

* * *

Что чат должен понимать
-----------------------

Чат должен видеть не только сам документ.

Он должен понимать:

### 1\. Сам текущий документ

*   текст
*   секции
*   версия

### 2\. Результаты анализа

*   findings
*   missing sections
*   scorecard
*   reasons
*   recommendations

### 3\. Историю разговора

*   последние сообщения
*   краткое summary диалога

### 4\. Шаблон / rubric

*   expected structure
*   mandatory sections
*   official evaluation criteria

### 5\. Workflow context

Например:

*   проект сейчас `draft`
*   или `needs_revision`
*   есть admin feedback
*   client улучшает документ после возврата

* * *

8\. Как чат должен работать технически
======================================

Главный принцип
---------------

На каждый вопрос нельзя слать “весь PDF + всю историю чата + все findings”.  
Нужно делать **retrieval + context assembly**.

* * *

Правильный flow чата
--------------------

### Шаг 1

Client открывает страницу проекта и жмёт `Chat`.

### Шаг 2

Frontend создаёт или открывает `chat_session`, связанную с:

*   `project_id`
*   `document_version_id`
*   `analysis_run_id`

### Шаг 3

Client пишет вопрос:

> Почему у меня низкая практическая применимость?

### Шаг 4

Backend:

*   проверяет, что это его проект;
*   сохраняет user message;
*   вызывает `ai-service/chat`.

### Шаг 5

AI-service собирает контекст:

*   relevant chunks из документа;
*   relevant findings;
*   relevant recommendations;
*   current scorecard;
*   previous short chat summary.

### Шаг 6

AI-service генерирует ответ.

### Шаг 7

Backend сохраняет assistant message.

### Шаг 8

Frontend показывает ответ и, желательно, источники:

*   section
*   fragment
*   recommendation reference

* * *

9\. Кто должен владеть логикой чата
===================================

Backend владеет:
----------------

*   chat sessions
*   chat messages
*   access control
*   rate limiting
*   streaming endpoint to frontend
*   привязкой чата к проекту и версии

AI-service владеет:
-------------------

*   retrieval
*   prompt building
*   reasoning
*   answer generation
*   summary memory

* * *

10\. Где должен храниться контекст для чата
===========================================

Тут тоже нужно разделить.

В backend
---------

хранятся:

*   сами сообщения чата;
*   сессия;
*   к какому проекту и версии относится чат.

В AI-service / ai schema
------------------------

хранятся:

*   document chunks;
*   embeddings;
*   findings;
*   recommendations;
*   short conversation summaries if вы хотите дешёвую long-term memory.

* * *

11\. Как сделать, чтобы чат понимал документ и рекомендации
===========================================================

Вот это ключевой момент.

Чат должен отвечать не только по raw document
---------------------------------------------

Он должен уметь отвечать по 4 слоям:

### Слой 1 — raw document

Например:

> Что написано в разделе ожидаемых результатов?

### Слой 2 — analysis findings

Например:

> Какие логические ошибки ты нашёл?

### Слой 3 — recommendations

Например:

> Как лучше переписать цель проекта?

### Слой 4 — workflow feedback

Например:

> Что именно попросил исправить администратор?

То есть чат должен быть не только `document QA`, а именно:

**analysis-aware assistant**
----------------------------

* * *

12\. Самая правильная логика чата для Client
============================================

Я бы рекомендовал 4 поддерживаемых режима, но в UI не обязательно показывать их как разные.

Фактически он должен уметь:

### 1\. Explain

Объяснить проблемы

> Почему у меня низкий балл по ожидаемым результатам?

### 2\. Improve

Предложить улучшение

> Перепиши этот раздел лучше.

### 3\. Compare

Сравнить с шаблоном

> Чего не хватает по сравнению с эталонной структурой?

### 4\. Guide

Провести пользователя

> Что мне сделать сначала, чтобы поднять итоговый балл?

* * *

13\. Должен ли чат видеть все версии документа
==============================================

Мой совет:
----------

По умолчанию чат должен работать с **текущей активной версией**.

Но можно дать маленький переключатель:

*   current version
*   previous version
*   compare versions

Для MVP достаточно:

### chat = only active version

И этого уже более чем достаточно.

* * *

14\. Как чат работает после admin feedback
==========================================

Если проект получил `needs_revision`, чат становится особенно полезным.

Например Client открывает проект после возврата и спрашивает:

> Что именно нужно исправить по замечанию администратора?

Тогда AI-service должен уметь включать в контекст:

*   `review_feedback`
*   текущий score
*   проблемные секции

И отвечать:

> Администратор просит уточнить количественные показатели и связь проекта со стратегическими документами. Сейчас у вас слабее всего оценены разделы “Ожидаемые результаты” и “Стратегическая релевантность”.

Это очень сильный UX.

* * *

15\. Нужен ли чату отдельный vector store
=========================================

Для MVP — нет отдельный сервис не нужен
---------------------------------------

Достаточно:

*   один Postgres
*   `pgvector` или просто embeddings в той же БД

Если времени совсем мало, можно даже сначала сделать чат без сложного vector retrieval:

*   current document text
*   findings
*   recommendations
*   scorecard summary

Но если хотите “чтобы понимал PDF нормально”, тогда лучше делать chunk-based retrieval.

* * *

16\. Моя финальная рекомендация по архитектуре чата
===================================================

Backend
-------

делает:

*   `POST /chat/sessions`
*   `POST /chat/sessions/{id}/messages`
*   хранение сообщений
*   ownership и auth

AI-service
----------

делает:

*   `POST /ai/chat/respond`
*   retrieval по document\_version
*   retrieval по findings/recommendations
*   answer generation
*   summary update

* * *

17\. Какими должны быть входные данные в AI chat endpoint
=========================================================

Я бы делал так, чтобы backend передавал минимум идентификаторов:

```
{
  "chat_session_id": "...",
  "project_id": "...",
  "document_version_id": "...",
  "analysis_run_id": "...",
  "user_message": "..."
}
```

Дальше AI-service сам подтягивает нужный контекст из общей БД.

Почему это лучше:

*   backend не собирает гигантский prompt;
*   меньше дублирования логики;
*   retrieval централизован в одном месте.

* * *

18\. Каким должен быть ответ AI-service
=======================================

Лучше не просто строка, а структурированный объект:

```
{
  "answer": "...",
  "used_context": [
    {
      "type": "finding",
      "ref": "finding_123"
    },
    {
      "type": "chunk",
      "ref": "chunk_45"
    }
  ],
  "suggested_actions": [
    "Добавить количественные показатели",
    "Уточнить ожидаемые результаты"
  ],
  "chat_summary_update": "..."
}
```

Это очень поможет и фронту, и логике аудита.

* * *

19\. Если ответить совсем практично: нужна ли AI-service своя база
==================================================================

Отдельная вторая БД — нет.
--------------------------

Свои таблицы в общем Postgres — да.
-----------------------------------

Backend остаётся главным владельцем системы — да.
-------------------------------------------------

Чат должен быть в связке:
-------------------------

*   backend хранит сессии и сообщения,
*   ai-service собирает контекст и генерирует ответы.

* * *

20\. Самая правильная короткая формула для вашей команды
========================================================

Зафиксируйте вот это:

Backend
-------

**владеет продуктом, workflow, ролями, статусами, review, history, reports и chat sessions**

AI-service
----------

**владеет parsing, analysis, scoring, recommendations, generation и document-aware chat reasoning**

Database
--------

**один общий Postgres, без отдельной второй AI базы**

Chat
----

**не общий, а привязанный к project + document version + analysis context**

* * *

Если хочешь, следующим сообщением я могу дать тебе уже **готовую схему таблиц Postgres для backend/app и ai schemas + sequence flow чата + API endpoints**.

## Prompt:
4/14/2026, 9:02:20 PM

Утверждения:

также смотри поля из xlsx (нам нужно брать как score 0/100 для Client):
Provided Example Excel File columns: Название ТЗ Организация Эксперт Стратегическая релевантность (20%) Цель и задачи (10%) Научная новизна (15%) Практическая применимость (20%) Ожидаемые результаты (15%) Соц-экономический эффект (10%) Реализуемость (10%) Итоговый балл Комментарий эксперта.

Итог оценка в xlsx должен быть на основе (ai_preliminary_total_score, сумма всех категорий, из Score ai-service - это видит Client) + (final_reviewed_total_score это Админка/Экспер ставит свою оценку) и сумма total_score выходит.

---
Нужно Доработать:

- chat функционал

также почему chat есть и в golang core backend и в python ai-service???

- база данных (for core backend golang vs ai-service python)

нет смотри я не хочу чтобы мой ai-service python шел в базу данных основного backend, (я также не вижу смысла, или лучше чтобы он также записывал в основную базу данных, данные - но тогда как он будет получать от golang backend user_id и прикреплять к отправленным projects? or documents?) или это нормально?

должен ли ai-service ходить в postgres бд, и правильно ли это?

мне кажется что это не правильный подход!!!

## Response:
4/14/2026, 9:02:28 PM

> **Answering user’s architectural concerns**
>
> I need to address the user's concerns based on the uploaded files and their product design. While we don’t need the web, I might reference the file cites for factual documentation. I'll clarify the recommendation without involving external search. It seems like a backend-only DB approach could be recommended, especially for hackathons.
>
> **Applying architecture for AI-service and backend DB**
>
> I’ll recommend keeping the AI-service separate from the DB, and we can discuss the tradeoffs. The backend will handle DB access and act as the orchestrator, while the AI-service remains stateless. For now, during the hackathon, storing parsed text and findings in the backend DB should be enough. 
> 
> I’ll also clarify the chat structure between backend and AI-service—each is responsible for different pieces.
> 
> I'll fix the scoring formula so the final review score overrides the preliminary score, rather than being added.
>
> Thought for 24s

Да — у тебя здесь очень важное замечание, и я с ним во многом согласен.

Главное исправление
-------------------

### Неправильно

`ai_preliminary_total_score + final_reviewed_total_score = итоговый балл`

### Правильно

Это должны быть **два разных состояния одной и той же оценки**, а не сумма двух оценок.

То есть:

*   `ai_preliminary_total_score` — предварительная AI-оценка, которую видит Client
*   `final_reviewed_total_score` — финальная оценка, которую подтверждает или корректирует Admin

Что должно попасть в финальный XLSX
-----------------------------------

Для `approved` проекта в итоговый Excel должен попадать:

*   **final\_reviewed\_total\_score**, если Admin его подтвердил/изменил
*   либо, если вы хотите упростить MVP, **ai\_preliminary\_total\_score** как финальный по умолчанию, если Admin ничего не менял

Но **не сумма двух total\_score**.

### Пример

AI посчитал:

*   Стратегическая релевантность = 16/20
*   Цель и задачи = 7/10
*   Научная новизна = 11/15
*   Практическая применимость = 18/20
*   Ожидаемые результаты = 12/15
*   Соц-экономический эффект = 8/10
*   Реализуемость = 9/10

AI total:

*   `ai_preliminary_total_score = 81`

Admin посмотрел и изменил:

*   Научная новизна: 11 → 10
*   Реализуемость: 9 → 8

Тогда:

*   `final_reviewed_total_score = 79`

### В XLSX идёт:

*   `79`, а не `81 + 79`

Это лучше всего согласуется с вашей scorecard-логикой и итоговым отчётом по результатам анализа.

d29b4c3d-bef4-4534-a302-2dcbb19…

* * *

1\. Что делать с полями XLSX и Client score 0–100
=================================================

Да, я согласен с твоим направлением:

Эти же категории нужно использовать и для Client
------------------------------------------------

То есть Client должен видеть **ровно ту же rubric**, что и потом будет использоваться в экспертном Excel:

*   Стратегическая релевантность (0–20)
*   Цель и задачи (0–10)
*   Научная новизна (0–15)
*   Практическая применимость (0–20)
*   Ожидаемые результаты (0–15)
*   Соц-экономический эффект (0–10)
*   Реализуемость (0–10)

Итог:

*   `0–100`

Почему это правильно
--------------------

Потому что тогда система становится прозрачной:

*   Client понимает, по каким критериям его оценивают
*   Admin работает с той же моделью
*   XLSX — это не “другой мир”, а просто финальное представление той же оценки

Значит:
-------

### Client видит

*   `ai_preliminary_scorecard`
*   `ai_preliminary_total_score`

### Admin видит

*   ту же предварительную scorecard
*   и может сделать `final_reviewed_scorecard`
*   из неё считается `final_reviewed_total_score`

* * *

2\. Теперь про чат: почему он “есть и там, и там”
=================================================

Это хороший вопрос.  
Потому что сейчас слово **chat** используется для двух разных вещей.

В Go backend chat — это продуктовая сущность
--------------------------------------------

То есть:

*   chat sessions
*   chat messages
*   кому принадлежит чат
*   к какому project/document относится чат
*   кто имеет доступ
*   история разговора

Это не “AI чат-логика”, а **продуктовый слой**.

В Python ai-service chat — это интеллектуальный движок
------------------------------------------------------

То есть:

*   как собрать контекст
*   как понять документ
*   как понять findings/recommendations
*   как сгенерировать ответ
*   как сделать rewrite/explain

Это уже не “сущность чата”, а **reasoning engine**.

* * *

Как это лучше назвать, чтобы не путаться
----------------------------------------

Я бы переименовал:

### В backend

не `chat`, а:

*   `conversation`  
    или
*   `assistant_sessions`

### В ai-service

не `chat`, а:

*   `assistant_engine`  
    или
*   `conversation_reasoning`  
    или
*   `document_assistant`

Тогда станет ясно:

### Backend:

хранит разговор

### AI-service:

думает и отвечает

* * *

3\. Теперь самое важное: должен ли ai-service ходить в основную Postgres БД
===========================================================================

Ты пишешь:

> я не хочу чтобы мой ai-service python шел в базу данных основного backend  
> мне кажется это не правильный подход

И это **абсолютно нормальная архитектурная позиция**.

Мой прямой ответ
----------------

### Да — можно и даже очень разумно сделать так, чтобы AI-service вообще не ходил в основную Postgres БД.

И для вашего случая это может быть **лучше и чище**.

* * *

4\. Какой подход я теперь рекомендую именно вам
===============================================

С учетом того, что ты хочешь строгую границу ответственности, я бы рекомендовал:

Архитектурное правило
---------------------

**Только Go backend работает с основной Postgres БД.**  
**AI-service — stateless compute service.**

То есть:

*   backend читает из БД
*   backend собирает нужный контекст
*   backend вызывает ai-service
*   ai-service возвращает structured result
*   backend сохраняет всё обратно в БД

Это очень хороший подход
------------------------

Потому что:

*   ownership чистый
*   AI-service не знает про пользователей и бизнес-модель
*   нет риска, что AI-service сломает app-данные
*   проще дебажить
*   проще security
*   проще permissions
*   проще миграции

* * *

5\. Тогда как будет работать AI-service без БД
==============================================

Очень просто.

Backend будет передавать AI-service всё нужное как входные данные
-----------------------------------------------------------------

### Для анализа документа

Backend отправляет:

```
{
  "project_id": "proj_123",
  "document_version_id": "ver_2",
  "document_text": "...",
  "template_context": "...",
  "organization_name": "...",
  "project_title": "...",
  "analysis_mode": "full"
}
```

AI-service возвращает:

```
{
  "sections": [...],
  "findings": [...],
  "recommendations": [...],
  "scorecard": {...},
  "total_score": 81,
  "draft_expert_comment": "..."
}
```

Backend уже сам сохраняет это в Postgres.

* * *

Для чата
--------

Backend отправляет:

```
{
  "project_id": "proj_123",
  "document_version_id": "ver_3",
  "user_message": "Почему у меня низкий балл по ожидаемым результатам?",
  "document_excerpt_context": [...],
  "analysis_summary": {...},
  "recommendations": [...],
  "review_feedback": "..."
}
```

AI-service возвращает:

```
{
  "answer": "...",
  "citations": [...],
  "suggested_actions": [...]
}
```

И backend сохраняет assistant message.

* * *

6\. Тогда откуда брать `user_id` и как его прикреплять
======================================================

Вот это как раз плюс твоего подхода.

Если AI-service не ходит в БД
-----------------------------

То ему **вообще не нужно самому прикреплять `user_id`**.

### Почему

Потому что:

*   `user_id`
*   `project_id`
*   `document_version_id`
*   `analysis_run_id`
*   `chat_session_id`

всем этим владеет backend.

AI-service только получает payload и отвечает.

Значит:
-------

### Backend делает всё бизнес-связывание

*   какой user
*   какой project
*   какой document
*   какая версия
*   какой чат
*   какой review

А AI-service — просто вычисляет.

Это как раз и есть более чистый подход.

* * *

7\. Правильно ли, чтобы AI-service ходил в Postgres
===================================================

Ответ:
------

### Это **может быть** правильно,

но **для вас сейчас не обязательно** и, возможно, даже хуже.

То есть это не “антипаттерн” само по себе.  
Но для вашего проекта я бы выбрал:

**Backend-only DB access**
--------------------------

И это будет сильная архитектура.

* * *

8\. Когда AI-service всё же может получить свою БД
==================================================

Это уже отдельный вопрос.

Если потом у вас появится:

*   vector search
*   embeddings
*   chunk retrieval
*   long-term AI memory
*   expensive parsing artifacts

тогда можно сделать:

### либо отдельную БД/хранилище для AI-service

например:

*   `ai-postgres`
*   `pgvector`
*   `redis`
*   `qdrant`

### либо отдельные таблицы/индексы только под AI

Но это уже **отдельное техническое решение**, не обязанное трогать core business DB напрямую.

* * *

9\. Тогда какая финальная архитектура БД лучше для вас
======================================================

Я бы рекомендовал вам вот так:

Вариант, который я советую
--------------------------

### Основной `postgres` — только для backend

Хранит:

*   users
*   roles
*   projects
*   document\_versions
*   analysis\_results
*   scorecards
*   admin\_reviews
*   report\_exports
*   chat\_sessions
*   chat\_messages

AI-service
----------

Не имеет прямого доступа к этой БД.

Он работает как:

*   analysis engine
*   scoring engine
*   recommendation engine
*   assistant engine

И получает/возвращает JSON через HTTP/gRPC.

* * *

10\. Но как тогда сделать “умный чат по документу”
==================================================

Вот тут есть тонкий момент.

Если AI-service вообще не ходит в БД, то **кто собирает контекст для чата?**

Ответ:
------

### Backend.

Именно backend должен собрать context packet и отправить его в AI-service.

* * *

Как это выглядит
----------------

### Шаг 1

Client пишет:

> Как улучшить ожидаемые результаты?

### Шаг 2

Backend находит в БД:

*   текущий project
*   current document version
*   latest analysis result
*   scorecard
*   relevant findings
*   recommendations
*   optional admin feedback
*   последние сообщения чата

### Шаг 3

Backend формирует AI context payload

### Шаг 4

Отправляет в AI-service

### Шаг 5

AI-service генерирует ответ

### Шаг 6

Backend сохраняет ответ в `chat_messages`

* * *

11\. Это не будет слишком тяжело для backend?
=============================================

Для hackathon MVP — нет, это нормально.

И даже полезно, потому что:

*   логика централизована
*   меньше магии
*   проще понять поток данных
*   проще контролировать доступ

* * *

12\. Тогда как именно доработать chat функционал
================================================

Я бы рекомендовал вот такую модель.

Chat в продукте = часть страницы анализа проекта
------------------------------------------------

Client открывает:

*   Project
*   Final/Current Version
*   Analysis

И там есть вкладка:

*   `Assistant`

Chat контекст состоит из 5 слоёв
--------------------------------

### 1\. Current document text

или relevant excerpt

### 2\. Analysis findings

например:

*   missing KPI
*   weak novelty
*   vague expected results

### 3\. Scorecard

например:

*   `expected_results = 8/15`
*   `feasibility = 6/10`

### 4\. Recommendations

например:

*   add measurable indicators
*   clarify target outcomes

### 5\. Review feedback

если проект был возвращён на доработку

* * *

Какие режимы должен поддерживать чат
------------------------------------

### Explain

> Почему у меня низкая практическая применимость?

### Improve

> Перепиши секцию ожидаемых результатов

### Guidance

> Что мне сделать первым делом, чтобы поднять итоговый балл?

### Review-aware

> Что именно просил исправить администратор?

* * *

13\. Как я бы окончательно разделил обязанности
===============================================

Go backend
----------

Отвечает за:

*   auth
*   users
*   roles
*   projects
*   document versions
*   file uploads
*   persistence
*   analysis result storage
*   admin review
*   xlsx export
*   chat sessions/messages
*   context assembly for AI

AI-service
----------

Отвечает за:

*   document analysis
*   section checking
*   finding detection
*   scoring
*   recommendations
*   generation
*   chat reasoning
*   expert comment drafting

* * *

14\. Моя окончательная рекомендация именно под твою позицию
===========================================================

С учётом того, что ты не хочешь давать AI-service доступ к основной БД, я считаю, что **тебе стоит это утвердить как архитектурное решение**.

Утверждение
-----------

**AI-service не имеет прямого доступа к core Postgres.**  
**Все чтение и запись бизнес-данных выполняет только Go backend.**  
**AI-service работает как stateless intelligence engine через API.**

Это чисто, безопасно и очень хорошо подходит для hackathon MVP.

* * *

15\. Что я бы закрепил прямо сейчас как финальные архитектурные решения
=======================================================================

Scoring
-------

*   одна official rubric на основе XLSX колонок
*   Client видит preliminary AI score
*   Admin подтверждает final reviewed score
*   total score не суммируется дважды

Chat
----

*   backend хранит conversation
*   backend собирает context
*   ai-service только отвечает

Database
--------

*   один core Postgres для backend
*   ai-service без прямого доступа к нему

AI-service
----------

*   stateless
*   HTTP API
*   structured JSON responses

* * *

16\. Самый короткий прямой ответ на твой вопрос
===============================================

Должен ли ai-service ходить в Postgres?
---------------------------------------

**Нет, не обязан.**  
И для вас я бы сказал: **лучше не надо**.

Это неправильный подход?
------------------------

Не всегда неправильный, но для вас сейчас **лучше backend-only DB access**.

Почему chat и там, и там?
-------------------------

Потому что это две разные ответственности:

*   backend — хранение и ownership чата
*   ai-service — интеллект ответа

Как тогда делать context-aware chat?
------------------------------------

Backend собирает document + findings + recommendations + score + feedback и отправляет это в ai-service.

* * *

Если хочешь, следующим сообщением я могу уже собрать тебе **финальный architecture contract: кто какие endpoint'ы держит, какие JSON payload'ы идут между backend и ai-service, и какие таблицы нужны только backend'у**.

## Prompt:
4/14/2026, 10:22:24 PM

дай мне теперь полный и очень подробный и хороший User story.
чтобы я использовал его как основную бизнес логику и перешёл к реализации!

## Response:
4/14/2026, 10:22:32 PM

Соберу это как финальную бизнес-спецификацию: роли, сущности, статусы, полный flow Client/Admin и правила, что именно считать “истиной” в системе.

> **Clarifying citation needs for user story in Russian**
>
> User likely needs an answer in Russian. They asked for a business logic summary based on the provided template and previous discussion, so no web search should be necessary. However, I must cite the uploaded template using the correct file search citation (turn6file0), though line numbers may not be required. I’ll ensure thoroughness in the response.
>
> **Crafting detailed business logic in Russian**
>
> I’ll create a detailed user story or business logic, structuring it with scope, roles, goals, and acceptance criteria, while using file citations wherever appropriate. Since the user wants a clear and detailed response, I'll include headers and numbered sections for readability. I'll avoid excessive bullets and clarify assumptions vs. TZ, noting differences like additional workflows not covered in the TZ. The final text will be in Russian.
>
> **Drafting business logic with user stories**
>
> I'll draft the business logic including sections for the product purpose, roles, permissions, core entities, and statuses. I'll break down user stories like registration, project creation, analysis reception, and admin review. Each user story will include acceptance criteria and business rules. Chat behavior, scoring logic, and MVP implementation will also be covered. I'll ensure to cite file sources for tasks, user functions, and template outcomes.
>
> Thought for 44s

Отлично. Ниже — **финальная подробная User Story / бизнес-логика продукта**, уже в том виде, в котором её можно брать как основу для реализации backend, frontend и AI-service.

Сразу зафиксирую важную рамку.  
**Прямо из ТЗ** обязательны: загрузка документа, анализ структуры, проверка обязательных разделов, AI-анализ текста, выявление ошибок и пробелов, рекомендации, генерация улучшений, score 0–100, итоговый отчёт, чат и история документов.

ТЗ\_официальное (1)

ТЗ\_официальное (1)

**Роли Client/Admin, review queue, approve/reject, финальный Excel для одобренных проектов** — это уже ваше **продуктовое расширение**, и оно выглядит логично и сильно.

* * *

1\. Продукт в одном абзаце
==========================

Система помогает автору научного ТЗ загрузить документ, получить AI-анализ, увидеть слабые места, улучшить документ в несколько итераций, выбрать финальную версию и отправить её на экспертное рассмотрение. Эксперт или администратор просматривает финальную версию, видит предварительную AI-оценку, при необходимости корректирует её, оставляет комментарий и формирует итоговый Excel-отчёт по одобренным проектам. Это хорошо соответствует задаче “анализ, верификация и улучшение качества технических заданий”, а также требованиям по score, recommendations, chat и final report.

ТЗ\_официальное (1)

d29b4c3d-bef4-4534-a302-2dcbb19…

* * *

2\. Главная бизнес-идея
=======================

Система — это не просто “один upload PDF и один ответ AI”.  
Система — это **workspace для подготовки и улучшения ТЗ**.

То есть у продукта есть два больших режима:

**режим автора** — подготовка, улучшение, сравнение версий, отправка на review;  
**режим эксперта** — просмотр, оценка, решение approve/reject/needs\_revision, экспорт итогового Excel.

* * *

3\. Роли в системе
==================

3.1. Client
-----------

Client — это автор ТЗ, заявитель, исследователь, участник, который хочет улучшить свой документ.

Его цель:

*   загрузить документ;
*   получить понятную оценку;
*   понять, что не так;
*   улучшить ТЗ;
*   выбрать лучшую версию;
*   отправить её на review;
*   получить итоговый статус.

3.2. Admin
----------

Admin — это эксперт, модератор, комиссия или оператор.

Его цель:

*   просматривать финальные submissions;
*   видеть AI-анализ;
*   подтверждать или корректировать score;
*   оставлять экспертный комментарий;
*   принимать решение;
*   собирать approved проекты в итоговый Excel.

3.3. Важная оговорка
--------------------

В ТЗ явно зафиксированы пользовательские функции, AI-функции, отчёт и чат, но роль Admin как отдельный workflow-участник не описана отдельно. Это значит, что **Admin workflow — это ваше архитектурно-продуктовое усиление**, а не противоречие ТЗ.

ТЗ\_официальное (1)

* * *

4\. Основные сущности системы
=============================

Это самый важный раздел. Если эти сущности правильно понять, дальше реализация станет намного проще.

4.1. User
---------

Пользователь системы.

Поля по смыслу:

*   `id`
*   `role` = client | admin
*   `full_name`
*   `email`
*   `organization_name`
*   `created_at`

* * *

4.2. Project
------------

Один научный проект / одна заявка / один кейс подготовки ТЗ.

Очень важное правило:  
**один Client может иметь много Projects.**

То есть один человек не ограничен одним ТЗ. Он может:

*   создать несколько научных проектов;
*   работать над несколькими заявками;
*   возвращаться к ним позже.

* * *

4.3. Document Version
---------------------

Конкретная версия ТЗ внутри одного Project.

Пример:

*   Project A
    *   Version 1 — initial upload
    *   Version 2 — improved after AI feedback
    *   Version 3 — final candidate
    *   Version 4 — revised after admin feedback

Это основа всего loop-а улучшения.

* * *

4.4. Analysis Result
--------------------

Результат AI-анализа конкретной версии документа.

Содержит:

*   найденные секции;
*   missing sections;
*   findings;
*   recommendations;
*   generated improvements;
*   preliminary scorecard;
*   preliminary total score.

Это прямо вытекает из требований ТЗ про анализ структуры, проверку полноты, выявление ошибок, score, рекомендации и generation.

ТЗ\_официальное (1)

ТЗ\_официальное (1)

* * *

4.5. Chat Session
-----------------

Отдельная беседа Client с AI по конкретному проекту и, как правило, по активной версии документа.

Важно:  
чат не должен быть “глобальным”.  
Он должен быть привязан к:

*   `project_id`
*   активной версии документа
*   последнему анализу

* * *

4.6. Review Submission
----------------------

Факт отправки финальной версии проекта на рассмотрение Admin.

Очень важное правило:  
**не каждая версия попадает админу.**  
Только та версия, которую Client сознательно отметил как финальную и отправил на review.

* * *

4.7. Admin Review
-----------------

Результат экспертного рассмотрения.

Содержит:

*   decision
*   review feedback для Client
*   expert report comment для Excel
*   final reviewed scorecard
*   final reviewed total score
*   reviewer identity
*   reviewed\_at

* * *

4.8. Report Export
------------------

Сгенерированный итоговый `.xlsx` файл.

Может быть:

*   по одному approved project;
*   по нескольким approved projects.

* * *

5\. Главная бизнес-правда системы
=================================

Ниже — то, что нужно утвердить как “истину”.

5.1. Один Client может иметь много проектов
-------------------------------------------

Это обязательно.

5.2. Один проект может иметь много версий документа
---------------------------------------------------

Это обязательно.

5.3. Каждая версия может иметь свой анализ
------------------------------------------

Это обязательно.

5.4. Только одна версия может быть выбрана как финальная submission
-------------------------------------------------------------------

Это обязательно.

5.5. Только финальная submission уходит в admin queue
-----------------------------------------------------

Это обязательно.

5.6. В итоговый Excel попадают только approved submissions
----------------------------------------------------------

Это наиболее логичная продуктовая модель.

5.7. Preliminary AI score и final reviewed score не суммируются
---------------------------------------------------------------

Final reviewed score **заменяет** предварительную оценку как финальную официальную оценку.

* * *

6\. Официальная score model
===========================

Ты уже утвердил хороший подход: брать score для Client из той же логики, что и итоговая Excel-оценка.

Значит, система использует одну official rubric:

*   Стратегическая релевантность — 0..20
*   Цель и задачи — 0..10
*   Научная новизна — 0..15
*   Практическая применимость — 0..20
*   Ожидаемые результаты — 0..15
*   Соц-экономический эффект — 0..10
*   Реализуемость — 0..10

Итого:

*   `total_score = sum(all category scores)` = `0..100`

Два состояния этой же score model
---------------------------------

### Preliminary

Это считает AI-service.  
Видит Client.  
Видит Admin как draft.

### Final reviewed

Это подтверждает или правит Admin.  
Именно это идёт в финальный Excel.

* * *

7\. Два типа комментариев Admin
===============================

Это важно закрепить как правило.

7.1. Review Feedback
--------------------

Комментарий для Client.

Используется, чтобы объяснить:

*   что исправить;
*   почему rejected;
*   что улучшить;
*   что понравилось в approved версии.

Этот комментарий виден Client.

7.2. Expert Report Comment
--------------------------

Комментарий для финального Excel.

Это официальный экспертный комментарий для итоговой таблицы.  
Его не надо использовать как рабочую переписку с Client.

* * *

8\. Основные статусы
====================

8.1. Статус Project
-------------------

*   `draft`
*   `in_progress`
*   `submitted_for_review`
*   `under_review`
*   `approved`
*   `rejected`
*   `needs_revision`

8.2. Статус Document Version
----------------------------

*   `uploaded`
*   `analyzed`
*   `improved`
*   `selected_as_final`

8.3. Статус Review Submission
-----------------------------

*   `submitted`
*   `under_review`
*   `decision_made`

8.4. Статус Report Export
-------------------------

*   `not_generated`
*   `generated`

* * *

9\. Полный end-to-end user flow
===============================

Теперь — самая главная часть.

* * *

10\. User Story A — Client начинает работу
==========================================

Сценарий
--------

Как Client, я хочу войти в систему и создать новый проект, чтобы начать улучшение научного ТЗ.

Flow
----

1.  Client открывает веб-приложение.
2.  Видит страницу входа / регистрации.
3.  Регистрируется или входит в систему.
4.  После успешного входа попадает на Dashboard.
5.  На Dashboard видит:
    *   список своих проектов;
    *   кнопку “Create New Project”;
    *   историю последних документов;
    *   статусы submitted / approved / needs revision.

Результат
---------

Client авторизован и готов создать проект.

Acceptance criteria
-------------------

*   Пользователь может зарегистрироваться и войти.
*   После входа он видит только свои проекты.
*   В системе уже есть базовый личный workspace.

Это напрямую поддерживается пользовательскими функциями ТЗ про регистрацию/авторизацию и доступ к истории.

ТЗ\_официальное (1)

* * *

11\. User Story B — Client создаёт новый Project
================================================

Сценарий
--------

Как Client, я хочу создать новый Project, чтобы подготовить отдельное ТЗ по конкретной научной идее или заявке.

Flow
----

1.  Client нажимает “Create New Project”.
2.  Заполняет:
    *   title
    *   organization
    *   short description
    *   optional project type
3.  Система создаёт Project в статусе `draft`.
4.  Client попадает на страницу этого Project.

Результат
---------

В системе появилась бизнес-сущность Project, в которую позже будут загружаться версии документа.

Acceptance criteria
-------------------

*   Один Client может создать несколько Projects.
*   Каждый Project независим от других.
*   У каждого Project своя история версий и review lifecycle.

* * *

12\. User Story C — Client загружает первую версию ТЗ
=====================================================

Сценарий
--------

Как Client, я хочу загрузить файл ТЗ в PDF/DOCX/TXT, чтобы система его проанализировала.

Flow
----

1.  На странице проекта Client нажимает “Upload Document”.
2.  Выбирает PDF, DOCX или TXT.
3.  Frontend отправляет файл в backend.
4.  Backend:
    *   валидирует тип файла;
    *   сохраняет исходный файл;
    *   создаёт `Document Version = v1`;
    *   инициирует AI analysis.
5.  Client видит статус обработки.

Результат
---------

Версия `v1` сохранена, анализ запущен.

Acceptance criteria
-------------------

*   Поддерживаются PDF, Word, TXT.
*   После загрузки создаётся новая версия документа.
*   Анализ запускается для конкретной версии, а не “для проекта вообще”.

Это прямо соответствует ТЗ по загрузке файлов и анализу документа.

ТЗ\_официальное (1)

* * *

13\. User Story D — Система анализирует документ
================================================

Сценарий
--------

Как Client, я хочу, чтобы система автоматически проанализировала структуру и содержание документа, нашла проблемы и дала понятную оценку.

Flow
----

1.  Backend передаёт в AI-service:
    *   текст документа;
    *   метаданные проекта;
    *   при необходимости шаблон/структурный контекст.
2.  AI-service выполняет:
    *   анализ структуры;
    *   классификацию разделов;
    *   проверку обязательных секций;
    *   поиск размытых формулировок;
    *   поиск отсутствующих требований;
    *   проверку KPI и expected outcomes;
    *   preliminary scorecard;
    *   generation recommendations;
    *   generation improved fragments.
3.  Backend сохраняет результат анализа.
4.  Client видит готовый analysis result.

Результат
---------

У версии `v1` появляется `Analysis Result`.

Acceptance criteria
-------------------

*   Система умеет проверять полноту документа.
*   Система умеет выделять требования, сроки, KPI и ожидаемые результаты.
*   Система умеет сравнивать документ с эталонной структурой.
*   Система выставляет score 0–100.

Это прямо соответствует разделам ТЗ про AI-анализ, score, recommendations, полноту, KPI и expected results.

d29b4c3d-bef4-4534-a302-2dcbb19…

ТЗ\_официальное (1)

* * *

14\. User Story E — Client получает первый анализ
=================================================

Сценарий
--------

Как Client, я хочу увидеть результат анализа документа в понятном виде, чтобы понять, что в ТЗ сильное, а что слабое.

Flow
----

1.  Client открывает страницу `Project > Version 1`.
2.  Видит:
    *   preliminary total score;
    *   score breakdown по official rubric;
    *   найденные проблемы;
    *   missing sections;
    *   рекомендации;
    *   suggested improved text;
    *   suggested structure;
    *   кнопку для открытия чата.

Что должен видеть Client по score
---------------------------------

Например:

*   Strategic relevance — 12/20
*   Goals and tasks — 6/10
*   Scientific novelty — 9/15
*   Practical applicability — 14/20
*   Expected results — 8/15
*   Socio-economic effect — 5/10
*   Feasibility — 7/10
*   Total — 61/100

Результат
---------

Client понимает не только “какой балл”, но и “почему”.

Acceptance criteria
-------------------

*   Score прозрачен и разбит по категориям.
*   У каждой категории есть reasoning.
*   Findings связаны с конкретными секциями или фрагментами.

* * *

15\. User Story F — Client использует чат как AI-ассистента
===========================================================

Сценарий
--------

Как Client, я хочу задать вопросы системе по своему документу, чтобы быстрее итерировать улучшения.

Как работает чат
----------------

Чат открыт внутри страницы анализа проекта.  
Он понимает:

*   активную версию документа;
*   findings;
*   recommendations;
*   scorecard;
*   при наличии — admin feedback.

Типовые вопросы
---------------

*   Почему у меня низкий балл по ожидаемым результатам?
*   Что именно не так с целями и задачами?
*   Перепиши секцию ожидаемых результатов.
*   Предложи количественные KPI.
*   Что ещё нужно сделать, чтобы поднять итоговый балл?

Результат
---------

Client не просто читает статический отчёт, а ведёт диалог с системой.

Acceptance criteria
-------------------

*   Ответы привязаны к текущему проекту и версии.
*   Чат объясняет findings и recommendations.
*   Чат помогает переписывать секции.

Это соответствует требованию про AI-ассистента посредством чата и чат-бота по написанию ТЗ.

ТЗ\_официальное (1)

* * *

16\. User Story G — Client улучшает документ в loop
===================================================

Сценарий
--------

Как Client, я хочу несколько раз улучшать документ, сравнивать прогресс и выбирать лучшую версию.

Flow
----

1.  Client изучает findings и recommendations.
2.  Использует чат или generated suggestions.
3.  Делает одно из двух:
    *   вручную редактирует файл вне системы и загружает новую версию;
    *   использует AI-generated improvements как основу новой версии.
4.  Нажимает “Upload New Version” или “Create New Draft”.
5.  Система создаёт `v2`.
6.  Для `v2` снова запускается analysis.
7.  Client сравнивает `v1` и `v2`.

Результат
---------

Внутри одного Project возникает version history.

Acceptance criteria
-------------------

*   У проекта может быть несколько версий.
*   Для каждой версии есть свой analysis result.
*   Client может видеть рост или падение score от версии к версии.

* * *

17\. User Story H — Client доводит ТЗ до финальной версии
=========================================================

Сценарий
--------

Как Client, я хочу выбрать лучшую версию документа и отправить её на экспертное рассмотрение.

Flow
----

1.  Client работает с `v1`, `v2`, `v3` и так далее.
2.  Видит динамику score.
3.  Выбирает одну версию как лучшую.
4.  Нажимает “Submit for Review”.
5.  Система подтверждает действие.
6.  Выбранная версия получает статус `selected_as_final`.
7.  Project переходит в `submitted_for_review`.

Результат
---------

Финальная версия зафиксирована и отправлена админу.

Acceptance criteria
-------------------

*   Только одна версия может быть активной финальной submission в момент времени.
*   После submit эта версия становится источником для review.
*   История предыдущих версий не теряется.

* * *

18\. User Story I — Admin получает review queue
===============================================

Сценарий
--------

Как Admin, я хочу видеть очередь присланных финальных проектов, чтобы последовательно их рассматривать.

Flow
----

1.  Admin входит в систему.
2.  Переходит в `Review Queue`.
3.  Видит таблицу:
    *   project title
    *   client
    *   organization
    *   submitted at
    *   AI preliminary score
    *   current status
4.  Открывает конкретную submission.

Результат
---------

Admin видит список проектов, готовых к review.

Acceptance criteria
-------------------

*   В очередь попадают только submitted final versions.
*   Admin видит все такие submissions.
*   Client не видит submissions других клиентов.

* * *

19\. User Story J — Admin открывает проект на review
====================================================

Сценарий
--------

Как Admin, я хочу увидеть документ, его AI-анализ и предложенную scorecard, чтобы быстро принять решение.

Flow
----

1.  Admin открывает submission.
2.  Видит:
    *   название проекта;
    *   организацию;
    *   автора;
    *   финальную версию документа;
    *   AI preliminary scorecard;
    *   общий preliminary score;
    *   findings;
    *   recommendations;
    *   history versions;
    *   draft expert report comment.

Результат
---------

Admin получает полную картину по submitted версии.

Acceptance criteria
-------------------

*   Видна именно финальная отправленная версия.
*   Видна AI preliminary scorecard.
*   Видна версия документа и история изменений.

* * *

20\. User Story K — Admin принимает решение
===========================================

Сценарий
--------

Как Admin, я хочу принять решение по submitted проекту и сохранить результат review.

Возможные решения
-----------------

### Approved

Проект одобрен.  
Он готов войти в финальный экспорт.

### Needs Revision

Проект требует доработки.  
Client должен улучшить документ и повторно отправить.

### Rejected

Проект отклонён.  
Процесс по текущей submission завершается.

Flow
----

1.  Admin читает анализ и документ.
2.  При необходимости корректирует category scores.
3.  Заполняет review feedback для Client.
4.  При approved — заполняет expert report comment.
5.  Выбирает decision.
6.  Система сохраняет review result.

Результат
---------

Submission reviewed.

Acceptance criteria
-------------------

*   Для `needs_revision` обязателен review feedback.
*   Для `rejected` обязателен review feedback.
*   Для `approved` обязателен expert report comment.
*   Final reviewed score сохраняется отдельно от AI preliminary score.

* * *

21\. User Story L — Client получает результат review
====================================================

Сценарий
--------

Как Client, я хочу увидеть решение Admin и понять, что делать дальше.

Flow
----

### Если Approved

1.  Client видит статус `approved`.
2.  Видит review feedback, если он оставлен.
3.  Понимает, что submission принята.

### Если Needs Revision

1.  Client видит статус `needs_revision`.
2.  Видит review feedback.
3.  Возвращается в проект.
4.  Создаёт новую версию и дорабатывает документ.

### Если Rejected

1.  Client видит статус `rejected`.
2.  Видит review feedback.
3.  Понимает причину отклонения.

Результат
---------

Client знает, куда двигаться дальше.

* * *

22\. User Story M — Client повторно работает после `needs_revision`
===================================================================

Сценарий
--------

Как Client, я хочу исправить замечания Admin и снова отправить документ на review.

Flow
----

1.  Client открывает проект со статусом `needs_revision`.
2.  Видит admin review feedback.
3.  Использует чат:
    *   чтобы понять замечания;
    *   чтобы переписать секции;
    *   чтобы добавить KPI и expected results.
4.  Создаёт новую версию `v4`.
5.  Запускает новый analysis run.
6.  Смотрит новый preliminary score.
7.  Нажимает “Submit for Review” ещё раз.

Результат
---------

Проект входит в новый review cycle.

Acceptance criteria
-------------------

*   История review cycles сохраняется.
*   Новая submission ссылается на новую version.
*   Старое решение не затирается.

* * *

23\. User Story N — Admin формирует итоговый Excel
==================================================

Сценарий
--------

Как Admin, я хочу сформировать итоговый Excel по approved проектам, чтобы использовать его как итоговую таблицу оценки.

Важное правило
--------------

Excel **не генерируется на каждый черновик**.  
Excel формируется из `approved` submissions.

Flow
----

1.  Admin открывает раздел `Approved Projects`.
2.  Видит таблицу approved submissions.
3.  Может:
    *   выбрать один проект;
    *   выбрать несколько проектов.
4.  Нажимает “Generate Final XLSX”.
5.  Backend берёт final reviewed scorecard и expert report comment.
6.  Формирует `.xlsx` по вашему шаблону.
7.  Admin скачивает файл.

Результат
---------

Получен официальный итоговый Excel.

Acceptance criteria
-------------------

*   В export попадают только approved submissions.
*   В каждой строке используются final reviewed scores.
*   В колонку “Комментарий эксперта” идёт expert report comment.
*   Если Admin не менял preliminary score, можно использовать его как final по умолчанию.

* * *

24\. User Story O — Что именно попадает в XLSX
==============================================

Для каждой approved submission в строку Excel попадает:

*   Название ТЗ
*   Организация
*   Эксперт
*   Стратегическая релевантность
*   Цель и задачи
*   Научная новизна
*   Практическая применимость
*   Ожидаемые результаты
*   Соц-экономический эффект
*   Реализуемость
*   Итоговый балл
*   Комментарий эксперта

Источник данных
---------------

*   Project / document metadata — из backend
*   final reviewed scorecard — из review
*   final total score — сумма категорий
*   expert report comment — из Admin review

* * *

25\. User Story P — Что именно должен делать AI в бизнес-логике
===============================================================

Тут зафиксируем границу для реализации.

AI нужен не для хранения продукта, а для интеллектуальных задач:

*   анализ структуры;
*   проверка обязательных разделов;
*   выявление проблем;
*   сравнение с шаблоном;
*   scorecard draft;
*   recommendations;
*   improved text;
*   suggested structure;
*   draft expert comment;
*   ответы чата.

Это соответствует ТЗ по NLP/LLM, классификации разделов, полноте, структуре, recommendations и chat assistant.

ТЗ\_официальное (1)

ТЗ\_официальное (1)

* * *

26\. Особая бизнес-логика для научного шаблона
==============================================

Твой шаблон научного ТЗ задаёт очень важные ожидания:

*   цель программы;
*   задачи;
*   стратегические и программные документы;
*   ожидаемые результаты;
*   количественные показатели;
*   конечный результат;
*   социально-экономический эффект;
*   целевые потребители результатов.
    65ddf1ec-3392-4127-a266-2595954…
    65ddf1ec-3392-4127-a266-2595954…

Значит, система должна особенно внимательно проверять:

*   сформулирована ли цель;
*   есть ли задачи;
*   указаны ли конкретные стратегические документы;
*   есть ли прямые результаты;
*   есть ли количественные показатели;
*   описан ли конечный результат;
*   раскрыт ли socio-economic effect.

Это даёт основу и для findings, и для scoring, и для chat guidance.

* * *

27\. Полный бизнес-цикл в одной линии
=====================================

Чтобы вообще не осталось путаницы, вот одна чистая цепочка:

Client входит → создаёт Project → загружает Version 1 → получает AI-анализ → использует чат и рекомендации → создаёт Version 2 → снова анализирует → улучшает → выбирает лучшую версию → отправляет Final Submission → Admin видит submission в queue → открывает проект → смотрит AI preliminary scorecard → оставляет review feedback и expert report comment → выбирает approved / needs\_revision / rejected → approved проекты попадают в pool для export → Admin генерирует final XLSX.

* * *

28\. Бизнес-правила, которые стоит утвердить прямо сейчас
=========================================================

Ниже — список правил, которые уже можно переносить в код и задачи.

Rule 1
------

Один Client может иметь много Projects.

Rule 2
------

Один Project может иметь много Document Versions.

Rule 3
------

Каждая Version анализируется отдельно.

Rule 4
------

Chat всегда привязан к конкретному Project и активной Version.

Rule 5
------

Client видит preliminary AI scorecard.

Rule 6
------

Admin видит ту же scorecard, но может её исправить.

Rule 7
------

Final reviewed score не суммируется с preliminary score, а заменяет его как официальную оценку.

Rule 8
------

Review feedback — это комментарий для Client.

Rule 9
------

Expert report comment — это комментарий для Excel.

Rule 10
-------

Только approved submissions попадают в final XLSX export.

Rule 11
-------

Needs\_revision запускает новый cycle улучшения.

Rule 12
-------

История версий и review cycles должна сохраняться.

* * *

29\. Финальная формулировка User Story для продукта
===================================================

Вот в короткой каноничной форме.

**Как Client**, я хочу загрузить своё научное ТЗ, получить AI-анализ по понятной scorecard, увидеть ошибки, рекомендации и улучшения, несколько раз доработать документ с помощью чата и новых версий, а затем отправить лучшую финальную версию на экспертное рассмотрение.

**Как Admin**, я хочу видеть очередь финальных submissions, просматривать документ и AI-анализ, подтверждать или корректировать оценку, оставлять feedback и экспертный комментарий, принимать решение approve/reject/needs revision и формировать итоговый Excel-отчёт по approved проектам.

* * *

30\. Что брать в реализацию первым
==================================

Чтобы не расползтись, я бы имплементировал в таком порядке:

1.  Auth
2.  Projects
3.  Upload document version
4.  AI analysis result
5.  Scorecard UI
6.  Findings + recommendations
7.  Chat on active version
8.  Version history
9.  Submit for review
10.  Admin review queue
11.  Approve / reject / needs\_revision
12.  Final XLSX export

Это наилучшим образом покрывает и ТЗ, и ваш расширенный workflow.

ТЗ\_официальное (1)

Если хочешь, следующим сообщением я превращу это уже в **готовый backend spec: сущности, поля таблиц, статусы и API endpoints без воды**.

## Prompt:
4/14/2026, 10:34:53 PM

хорошо дай мне теперь, Core Backend Golang:
ERD Database Tables Schemes (plantuml),
API Specs для Frontend,
Business Logic (Requirements and Specs) of Core Backend that would be working with Database,
backend/internal/[modules],
backend/platofrms/http/[AI-Serevice wiring rules and logic]

и также
AI-Serevice:
API Specs,
Business Logic (Requirements and Specs) of AI/LLM,

---
и если что то ещё нужно тогда его тоже добавь! чтобы все было.

## Response:
4/14/2026, 10:34:58 PM

Собираю это уже как инженерную спецификацию: что хранит core backend, какие endpoint’ы торчит фронту, как именно backend связывается с AI-service, и какие API/контракты нужны самому AI-service.

> **Clarifying citation approach for template-based answer**
>
> I’ll give a comprehensive answer based on the relevant files. For citations, I can refer to snippets from turn6file0 and turn6file1. I might need to refine my search process to pinpoint exact lines, but since the files are loaded, I’ll focus on the info provided, using the available template and TZ file.
>
> **Providing key details for PlantUML and backend specs**
>
> The user asked for PlantUML code, so I'll focus on giving the necessary details in code blocks, not overly verbose but comprehensive. I'll include specs for the Core Backend, ERD, API details like endpoints, JSON examples, backend modules, business logic, DB constraints, and any cross-service contracts or event models. I'll avoid unnecessary artifacts or redundant elements.
>
> Thought for 1m 18s

Ниже — уже **цельная инженерная спецификация** под вашу утверждённую бизнес-логику.

Я исхожу из уже принятых вами решений:

*   **Core Backend (Go)** — единственный владелец бизнес-данных и единственный сервис, который работает с основной Postgres БД.
*   **AI-Service (Python/FastAPI)** — stateless intelligence engine, без прямого доступа к core Postgres.
*   **Frontend** ходит только в Core Backend.
*   **Client** видит preliminary AI score по той же rubric, что потом идёт в финальный review/XLSX.
*   **Admin** подтверждает или корректирует score, оставляет `review_feedback` и `expert_report_comment`, после чего approved проекты идут в финальный XLSX export.
*   Система обязана поддерживать загрузку PDF/Word/TXT, анализ структуры, проверку обязательных разделов, AI-анализ текста, score 0–100, рекомендации, улучшенную версию, итоговый отчёт, чат и историю документов.
    d29b4c3d-bef4-4534-a302-2dcbb19…
*   Шаблон научного ТЗ задаёт важные ожидаемые элементы: цель, задачи, стратегические документы, прямые результаты, количественные показатели, конечный результат, socio-economic effect и целевых потребителей результатов.
    65ddf1ec-3392-4127-a266-2595954…

* * *

1\. Final Architecture Contract
===============================

1.1. System of Record
---------------------

**Core Backend + Postgres** — это единственный источник истины для:

*   users
*   roles
*   projects
*   document versions
*   analysis results
*   scorecards
*   chat sessions/messages
*   review workflow
*   report exports

1.2. AI Boundary
----------------

**AI-Service**:

*   не читает и не пишет core DB;
*   не знает бизнес-правил ownership;
*   не знает auth/session logic;
*   получает только входной payload;
*   возвращает только structured AI result.

1.3. Score Model
----------------

Одна official score rubric для Client и Admin:

*   strategic\_relevance: 0..20
*   goals\_and\_tasks: 0..10
*   scientific\_novelty: 0..15
*   practical\_applicability: 0..20
*   expected\_results: 0..15
*   socio\_economic\_effect: 0..10
*   feasibility: 0..10

`total_score = sum(all category scores)` => `0..100`

### Two states

*   `ai_preliminary_scorecard`
*   `final_reviewed_scorecard`

`final_reviewed_total_score` **не суммируется** с preliminary; он становится финальным официальным total.

* * *

2\. Core Backend Golang
=======================

2.1. Responsibilities of Core Backend
-------------------------------------

Core Backend обязан:

*   аутентифицировать и авторизовывать пользователей;
*   хранить пользователей, роли, проекты и версии документов;
*   сохранять файлы в S3/MinIO;
*   запускать analysis lifecycle;
*   сохранять structured AI outputs в DB;
*   отдавать фронту analysis result;
*   хранить и отдавать историю версий;
*   управлять chat sessions/messages;
*   собирать chat context для AI-Service;
*   управлять review queue;
*   принимать admin review decision;
*   хранить final reviewed scorecard;
*   генерировать XLSX exports;
*   обеспечивать auditability.

* * *

2.2. Suggested Backend Structure
--------------------------------

```
backend/
  cmd/
    api/
      main.go

  internal/
    auth/
    users/
    organizations/
    projects/
    documents/
    storage/
    analysis/
    scorecards/
    recommendations/
    chat/
    reviews/
    reports/
    ai/
    common/

  platforms/
    http/
      server/
      middleware/
      handlers/
      dto/
      presenters/
      clients/
        ai/
      streaming/

  migrations/
  seeds/
```

* * *

2.3. `backend/internal/[modules]`
---------------------------------

`auth/`
-------

Responsibilities:

*   register
*   login
*   refresh
*   logout
*   password hashing
*   JWT/session validation
*   role extraction

Key entities:

*   credentials
*   access tokens
*   refresh tokens

* * *

`users/`
--------

Responsibilities:

*   user profile
*   role view
*   user preferences
*   profile updates

* * *

`organizations/`
----------------

Responsibilities:

*   organization records
*   organization metadata
*   mapping user to organization
*   optional admin filtering by organization

* * *

`projects/`
-----------

Responsibilities:

*   create/update/list/get project
*   enforce ownership
*   maintain project status
*   select active version
*   submit final version for review

* * *

`documents/`
------------

Responsibilities:

*   upload version
*   store document metadata
*   store extracted text snapshot
*   maintain version order
*   mark selected final version

* * *

`storage/`
----------

Responsibilities:

*   save original file
*   generate presigned download URL if needed
*   fetch file bytes for report generation
*   delete/replace file when required

* * *

`analysis/`
-----------

Responsibilities:

*   create analysis\_run
*   call AI-Service
*   persist findings
*   persist scorecard
*   persist recommendations
*   persist generated artifacts
*   mark status: pending/running/completed/failed

* * *

`scorecards/`
-------------

Responsibilities:

*   store preliminary scorecard
*   store final reviewed scorecard
*   compute total from category scores
*   validate category max values

* * *

`recommendations/`
------------------

Responsibilities:

*   expose AI-generated recommendations
*   expose improved text snippets
*   expose suggested structure/example artifacts

* * *

`chat/`
-------

Responsibilities:

*   create session
*   append message
*   fetch conversation
*   assemble AI context
*   call AI-Service for answer
*   save assistant answer

* * *

`reviews/`
----------

Responsibilities:

*   create review submission
*   admin queue
*   review detail
*   save decision: approved / rejected / needs\_revision
*   save `review_feedback`
*   save `expert_report_comment`
*   save final reviewed scorecard

* * *

`reports/`
----------

Responsibilities:

*   export single approved project to XLSX
*   export multiple approved projects to XLSX
*   load workbook template
*   map review data into workbook row(s)
*   save export artifact
*   return download info

* * *

`ai/`
-----

Responsibilities:

*   AI client interface
*   payload builders
*   response validation
*   timeout/retry policy
*   correlation IDs
*   mapping AI DTOs to domain objects

* * *

`common/`
---------

Responsibilities:

*   shared types
*   errors
*   enums
*   pagination
*   validation helpers
*   tracing/logging helpers

* * *

3\. Core Backend ERD — PlantUML
===============================

Ниже схема таблиц под выбранную вами архитектуру: **всё хранится в core DB, AI-service в БД не ходит**.

```
@startuml
title Core Backend ERD
hide methods
hide stereotypes
skinparam linetype ortho

entity users {
  *id : uuid
  --
  email : varchar(255) <<unique>>
  password_hash : varchar(255)
  full_name : varchar(255)
  role : varchar(32)  // client | admin
  organization_id : uuid <<nullable>>
  is_active : boolean
  created_at : timestamptz
  updated_at : timestamptz
}

entity organizations {
  *id : uuid
  --
  name : varchar(255)
  created_at : timestamptz
  updated_at : timestamptz
}

entity projects {
  *id : uuid
  --
  owner_user_id : uuid
  organization_id : uuid <<nullable>>
  title : varchar(500)
  short_description : text <<nullable>>
  status : varchar(32) // draft | in_progress | submitted_for_review | under_review | approved | rejected | needs_revision
  active_version_id : uuid <<nullable>>
  created_at : timestamptz
  updated_at : timestamptz
}

entity document_versions {
  *id : uuid
  --
  project_id : uuid
  version_number : int
  source_type : varchar(32) // upload | ai_generated | revised
  original_filename : varchar(500)
  mime_type : varchar(128)
  storage_key : varchar(500)
  file_size_bytes : bigint
  extracted_text : text <<nullable>>
  status : varchar(32) // uploaded | analyzed | improved | selected_as_final
  created_by_user_id : uuid
  created_at : timestamptz
}

entity analysis_runs {
  *id : uuid
  --
  project_id : uuid
  document_version_id : uuid
  status : varchar(32) // pending | running | completed | failed
  request_payload_hash : varchar(128)
  ai_model_name : varchar(128) <<nullable>>
  ai_model_version : varchar(128) <<nullable>>
  prompt_bundle_version : varchar(128) <<nullable>>
  started_at : timestamptz <<nullable>>
  completed_at : timestamptz <<nullable>>
  error_message : text <<nullable>>
  created_at : timestamptz
}

entity analysis_sections {
  *id : uuid
  --
  analysis_run_id : uuid
  section_key : varchar(128)
  section_title : varchar(255)
  section_order : int
  detected : boolean
  confidence : numeric(5,4) <<nullable>>
  source_excerpt : text <<nullable>>
}

entity analysis_findings {
  *id : uuid
  --
  analysis_run_id : uuid
  finding_type : varchar(64) // missing_section | vague_statement | inconsistency | missing_kpi | missing_expected_result | logic_issue
  severity : varchar(16) // low | medium | high
  criterion_key : varchar(64) <<nullable>>
  section_key : varchar(128) <<nullable>>
  title : varchar(255)
  explanation : text
  source_excerpt : text <<nullable>>
  created_at : timestamptz
}

entity recommendations {
  *id : uuid
  --
  analysis_run_id : uuid
  category : varchar(64) // structure | score_improvement | rewrite | kpi | outcomes
  priority : varchar(16) // low | medium | high
  section_key : varchar(128) <<nullable>>
  title : varchar(255)
  recommendation_text : text
  improved_text : text <<nullable>>
  created_at : timestamptz
}

entity scorecards {
  *id : uuid
  --
  analysis_run_id : uuid
  score_type : varchar(32) // ai_preliminary | final_reviewed
  strategic_relevance : int
  goals_and_tasks : int
  scientific_novelty : int
  practical_applicability : int
  expected_results : int
  socio_economic_effect : int
  feasibility : int
  total_score : int
  summary_reasoning : text <<nullable>>
  created_by_user_id : uuid <<nullable>> // null for AI, admin user for final_reviewed
  created_at : timestamptz
}

entity generated_artifacts {
  *id : uuid
  --
  analysis_run_id : uuid
  artifact_type : varchar(64) // suggested_structure | example_section | example_draft | draft_expert_comment
  title : varchar(255)
  content : text
  created_at : timestamptz
}

entity chat_sessions {
  *id : uuid
  --
  project_id : uuid
  document_version_id : uuid
  analysis_run_id : uuid <<nullable>>
  created_by_user_id : uuid
  status : varchar(32) // active | archived
  created_at : timestamptz
  updated_at : timestamptz
}

entity chat_messages {
  *id : uuid
  --
  chat_session_id : uuid
  role : varchar(16) // user | assistant | system
  content : text
  citations_json : jsonb <<nullable>>
  created_at : timestamptz
}

entity review_submissions {
  *id : uuid
  --
  project_id : uuid
  submitted_version_id : uuid
  submitted_by_user_id : uuid
  status : varchar(32) // submitted | under_review | decision_made
  submitted_at : timestamptz
}

entity admin_reviews {
  *id : uuid
  --
  review_submission_id : uuid
  reviewed_by_user_id : uuid
  decision : varchar(32) // approved | rejected | needs_revision
  review_feedback : text <<nullable>>
  expert_report_comment : text <<nullable>>
  final_scorecard_id : uuid <<nullable>>
  reviewed_at : timestamptz
}

entity report_exports {
  *id : uuid
  --
  export_type : varchar(32) // single_project | batch_projects
  generated_by_user_id : uuid
  storage_key : varchar(500)
  status : varchar(32) // generated | failed
  created_at : timestamptz
}

entity report_export_items {
  *id : uuid
  --
  report_export_id : uuid
  review_submission_id : uuid
}

users ||--o{ projects
organizations ||--o{ users
organizations ||--o{ projects
projects ||--o{ document_versions
users ||--o{ document_versions
projects ||--o{ analysis_runs
document_versions ||--o{ analysis_runs
analysis_runs ||--o{ analysis_sections
analysis_runs ||--o{ analysis_findings
analysis_runs ||--o{ recommendations
analysis_runs ||--o{ generated_artifacts
analysis_runs ||--o{ scorecards
projects ||--o{ chat_sessions
document_versions ||--o{ chat_sessions
analysis_runs ||--o{ chat_sessions
chat_sessions ||--o{ chat_messages
projects ||--o{ review_submissions
document_versions ||--o{ review_submissions
review_submissions ||--|| admin_reviews
scorecards ||--o| admin_reviews
report_exports ||--o{ report_export_items
review_submissions ||--o{ report_export_items

@enduml
```

* * *

4\. Core Backend API Specs for Frontend
=======================================

Ниже — frontend-facing API. Это не OpenAPI YAML, а уже нормальный implementation contract.

4.1. Auth
---------

### `POST /api/v1/auth/register`

Request:

```
{
  "email": "user@example.com",
  "password": "StrongPassword123",
  "full_name": "Aigerim Nur",
  "organization_name": "Satbayev University"
}
```

Response:

```
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "Aigerim Nur",
    "role": "client"
  },
  "access_token": "jwt",
  "refresh_token": "jwt"
}
```

### `POST /api/v1/auth/login`

### `POST /api/v1/auth/refresh`

### `POST /api/v1/auth/logout`

### `GET /api/v1/me`

* * *

4.2. Projects
-------------

### `POST /api/v1/projects`

Request:

```
{
  "title": "Digital Polygon Research Program",
  "short_description": "AI-assisted improvement of research specification"
}
```

Response:

```
{
  "id": "uuid",
  "title": "Digital Polygon Research Program",
  "status": "draft",
  "organization": {
    "id": "uuid",
    "name": "Satbayev University"
  }
}
```

### `GET /api/v1/projects`

Query:

*   `status`
*   `page`
*   `page_size`

### `GET /api/v1/projects/{project_id}`

### `PATCH /api/v1/projects/{project_id}`

Update title/description if still editable.

* * *

4.3. Document Versions
----------------------

### `POST /api/v1/projects/{project_id}/versions`

Multipart upload:

*   `file`

Response:

```
{
  "id": "uuid",
  "project_id": "uuid",
  "version_number": 1,
  "status": "uploaded"
}
```

### `GET /api/v1/projects/{project_id}/versions`

Return version history.

### `GET /api/v1/projects/{project_id}/versions/{version_id}`

Return metadata + status + active flags.

### `GET /api/v1/projects/{project_id}/versions/{version_id}/download`

Returns file URL or proxy download.

* * *

4.4. Analysis
-------------

### `POST /api/v1/projects/{project_id}/versions/{version_id}/analyze`

Creates analysis run.

Request:

```
{
  "force_reanalyze": false
}
```

Response:

```
{
  "analysis_run_id": "uuid",
  "status": "pending"
}
```

### `GET /api/v1/projects/{project_id}/versions/{version_id}/analysis/latest`

Response:

```
{
  "analysis_run_id": "uuid",
  "status": "completed",
  "sections": [
    {
      "section_key": "goals",
      "section_title": "Цели и задачи",
      "detected": true,
      "confidence": 0.98
    }
  ],
  "findings": [
    {
      "id": "uuid",
      "finding_type": "missing_kpi",
      "severity": "high",
      "title": "Missing quantitative indicators",
      "explanation": "Expected results do not contain measurable numeric KPIs"
    }
  ],
  "recommendations": [
    {
      "id": "uuid",
      "title": "Add measurable KPIs",
      "priority": "high",
      "recommendation_text": "Define at least 3 numeric indicators..."
    }
  ],
  "scorecard": {
    "score_type": "ai_preliminary",
    "strategic_relevance": 14,
    "goals_and_tasks": 7,
    "scientific_novelty": 10,
    "practical_applicability": 15,
    "expected_results": 8,
    "socio_economic_effect": 6,
    "feasibility": 8,
    "total_score": 68,
    "summary_reasoning": "The project is promising but lacks measurable expected results..."
  },
  "generated_artifacts": [
    {
      "artifact_type": "suggested_structure",
      "title": "Suggested Structure",
      "content": "1. General Information\n2. Goals..."
    }
  ]
}
```

### `GET /api/v1/projects/{project_id}/versions/{version_id}/analysis/runs`

Analysis history if needed.

* * *

4.5. Chat
---------

### `POST /api/v1/projects/{project_id}/chat-sessions`

Request:

```
{
  "document_version_id": "uuid"
}
```

Response:

```
{
  "chat_session_id": "uuid",
  "status": "active"
}
```

### `GET /api/v1/projects/{project_id}/chat-sessions/{session_id}`

Returns session metadata + messages.

### `POST /api/v1/projects/{project_id}/chat-sessions/{session_id}/messages`

Request:

```
{
  "content": "Why is my expected results score low?"
}
```

Response:

```
{
  "assistant_message": {
    "id": "uuid",
    "role": "assistant",
    "content": "Your expected results score is low because...",
    "citations": [
      {
        "type": "finding",
        "id": "uuid"
      },
      {
        "type": "recommendation",
        "id": "uuid"
      }
    ]
  }
}
```

### Optional streaming

`POST /api/v1/projects/{project_id}/chat-sessions/{session_id}/messages/stream`

* * *

4.6. Review Submission (Client side)
------------------------------------

### `POST /api/v1/projects/{project_id}/submit-for-review`

Request:

```
{
  "document_version_id": "uuid"
}
```

Response:

```
{
  "review_submission_id": "uuid",
  "project_status": "submitted_for_review"
}
```

### `GET /api/v1/projects/{project_id}/review-status`

Returns latest submission + decision if any.

* * *

4.7. Admin Review APIs
----------------------

### `GET /api/v1/admin/review-submissions`

Query:

*   `decision`
*   `status`
*   `organization_id`
*   `page`
*   `page_size`

### `GET /api/v1/admin/review-submissions/{submission_id}`

Returns:

*   project
*   final submitted version
*   latest preliminary analysis
*   preliminary scorecard
*   history versions
*   prior review cycle info if exists

### `POST /api/v1/admin/review-submissions/{submission_id}/decision`

Request:

```
{
  "decision": "approved",
  "review_feedback": "Strong project. Clarify implementation plan in future iterations.",
  "expert_report_comment": "The project demonstrates high practical applicability and acceptable feasibility.",
  "final_scorecard": {
    "strategic_relevance": 16,
    "goals_and_tasks": 8,
    "scientific_novelty": 11,
    "practical_applicability": 17,
    "expected_results": 12,
    "socio_economic_effect": 8,
    "feasibility": 8
  }
}
```

Response:

```
{
  "review_id": "uuid",
  "decision": "approved",
  "final_reviewed_total_score": 80
}
```

Business rule:

*   `approved` => `expert_report_comment` required
*   `needs_revision` => `review_feedback` required
*   `rejected` => `review_feedback` required

* * *

4.8. Reports / XLSX Export
--------------------------

### `POST /api/v1/admin/reports/exports`

Request:

```
{
  "export_type": "batch_projects",
  "review_submission_ids": ["uuid1", "uuid2", "uuid3"]
}
```

Response:

```
{
  "report_export_id": "uuid",
  "status": "generated",
  "download_url": "/api/v1/admin/reports/exports/uuid/download"
}
```

### `GET /api/v1/admin/reports/exports`

### `GET /api/v1/admin/reports/exports/{export_id}`

### `GET /api/v1/admin/reports/exports/{export_id}/download`

* * *

5\. Business Logic of Core Backend
==================================

5.1. Ownership Rules
--------------------

*   Client can only access own projects, versions, analyses, chat sessions.
*   Admin can access all review submissions and exports.
*   Client cannot directly edit admin review artifacts.
*   Only Admin can create final reviewed scorecard.

* * *

5.2. Versioning Rules
---------------------

*   Each new upload under a project increments `version_number`.
*   Analysis is always tied to a specific `document_version_id`.
*   Multiple analysis runs per version are allowed, but only the latest completed run is considered current unless explicitly selected.

* * *

5.3. Submit-for-Review Rules
----------------------------

*   Client can submit only an analyzed version.
*   A version without completed analysis cannot be submitted.
*   Only one active open submission per project at a time.
*   If decision is `needs_revision`, client may create a new version and resubmit.

* * *

5.4. Scorecard Rules
--------------------

*   Preliminary scorecard comes from AI-Service output.
*   Final reviewed scorecard is created by Admin.
*   `total_score` must always equal sum of category fields.
*   Category max values must be validated server-side.

* * *

5.5. Review Rules
-----------------

*   `approved` moves project to approved pool.
*   `needs_revision` moves project back to revision workflow.
*   `rejected` closes current submission cycle.
*   Every decision is auditable by `reviewed_by_user_id` and timestamp.

* * *

5.6. Reporting Rules
--------------------

*   Export only approved submissions.
*   Export uses `final_reviewed_scorecard` if present.
*   If product MVP allows implicit adoption of AI score, backend may generate `final_reviewed_scorecard` from preliminary one at approval time when Admin does not override.

* * *

5.7. Chat Rules
---------------

*   Chat is always bound to project + document version.
*   Backend stores all messages.
*   Backend assembles context before calling AI-Service.
*   Backend never exposes raw AI internal prompt state to client.
*   Chat answers should cite structured references where possible.

* * *

5.8. Analysis Persistence Rules
-------------------------------

*   AI-Service returns structured JSON only.
*   Backend validates and persists findings, recommendations, sections, scorecard, artifacts.
*   Failed AI responses mark analysis run as `failed` with error details.

* * *

5.9. Async Rules
----------------

Strongly recommended:

*   upload creates version synchronously;
*   analysis call is queued async;
*   frontend polls analysis status or subscribes to SSE/WebSocket;
*   report export may also be backgrounded if generation becomes heavy.

* * *

6\. `backend/platforms/http/[AI-Service wiring rules and logic]`
================================================================

Ниже — именно тот слой, который связывает backend и AI-service.

6.1. Suggested Folder Layout
----------------------------

```
backend/platforms/http/
  server/
    router.go
  middleware/
    auth.go
    request_id.go
    logging.go
  handlers/
    auth_handler.go
    project_handler.go
    version_handler.go
    analysis_handler.go
    chat_handler.go
    review_handler.go
    report_handler.go
  dto/
    request.go
    response.go
  clients/
    ai/
      client.go
      analyze.go
      chat.go
      generate.go
      types.go
      mapper.go
      validator.go
```

* * *

6.2. Wiring Rules
-----------------

### Rule 1

Only backend calls AI-Service.

### Rule 2

AI-Service receives canonical DTOs, not DB models.

### Rule 3

Backend is responsible for:

*   auth
*   ownership checks
*   reading DB data
*   assembling AI input payload
*   validating AI response
*   persisting AI response

### Rule 4

AI-Service is stateless:

*   no session ownership
*   no database writes
*   no direct user/project resolution

* * *

6.3. Analyze Wiring Logic
-------------------------

### Flow

1.  Handler receives `POST /analyze`
2.  `analysis` service creates `analysis_run`
3.  backend loads:
    *   project
    *   version
    *   extracted\_text
    *   organization/project metadata
    *   optional template hints
4.  backend sends `/v1/analyze` request to AI-Service
5.  AI response validated
6.  backend writes:
    *   sections
    *   findings
    *   recommendations
    *   preliminary scorecard
    *   generated artifacts
7.  analysis\_run marked `completed`

* * *

6.4. Chat Wiring Logic
----------------------

### Flow

1.  Client sends new chat message
2.  backend saves user message
3.  backend loads:
    *   current document version text
    *   latest completed analysis result
    *   latest preliminary scorecard
    *   recommendations
    *   optional admin review feedback
    *   last N messages
4.  backend creates compact AI context packet
5.  backend calls AI-Service `/v1/chat/respond`
6.  backend validates response
7.  backend saves assistant message
8.  backend returns response to frontend

* * *

6.5. AI Client Interface in Go
------------------------------

```
type AIClient interface {
    AnalyzeDocument(ctx context.Context, req AnalyzeRequest) (*AnalyzeResponse, error)
    GenerateExample(ctx context.Context, req GenerateExampleRequest) (*GenerateExampleResponse, error)
    ChatRespond(ctx context.Context, req ChatRequest) (*ChatResponse, error)
}
```

* * *

6.6. Transport Requirements
---------------------------

*   request timeout: 30–90 sec depending on endpoint
*   retries only for transient network failures
*   no blind retries for long LLM operations without idempotency
*   attach correlation ID to every request
*   store model/version/prompt bundle version from AI response

* * *

6.7. Validation Rules for AI Responses
--------------------------------------

Backend must validate:

*   all score fields are within allowed max
*   `total_score == sum(categories)`
*   enum values are valid
*   required fields exist
*   response size limits are respected

If invalid:

*   mark analysis failed
*   log full validation error
*   do not partially persist corrupted scorecard

* * *

7\. AI-Service
==============

7.1. Responsibilities of AI-Service
-----------------------------------

AI-Service обязан:

*   анализировать структуру документа;
*   проверять обязательные разделы;
*   сравнивать документ с шаблонной логикой;
*   находить findings;
*   выдавать preliminary scorecard;
*   генерировать рекомендации;
*   генерировать suggested structure/example section/example draft;
*   отвечать на document-aware chat questions;
*   формировать draft expert comment при необходимости.

Это напрямую соответствует разделам ТЗ про NLP/LLM, классификацию разделов, полноту документа, генерацию структуры, рекомендации и чат-ассистента.

d29b4c3d-bef4-4534-a302-2dcbb19…

* * *

7.2. Suggested AI-Service Structure
-----------------------------------

```
ai-service/
  app/
    main.py

    api/
      routes/
        health.py
        analyze.py
        generate.py
        chat.py

    schemas/
      analyze.py
      generate.py
      chat.py
      common.py

    services/
      parser_service.py
      section_service.py
      completeness_service.py
      findings_service.py
      scoring_service.py
      recommendations_service.py
      generation_service.py
      chat_service.py

    prompts/
      analyze/
      scoring/
      recommendations/
      generate/
      chat/

    core/
      config.py
      logging.py
      errors.py
```

* * *

8\. AI-Service API Specs
========================

8.1. `POST /v1/analyze`
-----------------------

Purpose:  
Full document analysis for one document version.

Request:

```
{
  "request_id": "uuid",
  "project": {
    "title": "Digital Polygon Research Program",
    "organization_name": "Satbayev University"
  },
  "document": {
    "document_version_id": "uuid",
    "mime_type": "application/pdf",
    "text": "full extracted document text here"
  },
  "evaluation_context": {
    "rubric_version": "v1",
    "template_type": "scientific_tz_ru",
    "require_sections": [
      "general_information",
      "goals_and_tasks",
      "strategic_documents",
      "expected_results",
      "quantitative_indicators",
      "final_result",
      "socio_economic_effect"
    ]
  }
}
```

Response:

```
{
  "model": {
    "name": "gpt-5.4",
    "version": "2026-04",
    "prompt_bundle_version": "analysis-v1"
  },
  "sections": [
    {
      "section_key": "goals_and_tasks",
      "section_title": "Цели и задачи программы",
      "section_order": 2,
      "detected": true,
      "confidence": 0.98,
      "source_excerpt": "2.1. Цель программы..."
    }
  ],
  "findings": [
    {
      "finding_type": "missing_kpi",
      "severity": "high",
      "criterion_key": "expected_results",
      "section_key": "expected_results",
      "title": "Missing quantitative indicators",
      "explanation": "Expected results are described qualitatively and lack measurable indicators",
      "source_excerpt": "По результатам программы должны быть получены..."
    }
  ],
  "recommendations": [
    {
      "category": "kpi",
      "priority": "high",
      "section_key": "expected_results",
      "title": "Add measurable indicators",
      "recommendation_text": "Specify at least 3 numerical indicators for direct results",
      "improved_text": "По результатам программы должны быть достигнуты..."
    }
  ],
  "scorecard": {
    "strategic_relevance": 15,
    "goals_and_tasks": 8,
    "scientific_novelty": 10,
    "practical_applicability": 16,
    "expected_results": 8,
    "socio_economic_effect": 6,
    "feasibility": 8,
    "total_score": 71,
    "summary_reasoning": "The project is relevant and feasible but under-specifies measurable outcomes and socio-economic effect."
  },
  "generated_artifacts": [
    {
      "artifact_type": "suggested_structure",
      "title": "Suggested Structure",
      "content": "1. Общие сведения\n2. Цели и задачи..."
    },
    {
      "artifact_type": "draft_expert_comment",
      "title": "Draft Expert Comment",
      "content": "The project demonstrates strong relevance but requires stronger measurable expected results."
    }
  ]
}
```

* * *

8.2. `POST /v1/generate-example`
--------------------------------

Purpose:  
Generate example structure/section/draft using current analysis context.

Request:

```
{
  "request_id": "uuid",
  "generation_type": "example_section",
  "project": {
    "title": "Digital Polygon Research Program"
  },
  "document_context": {
    "text": "current document text"
  },
  "analysis_context": {
    "scorecard": {
      "expected_results": 8,
      "total_score": 71
    },
    "findings": [
      {
        "finding_type": "missing_kpi",
        "section_key": "expected_results",
        "explanation": "No measurable indicators present"
      }
    ]
  },
  "target": {
    "section_key": "expected_results"
  }
}
```

Response:

```
{
  "artifact_type": "example_section",
  "title": "Improved Expected Results Section",
  "content": "В результате реализации программы предполагается..."
}
```

* * *

8.3. `POST /v1/chat/respond`
----------------------------

Purpose:  
Context-aware assistant answer for one project/version.

Request:

```
{
  "request_id": "uuid",
  "project": {
    "project_id": "uuid",
    "title": "Digital Polygon Research Program"
  },
  "document_context": {
    "document_version_id": "uuid",
    "text_excerpt": "relevant document excerpt or compact document summary"
  },
  "analysis_context": {
    "scorecard": {
      "strategic_relevance": 15,
      "goals_and_tasks": 8,
      "scientific_novelty": 10,
      "practical_applicability": 16,
      "expected_results": 8,
      "socio_economic_effect": 6,
      "feasibility": 8,
      "total_score": 71
    },
    "findings": [
      {
        "finding_type": "missing_kpi",
        "section_key": "expected_results",
        "explanation": "Expected results are not measurable"
      }
    ],
    "recommendations": [
      {
        "title": "Add measurable indicators",
        "recommendation_text": "Specify 3 numerical KPIs"
      }
    ],
    "review_feedback": "Please strengthen quantitative expected results"
  },
  "conversation_context": {
    "last_messages": [
      {
        "role": "user",
        "content": "How can I improve my expected results section?"
      }
    ]
  },
  "user_message": "Why is my expected results score low?"
}
```

Response:

```
{
  "answer": "Your expected results score is low because the section does not contain measurable quantitative indicators...",
  "citations": [
    {
      "type": "finding",
      "title": "Missing quantitative indicators"
    },
    {
      "type": "recommendation",
      "title": "Add measurable indicators"
    }
  ],
  "suggested_actions": [
    "Add 2–3 numerical target values",
    "Link each result to a task",
    "State who will use the result"
  ]
}
```

* * *

8.4. `GET /health`
------------------

Health endpoint.

* * *

9\. Business Logic of AI/LLM Service
====================================

9.1. Statelessness
------------------

AI-Service:

*   does not persist application state;
*   does not manage user identity;
*   does not manage roles;
*   does not open DB transactions.

* * *

9.2. Structured Output Only
---------------------------

Every endpoint must return validated structured JSON.  
No free-form raw prose as the only response shape.

* * *

9.3. Analysis Pipeline
----------------------

For `/v1/analyze`, AI-Service must perform:

1.  document normalization
2.  section inference
3.  completeness check
4.  findings detection
5.  recommendations generation
6.  scorecard generation
7.  optional generated artifacts generation

* * *

9.4. Scorecard Rules
--------------------

AI must score only within allowed maxima:

*   strategic\_relevance <= 20
*   goals\_and\_tasks <= 10
*   scientific\_novelty <= 15
*   practical\_applicability <= 20
*   expected\_results <= 15
*   socio\_economic\_effect <= 10
*   feasibility <= 10

`total_score` must equal the sum of all categories.

* * *

9.5. Grounding Rules
--------------------

AI must ground judgments in:

*   provided document text
*   required section list
*   analysis context
*   scientific TЗ template logic
*   current user question

The uploaded scientific template clearly emphasizes goal, tasks, strategic document linkage, direct results, quantitative indicators, final result and socio-economic effect, so these areas must strongly influence findings and scoring.

65ddf1ec-3392-4127-a266-2595954…

* * *

9.6. Recommendation Rules
-------------------------

Recommendations must be:

*   actionable
*   specific
*   linked to a criterion or section
*   preferably accompanied by improved text

Bad:

*   “Improve the document”

Good:

*   “Add at least 3 measurable indicators in the expected results section”

* * *

9.7. Chat Rules
---------------

Chat answers must:

*   use provided analysis context
*   explain score causes
*   suggest next actions
*   support rewrite/help mode
*   not invent sections that are absent if document context does not support them

* * *

9.8. Prompting Rules
--------------------

Strongly recommended prompt contract:

*   system instructions for structured evaluation
*   rubric reminder with exact category maxima
*   template-aware instructions
*   answer-in-JSON requirement
*   no hallucinated facts
*   no cross-user references
*   no unsupported claims outside provided context

* * *

9.9. Model Metadata
-------------------

AI-Service should always return:

*   model name
*   model version
*   prompt bundle version

Backend must store these for traceability.

* * *

10\. Extra Things You Also Need
===============================

Поскольку ты попросил “если что-то ещё нужно — добавь”, вот обязательные дополнительные куски.

10.1. Status Machine
--------------------

### Project status transitions

```
draft -> in_progress -> submitted_for_review -> under_review -> approved
                                               -> needs_revision -> in_progress
                                               -> rejected
```

### Analysis run transitions

```
pending -> running -> completed
                 -> failed
```

* * *

10.2. Sequence Diagram — Upload → Analyze → Review → Export
-----------------------------------------------------------

```
@startuml
title End-to-End Flow

actor Client
actor Admin
participant Frontend
participant "Core Backend" as Backend
participant "AI-Service" as AI
database "Postgres" as DB
participant "S3/MinIO" as S3

Client -> Frontend : Upload document
Frontend -> Backend : POST /projects/{id}/versions
Backend -> S3 : save file
Backend -> DB : create document_version
Backend -> DB : create analysis_run(pending)

Backend -> AI : POST /v1/analyze
AI --> Backend : structured analysis result
Backend -> DB : save sections/findings/recommendations/scorecard
Backend -> DB : analysis_run = completed

Client -> Frontend : View analysis + chat
Frontend -> Backend : GET latest analysis
Backend -> DB : load analysis
Backend --> Frontend : analysis payload

Client -> Frontend : Submit final version
Frontend -> Backend : POST /submit-for-review
Backend -> DB : create review_submission

Admin -> Frontend : Open review queue
Frontend -> Backend : GET admin review submissions
Backend -> DB : load submissions
Backend --> Frontend : queue

Admin -> Frontend : Approve and set final score
Frontend -> Backend : POST decision
Backend -> DB : save admin_review + final_scorecard

Admin -> Frontend : Generate XLSX
Frontend -> Backend : POST /admin/reports/exports
Backend -> DB : load approved items
Backend -> S3 : save generated xlsx
Backend -> DB : save report_export
Backend --> Frontend : download URL

@enduml
```

* * *

10.3. Validation Rules You Should Enforce
-----------------------------------------

Backend-side validation:

*   role-based authorization
*   file mime/type validation
*   project ownership validation
*   score maxima validation
*   total score sum validation
*   review decision field requirements
*   only approved submissions exportable
*   only analyzed versions submitable

AI-side validation:

*   structured response schema validation
*   no invalid score values
*   no missing required sections in output schema
*   citation/suggested actions shape validation for chat

* * *

10.4. Recommended Migrations Order
----------------------------------

1.  organizations
2.  users
3.  projects
4.  document\_versions
5.  analysis\_runs
6.  analysis\_sections
7.  analysis\_findings
8.  recommendations
9.  scorecards
10.  generated\_artifacts
11.  chat\_sessions
12.  chat\_messages
13.  review\_submissions
14.  admin\_reviews
15.  report\_exports
16.  report\_export\_items

* * *

10.5. Recommended Enums
-----------------------

### Role

*   `client`
*   `admin`

### ProjectStatus

*   `draft`
*   `in_progress`
*   `submitted_for_review`
*   `under_review`
*   `approved`
*   `rejected`
*   `needs_revision`

### AnalysisRunStatus

*   `pending`
*   `running`
*   `completed`
*   `failed`

### ReviewDecision

*   `approved`
*   `rejected`
*   `needs_revision`

### ScoreType

*   `ai_preliminary`
*   `final_reviewed`

### ArtifactType

*   `suggested_structure`
*   `example_section`
*   `example_draft`
*   `draft_expert_comment`

* * *

11\. Final Recommended Implementation Order
===========================================

Чтобы перейти к кодингу без расползания, делай вот так:

1.  DB schema + migrations
2.  Auth + roles
3.  Projects CRUD
4.  Document version upload
5.  Analysis run creation + AI wiring
6.  Save structured analysis result
7.  Frontend analysis page
8.  Chat session + chat answer flow
9.  Submit for review
10.  Admin review queue + decision
11.  Final reviewed scorecard
12.  XLSX export

* * *

12\. Final Short Architecture Formula
=====================================

Core Backend
------------

**Owns workflow, DB, auth, versions, reviews, reports, chat sessions/messages, AI orchestration**

AI-Service
----------

**Owns analysis, scoring, recommendations, generation, chat reasoning, structured AI outputs**

Frontend
--------

**Owns UX for Client/Admin across upload, analysis, chat, review and export**

* * *

Если хочешь следующий шаг максимально практичный, то самый полезный сейчас — это:  
**сгенерировать сразу SQL DDL + Go domain structs + request/response DTOs для backend и Pydantic schemas для AI-service.**



---
Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)