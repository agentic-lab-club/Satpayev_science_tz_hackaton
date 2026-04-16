"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Bot, MessageSquare, PanelLeft, RefreshCcw, Sparkles, ArrowLeft } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";
import { ChatMessage } from "../dashboard/components/types";
import { MessageList } from "./components/MessageList";
import { ChatInput } from "./components/ChatInput";
import { ExamplePrompts } from "./components/ExamplePrompts";
import { ChatHeader } from "./components/ChatHeader";
import {
  BackendAnalyzeResponse,
  BackendDocumentVersion,
  BackendProject,
  createChatSession,
  getLatestAnalysis,
  getProject,
  listProjectVersions,
  listProjects,
  sendChatMessage,
} from "../lib/tz-api";
import { formatDate } from "../dashboard/components/helpers";

type ChatContextState = {
  project: BackendProject;
  version: BackendDocumentVersion;
  analysis: BackendAnalyzeResponse | null;
};

const INITIAL_ASSISTANT_MESSAGE: ChatMessage = {
  role: "assistant",
  text: "Выберите проект и версию, чтобы начать чат по сохранённому анализу.",
};

export default function ChatPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const queryProjectId = searchParams.get("projectId");
  const queryVersionId = searchParams.get("versionId");

  const [projects, setProjects] = useState<BackendProject[]>([]);
  const [context, setContext] = useState<ChatContextState | null>(null);
  const [versions, setVersions] = useState<BackendDocumentVersion[]>([]);
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(queryVersionId);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_ASSISTANT_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [projectLoading, setProjectLoading] = useState(true);
  const [chatSessionId, setChatSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const contextKey = useMemo(() => {
    if (!context) return null;
    return `${context.project.id}:${context.version.id}`;
  }, [context]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const loadContext = async () => {
      try {
        setProjectLoading(true);
        setError(null);

        const projectList = await listProjects();
        setProjects(projectList);

        if (!queryProjectId) {
          const latestProject = [...projectList].sort((a, b) => {
            const aTime = new Date(a.updated_at || a.created_at).getTime();
            const bTime = new Date(b.updated_at || b.created_at).getTime();
            return bTime - aTime;
          })[0];

          if (!latestProject) {
            setContext(null);
            setVersions([]);
            setSelectedVersionId(null);
            setMessages([INITIAL_ASSISTANT_MESSAGE]);
            setChatSessionId(null);
            setError("У вас пока нет проектов. Загрузите документ на dashboard, чтобы начать чат.");
            return;
          }

          const versions = await listProjectVersions(latestProject.id);
          const latestVersion =
            versions.find((version) => version.id === latestProject.active_version_id) ||
            versions[versions.length - 1];

          if (!latestVersion) {
            setContext(null);
            setVersions([]);
            setSelectedVersionId(null);
            setMessages([
              {
                role: "assistant",
                text: "У выбранного проекта пока нет версии для чата. Сначала загрузите и проанализируйте документ.",
              },
            ]);
            setError("У выбранного проекта нет версии для чата.");
            return;
          }

          router.replace(`/chat?projectId=${latestProject.id}&versionId=${latestVersion.id}`);
          return;
        }

        const [projectData, versions] = await Promise.all([
          getProject(queryProjectId),
          listProjectVersions(queryProjectId),
        ]);
        setVersions(versions);

        const selectedVersion =
          versions.find((version) => version.id === queryVersionId) ||
          versions.find((version) => version.id === projectData.active_version_id) ||
          versions[versions.length - 1];
        setSelectedVersionId(selectedVersion?.id || null);

        if (!selectedVersion) {
          setContext(null);
          setMessages([
            {
              role: "assistant",
              text: "У проекта пока нет активной версии. Сначала загрузите и проанализируйте документ.",
            },
          ]);
          setError("У выбранного проекта нет версии для чата.");
          return;
        }

        const analysis = await getLatestAnalysis(projectData.id, selectedVersion.id).catch(() => null);
        const nextContext = {
          project: projectData,
          version: selectedVersion,
          analysis: analysis?.analysis ?? null,
        };

        setContext(nextContext);

        const storageKey = `tz-chat-messages:${projectData.id}:${selectedVersion.id}`;
        const storedMessagesRaw = localStorage.getItem(storageKey);
        if (storedMessagesRaw) {
          try {
            const parsed = JSON.parse(storedMessagesRaw) as ChatMessage[];
            if (Array.isArray(parsed) && parsed.length > 0) {
              setMessages(parsed);
            } else {
              setMessages([buildInitialAssistantMessage(nextContext)]);
            }
          } catch {
            setMessages([buildInitialAssistantMessage(nextContext)]);
          }
        } else {
          setMessages([buildInitialAssistantMessage(nextContext)]);
        }

        const sessionKey = `tz-chat-session:${projectData.id}:${selectedVersion.id}`;
        const existingSessionId = localStorage.getItem(sessionKey);
        if (existingSessionId) {
          setChatSessionId(existingSessionId);
        } else {
          const session = await createChatSession(projectData.id, `Чат по версии ${selectedVersion.version_number}`);
          localStorage.setItem(sessionKey, session.id);
          setChatSessionId(session.id);
        }
      } catch (err) {
        console.error("Failed to load chat context", err);
        setError("Не удалось загрузить контекст чата из backend.");
      } finally {
        setProjectLoading(false);
      }
    };

    loadContext();
  }, [queryProjectId, queryVersionId]);

  useEffect(() => {
    if (!contextKey) return;
    localStorage.setItem(`tz-chat-messages:${contextKey}`, JSON.stringify(messages));
  }, [messages, contextKey]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  function buildInitialAssistantMessage(currentContext: ChatContextState): ChatMessage {
    const score = currentContext.analysis?.ai_document_analysis_scorecard?.total_score;
    const recommendation = currentContext.analysis?.recommendations?.[0];
    return {
      role: "assistant",
      text: [
        `Открыт чат по проекту «${currentContext.project.title}», версия ${currentContext.version.version_number}.`,
        score !== undefined ? `Диагностический score: ${score}/100.` : "",
        recommendation ? `Первая рекомендация: ${recommendation.title}. ${recommendation.description}` : "",
        "Задайте вопрос по структуре, ошибкам или улучшению документа.",
      ]
        .filter(Boolean)
        .join(" "),
    };
  }

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    if (!context || !chatSessionId) {
      setError("Сначала выберите проект и версию.");
      return;
    }

    const userMessage: ChatMessage = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendChatMessage(context.project.id, chatSessionId, text.trim());
      const assistantMessage: ChatMessage = {
        role: "assistant",
        text: response.ai_response.answer,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setError(null);
    } catch (err) {
      console.error("Chat request failed", err);
      const message = err instanceof Error ? err.message : "Не удалось получить ответ от backend.";
      setError(message);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: message,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearDialog = () => {
    if (window.confirm("Вы уверены? История диалога будет удалена только в браузере.")) {
      const fallback = context ? [buildInitialAssistantMessage(context)] : [INITIAL_ASSISTANT_MESSAGE];
      setMessages(fallback);
      setInput("");
      if (context) {
        localStorage.removeItem(`tz-chat-messages:${context.project.id}:${context.version.id}`);
      }
    }
  };

  const handleExamplePromptSelect = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleSelectProject = (projectId: string, versionId?: string | null) => {
    router.push(versionId ? `/chat?projectId=${projectId}&versionId=${versionId}` : `/chat?projectId=${projectId}`);
  };

  return (
    <div className={`h-screen flex flex-col relative overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#080d14] text-white" : "bg-slate-50 text-slate-900"}`}>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] ${isDark ? "bg-indigo-500/10" : "bg-indigo-500/5"} rounded-full blur-[100px] -translate-y-1/2`} />
        <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] ${isDark ? "bg-purple-500/10" : "bg-purple-500/5"} rounded-full blur-[100px] translate-y-1/2`} />
      </div>

      <div className={`backdrop-blur-xl sticky top-0 z-40 border-b transition-all duration-300 ${isDark ? "border-slate-800/80 bg-[#080d14]/80 shadow-lg shadow-black/20" : "border-slate-200 bg-white/80 shadow-sm"}`}>
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Link href="/dashboard" className={`p-2 rounded-xl transition-colors ${isDark ? "hover:bg-slate-800 text-slate-400 hover:text-white" : "hover:bg-slate-100 text-slate-500 hover:text-slate-900"}`}>
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="min-w-0">
                <h1 className="text-xl font-bold truncate">AI-чат по проекту</h1>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  {projectLoading ? "Загружаем контекст..." : context ? `Версия ${context.version.version_number} • ${formatDate(context.version.created_at)}` : "Выберите проект для начала чата"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleClearDialog}
                className={`hidden sm:inline-flex items-center gap-2 text-xs px-3 py-2 rounded-full border transition-colors ${isDark ? "border-slate-700 hover:border-amber-400/30 text-slate-400 hover:text-amber-400" : "border-slate-300 hover:border-blue-400/30 text-slate-600 hover:text-blue-600 bg-white hover:bg-blue-50/50"}`}
              >
                <RefreshCcw className="w-3 h-3" />
                Очистить
              </button>
              <button
                onClick={toggleTheme}
                className={`hidden sm:inline-flex items-center gap-2 text-xs px-3 py-2 rounded-full border transition-colors ${isDark ? "border-slate-700 hover:border-amber-400/30 text-slate-400 hover:text-amber-400" : "border-slate-300 hover:border-blue-400/30 text-slate-600 hover:text-blue-600 bg-white hover:bg-blue-50/50"}`}
              >
                <Sparkles className="w-3 h-3" />
                Тема
              </button>
              <Link
                href="/dashboard"
                className={`inline-flex items-center gap-2 text-xs px-3 py-2 rounded-full border transition-colors ${isDark ? "border-slate-700 hover:border-slate-600 text-slate-400 hover:text-white" : "border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-900 bg-white"}`}
              >
                <PanelLeft className="w-3 h-3" />
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className={`max-w-6xl mx-auto px-4 pt-4`}>
          <div className={`rounded-2xl border p-4 text-sm ${isDark ? "border-rose-500/20 bg-rose-500/10 text-rose-200" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
            {error}
          </div>
        </div>
      )}

      <main className="relative z-10 flex-1 overflow-hidden">
        {!queryProjectId && projectLoading ? (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className={`rounded-3xl border p-6 md:p-8 ${isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Открываем последний проект</h2>
                  <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>Подбираем самый свежий проанализированный документ и готовим чат.</p>
                </div>
              </div>
              <div className={`flex items-center gap-3 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
                Загружаем список проектов и последнюю версию...
              </div>
            </div>
          </div>
        ) : !queryProjectId ? (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className={`rounded-3xl border p-6 md:p-8 ${isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Выберите проект</h2>
                  <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>Чат привязан к проекту и выбранной версии документа.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={async () => {
                      const versions = await listProjectVersions(project.id).catch(() => []);
                      const versionId = project.active_version_id || versions[versions.length - 1]?.id || null;
                      handleSelectProject(project.id, versionId);
                    }}
                    className={`rounded-2xl border p-4 text-left transition-colors ${isDark ? "bg-slate-950/40 border-slate-800 hover:border-slate-700" : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}
                  >
                    <p className="font-semibold mb-1">{project.title}</p>
                    <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>{project.organization_name || "Без организации"}</p>
                  </button>
                ))}
              </div>
              {projects.length === 0 && (
                <div className={`mt-6 rounded-2xl border p-5 text-sm ${isDark ? "border-slate-800 bg-slate-950/40 text-slate-400" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
                  У вас пока нет проектов. Перейдите на dashboard, загрузите `.docx` или `.pdf`, затем вернитесь в чат.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className={`border-b ${isDark ? "border-slate-800/60" : "border-slate-200/60"}`}>
              <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-2xl px-4 py-3 border ${isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                    <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>Проект</p>
                    <p className="text-sm font-semibold">{context?.project.title || "Загрузка..."}</p>
                  </div>
                  <div className={`rounded-2xl px-4 py-3 border ${isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                    <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>Версия</p>
                    <p className="text-sm font-semibold">{context?.version.version_number ?? "-"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {versions.length > 1 && (
                    <select
                      value={selectedVersionId || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                          setSelectedVersionId(value);
                          void (async () => {
                            setProjectLoading(true);
                            try {
                              setError(null);
                              const projectData = await getProject(queryProjectId!);
                              const versionData = await listProjectVersions(queryProjectId!);
                              setVersions(versionData);
                              setSelectedVersionId(value);
                              setContext({
                                project: projectData,
                                version: versionData.find((version) => version.id === value) || versionData[0],
                                analysis: null,
                              });
                              router.replace(`/chat?projectId=${queryProjectId}&versionId=${value}`);
                              const latest = await getLatestAnalysis(queryProjectId!, value).catch(() => null);
                              setContext({
                                project: projectData,
                                version: versionData.find((version) => version.id === value) || versionData[0],
                                analysis: latest?.analysis ?? null,
                              });
                              const sessionKey = `tz-chat-session:${queryProjectId!}:${value}`;
                              const storedSessionId = localStorage.getItem(sessionKey);
                              if (storedSessionId) {
                                setChatSessionId(storedSessionId);
                              } else {
                                const session = await createChatSession(queryProjectId!, `Чат по версии ${versionData.find((version) => version.id === value)?.version_number || 1}`);
                                localStorage.setItem(sessionKey, session.id);
                                setChatSessionId(session.id);
                              }
                              setMessages([buildInitialAssistantMessage({
                                project: projectData,
                                version: versionData.find((version) => version.id === value) || versionData[0],
                                analysis: latest?.analysis ?? null,
                              })]);
                            } finally {
                              setProjectLoading(false);
                            }
                          })();
                        }
                      }}
                      className={`rounded-xl border px-3 py-2 text-sm ${isDark ? "bg-slate-950/60 border-slate-800 text-slate-200" : "bg-white border-slate-200 text-slate-800"}`}
                      >
                        {versions.map((version) => (
                          <option key={version.id} value={version.id}>
                            Версия {version.version_number}
                          </option>
                        ))}
                    </select>
                  )}
                </div>
              </div>
            </div>

            <ChatHeader messageCount={messages.length} isLoading={isLoading} />
            <div className="flex-1 overflow-hidden">
              <MessageList
                messages={messages}
                isLoading={isLoading}
                isDark={isDark}
                isHistoryLoading={isHistoryLoading}
                bottomRef={messagesEndRef}
              />
            </div>

            <div className="max-w-6xl mx-auto px-4 pb-4">
              {messages.length <= 1 && (
                <div className="mb-4">
                  <ExamplePrompts onSelect={handleExamplePromptSelect} visible={true} isDark={isDark} />
                </div>
              )}
              <ChatInput
                input={input}
                onInputChange={setInput}
                onSend={() => handleSendMessage(input)}
                onClear={handleClearDialog}
                isLoading={isLoading}
                isDark={isDark}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
