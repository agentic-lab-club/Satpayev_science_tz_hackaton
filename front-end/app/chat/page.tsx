"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../dashboard/components/types";
import { ChatHeader } from "./components/ChatHeader";
import { MessageList } from "./components/MessageList";
import { ChatInput } from "./components/ChatInput";
import { ExamplePrompts } from "./components/ExamplePrompts";
import { INITIAL_MESSAGE } from "./constants";

const RESPONSE_SAMPLES = [
  "Техническое задание должно содержать следующие основные разделы: 1. Цель разработки - четкая формулировка целей проекта. 2. Требования - функциональные и технические требования. 3. Ограничения - технические и бюджетные ограничения. 4. Критерии принятия - как будет оцениваться успех. 5. Сроки - план реализации с ключевыми этапами.",
  
  "Для проверки качества ТЗ рекомендую обратить внимание на:\n✓ Полнота всех разделов\n✓ Отсутствие противоречий между требованиями\n✓ Ясность формулировок (избегайте расплывчатых терминов)\n✓ Наличие критериев принятия для каждого требования\n✓ Реалистичность сроков и бюджета",
  
  "При формулировке целей используйте методику SMART:\nS (Specific) - конкретность\nM (Measurable) - измеримость\nA (Achievable) - достижимость\nR (Relevant) - релевантность\nT (Time-bound) - ограниченность по времени",
  
  "Технические требования должны быть:\n- Конкретными и проверяемыми\n- Не содержать предположений о способе реализации\n- Написаны максимально ясно\n- Сгруппированы по категориям\n- Дополнены примерами, где это необходимо",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: ChatMessage = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const responseText =
        RESPONSE_SAMPLES[Math.floor(Math.random() * RESPONSE_SAMPLES.length)];
      const botMessage: ChatMessage = {
        role: "assistant",
        text: responseText,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSend = () => {
    handleSendMessage(input);
  };

  const handleClearDialog = () => {
    if (window.confirm("Вы уверены? История диалога будет удалена.")) {
      setMessages([INITIAL_MESSAGE]);
      setInput("");
    }
  };

  const handleExamplePromptSelect = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const showExamples = messages.length === 1;

  return (
    <div className="h-screen flex flex-col bg-[#080d14]">
      {/* Header */}
      <ChatHeader messageCount={messages.length - 1} isLoading={isLoading} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {showExamples ? (
          <div className="flex-1 overflow-y-auto p-6">
            <ExamplePrompts
              visible={showExamples}
              onSelect={handleExamplePromptSelect}
            />
          </div>
        ) : (
          <MessageList messages={messages} isLoading={isLoading} />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        input={input}
        onInputChange={setInput}
        onSend={handleSend}
        onClear={handleClearDialog}
        isLoading={isLoading}
      />
    </div>
  );
}
