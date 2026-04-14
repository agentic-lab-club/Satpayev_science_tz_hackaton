"use client";

interface ChatHeaderProps {
  messageCount: number;
  isLoading?: boolean;
}

export function ChatHeader({ messageCount, isLoading }: ChatHeaderProps) {
  return (
    <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-lg">
                🤖
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AI-Ассистент</h1>
                <p className="text-xs text-slate-400">
                  {isLoading ? (
                    <span className="text-emerald-400">● Обработка запроса...</span>
                  ) : (
                    <span className="text-emerald-400">● онлайн</span>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">
              {messageCount} {messageCount === 1 ? "сообщение" : "сообщений"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
