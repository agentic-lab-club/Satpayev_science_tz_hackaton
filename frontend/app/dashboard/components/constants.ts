import { ProjectType, TZDocument, ChatMessage } from "./types";

// ─── Mock Data ─────────────────────────────────────────────────────────────────

export const mockDocuments: TZDocument[] = [
  {
    id: "1",
    name: "ТЗ_НИР_Квантовые_алгоритмы_2024.docx",
    uploadedAt: "2025-04-14T10:32:00",
    size: "248 КБ",
    format: "DOCX",
    status: "completed",
    score: 82,
    issuesFound: 5,
  },
  {
    id: "2",
    name: "Техническое_задание_НИОКР_Робототехника.pdf",
    uploadedAt: "2025-04-13T17:15:00",
    size: "1.2 МБ",
    format: "PDF",
    status: "completed",
    score: 61,
    issuesFound: 14,
  },
  {
    id: "3",
    name: "ТЗ_грантовая_заявка_БайТерек.docx",
    uploadedAt: "2025-04-13T09:04:00",
    size: "95 КБ",
    format: "DOCX",
    status: "processing",
  },
  {
    id: "4",
    name: "research_spec_AI_module_v2.txt",
    uploadedAt: "2025-04-12T14:50:00",
    size: "32 КБ",
    format: "TXT",
    status: "completed",
    score: 45,
    issuesFound: 22,
  },
  {
    id: "5",
    name: "ТЗ_разработка_ПО_медицина.pdf",
    uploadedAt: "2025-04-11T11:20:00",
    size: "540 КБ",
    format: "PDF",
    status: "error",
  },
  {
    id: "6",
    name: "grant_tz_nauka_2025_draft.docx",
    uploadedAt: "2025-04-10T08:45:00",
    size: "178 КБ",
    format: "DOCX",
    status: "completed",
    score: 91,
    issuesFound: 2,
  },
];

export const mockChatHistory: ChatMessage[] = [
  {
    role: "assistant",
    text: "Привет! Я AI-ассистент для работы с техническими заданиями. Могу помочь с анализом, структурой и улучшением вашего ТЗ. С чего начнём?",
  },
];

// ─── Project Types ─────────────────────────────────────────────────────────────

export const PROJECT_TYPES: ProjectType[] = [
  {
    id: "it",
    label: "ИТ и программирование",
    description: "Веб, мобильные приложения, AI/ML, DevOps",
    icon: "💻",
    color: "bg-blue-400/10",
    accent: "text-blue-400",
    border: "border-blue-400/30",
  },
  {
    id: "engineering",
    label: "Инженерия и промышленность",
    description: "Механика, электроника, производство",
    icon: "⚙️",
    color: "bg-amber-400/10",
    accent: "text-amber-400",
    border: "border-amber-400/30",
  },
  {
    id: "biomedicine",
    label: "Биомедицина",
    description: "Медицинские устройства, фармация, биотех",
    icon: "🧬",
    color: "bg-emerald-400/10",
    accent: "text-emerald-400",
    border: "border-emerald-400/30",
  },
  {
    id: "geography",
    label: "География",
    description: "Изучение Земли, её ландшафтов, климатических условий и ресурсов",
    icon: "🌍",
    color: "bg-violet-400/10",
    accent: "text-violet-400",
    border: "border-violet-400/30",
  },
  {
    id: "construction",
    label: "Строительство",
    description: "Проектирование, архитектура, инфраструктура",
    icon: "🏗️",
    color: "bg-orange-400/10",
    accent: "text-orange-400",
    border: "border-orange-400/30",
  },
  {
    id: "energy",
    label: "Энергетика",
    description: "Нефть, газ, возобновляемые источники",
    icon: "⚡",
    color: "bg-yellow-400/10",
    accent: "text-yellow-400",
    border: "border-yellow-400/30",
  },
  {
    id: "finance",
    label: "Финансы и экономика",
    description: "Финтех, банкинг, экономический анализ",
    icon: "📊",
    color: "bg-cyan-400/10",
    accent: "text-cyan-400",
    border: "border-cyan-400/30",
  },
  {
    id: "other",
    label: "Другое",
    description: "Прочие отрасли и направления",
    icon: "📁",
    color: "bg-slate-400/10",
    accent: "text-slate-400",
    border: "border-slate-400/30",
  },
];

// ─── Upload Constants ──────────────────────────────────────────────────────────

export const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".txt"];
export const ALLOWED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

export const FORMAT_META: Record<string, { color: string; bg: string }> = {
  pdf: { color: "text-rose-400", bg: "bg-rose-400/10 border-rose-400/30" },
  doc: { color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/30" },
  docx: { color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/30" },
  txt: { color: "text-slate-400", bg: "bg-slate-400/10 border-slate-400/30" },
};

export const STAGE_STEPS = [
  { key: "uploading", label: "Загрузка файла", sub: "Передача на сервер..." },
  { key: "analyzing", label: "AI-анализ", sub: "Обработка структуры и текста..." },
  { key: "done", label: "Готово", sub: "Результаты сформированы" },
];
