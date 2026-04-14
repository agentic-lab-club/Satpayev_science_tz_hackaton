export const mockProjectDetails: Record<string, any> = {
  "1": {
    id: "1",
    title: "ТЗ_НИР_Квантовые_алгоритмы_2024.docx",
    client: "Иван Иванов",
    organization: "Satpayev University",
    status: "in_progress",
    versions: [
      {
        versionNumber: 1,
        uploadedAt: "2025-04-14T10:32:00",
        status: "analyzed",
        analysis: {
          totalScore: 82,
          scorecard: {
            strategicRelevance: 18,
            goalsAndTasks: 8,
            scientificNovelty: 12,
            practicalApplicability: 16,
            expectedResults: 12,
            socioEconomicEffect: 8,
            feasibility: 8
          },
          findings: [
            { type: "error", section: "Ожидаемые результаты", message: "Не указаны количественные показатели." },
            { type: "warning", section: "Цель и задачи", message: "Формулировка задач слишком размыта." }
          ],
          missingSections: ["Социально-экономический эффект"],
          recommendations: [
            "Добавьте конкретные измеримые KPI",
            "Уточните задачи исследования"
          ]
        },
        aiImprovements: [
          {
            title: "Добавление измеримых KPI",
            originalText: "В результате работы будет создана новая система распределения, которая улучшит показатели.",
            improvedText: "В результате работы будет создана гибридная система квантового распределения ключей, обеспечивающая скорость генерации не менее 10 Мбит/с на расстоянии до 50 км при уровне ошибок (QBER) не более 2%."
          },
          {
            title: "Уточнение задач исследования",
            originalText: "Задача 1: Исследовать текущие алгоритмы.",
            improvedText: "Задача 1: Провести сравнительный анализ 5 ведущих протоколов квантовой криптографии (BB84, E91, B92, COW, DPS) по критериям криптографической стойкости и сложности аппаратной реализации."
          }
        ]
      }
    ]
  },
  "2": {
    id: "2",
    title: "Техническое_задание_НИОКР_Робототехника.pdf",
    client: "Айбек Нурлыбаев",
    organization: "KazNU",
    status: "in_progress",
    versions: [
      {
        versionNumber: 2,
        uploadedAt: "2025-04-13T17:15:00",
        status: "analyzed",
        analysis: {
          totalScore: 61,
          scorecard: {
            strategicRelevance: 15,
            goalsAndTasks: 5,
            scientificNovelty: 8,
            practicalApplicability: 10,
            expectedResults: 10,
            socioEconomicEffect: 6,
            feasibility: 7
          },
          findings: [
            { type: "error", section: "Научная новизна", message: "Слабо обосновано отличие от существующих решений." },
            { type: "warning", section: "Реализуемость", message: "Бюджет может быть недостаточным." }
          ],
          missingSections: [],
          recommendations: [
            "Приведите примеры конкурентов и покажите отличия.",
            "Пересмотрите план-график и смету."
          ]
        },
        aiImprovements: [
          {
            title: "Детализация научной новизны",
            originalText: "Наш робот будет справляться с препятствиями лучше, чем существующие аналоги на рынке.",
            improvedText: "Научная новизна заключается в разработке уникальной адаптивной кинематической схемы шасси, которая, в отличие от решений Boston Dynamics и Unitree, позволит роботу автоматически менять центр тяжести, преодолевая вертикальные препятствия высотой до 45 см при сохранении полезной нагрузки до 20 кг."
          }
        ]
      }
    ]
  },
  "4": {
    id: "4",
    title: "research_spec_AI_module_v2.txt",
    client: "Самат Асанов",
    organization: "SDU",
    status: "in_progress",
    versions: [
      {
        versionNumber: 1,
        uploadedAt: "2025-04-12T14:50:00",
        status: "analyzed",
        analysis: {
          totalScore: 45,
          scorecard: {
            strategicRelevance: 8,
            goalsAndTasks: 5,
            scientificNovelty: 5,
            practicalApplicability: 10,
            expectedResults: 5,
            socioEconomicEffect: 7,
            feasibility: 5
          },
          findings: [
            { type: "error", section: "Цель и задачи", message: "Абсолютно не ясна цель проекта." },
            { type: "error", section: "Научная новизна", message: "Новизна отсутствует." },
            { type: "warning", section: "Ожидаемые результаты", message: "Результаты не поддаются измерению." }
          ],
          missingSections: ["Стратегические документы", "Список литературы"],
          recommendations: [
            "Чётко сформулируйте основную проблему, которую решает модуль.",
            "Обоснуйте превосходство над существующими аналогами.",
            "Добавьте конкретные ожидаемые результаты исследования."
          ]
        },
        aiImprovements: [
          {
            title: "Формулировка измеримых результатов",
            originalText: "Проект поможет быстрее обрабатывать данные.",
            improvedText: "Внедрение AI-модуля позволит сократить среднее время обработки запросов с 15 до 0.8 секунд, что снизит нагрузку на серверную инфраструктуру на 40%."
          },
          {
            title: "Обоснование превосходства",
            originalText: "Мы используем современные нейросети.",
            improvedText: "В отличие от классических RNN, предлагаемая архитектура на базе легковесных Transformer-моделей обеспечивает точность распознавания 94% при использовании потребительских GPU с объёмом VRAM не более 4 ГБ."
          }
        ]
      }
    ]
  },
  "6": {
    id: "6",
    title: "grant_tz_nauka_2025_draft.docx",
    client: "Елена Смирнова",
    organization: "ENU",
    status: "completed",
    versions: [
      {
        versionNumber: 3,
        uploadedAt: "2025-04-10T08:45:00",
        status: "analyzed",
        analysis: {
          totalScore: 91,
          scorecard: {
            strategicRelevance: 19,
            goalsAndTasks: 9,
            scientificNovelty: 14,
            practicalApplicability: 18,
            expectedResults: 14,
            socioEconomicEffect: 8,
            feasibility: 9
          },
          findings: [
            { type: "warning", section: "Социально-экономический эффект", message: "Можно детальнее расписать долгосрочные экономические выгоды." }
          ],
          missingSections: [],
          recommendations: [
            "Документ в хорошем состоянии, рекомендуется отправка на экспертизу.",
            "Можно добавить прогноз окупаемости проекта в перспективе 5 лет."
          ]
        },
        aiImprovements: [
          {
            title: "Детализация долгосрочных экономических выгод",
            originalText: "Внедрение этой технологии принесет экономическую выгоду предприятиям.",
            improvedText: "Экономический эффект от внедрения разрабатываемой технологии составит до 150 млн тенге в первый год за счет снижения производственного брака на 12% и оптимизации расходов на логистику."
          }
        ]
      }
    ]
  }
};
