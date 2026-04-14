"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
        isDark
          ? "bg-slate-800 hover:bg-slate-700 text-amber-400"
          : "bg-slate-200 hover:bg-slate-300 text-slate-600"
      }`}
      aria-label="Переключить тему"
      title={`Переключиться на ${isDark ? "светлую" : "тёмную"} тему`}
    >
      <div className="relative w-6 h-6">
        {/* Sun icon for light mode */}
        <Sun
          className={`absolute inset-0 w-6 h-6 transition-all duration-300 transform ${
            isDark
              ? "opacity-0 scale-0 rotate-90"
              : "opacity-100 scale-100 rotate-0"
          }`}
        />
        {/* Moon icon for dark mode */}
        <Moon
          className={`absolute inset-0 w-6 h-6 transition-all duration-300 transform ${
            isDark
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-0 -rotate-90"
          }`}
        />
      </div>
    </button>
  );
}
