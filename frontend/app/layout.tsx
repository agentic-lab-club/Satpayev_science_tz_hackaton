import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./providers/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TZ·AI - Анализ технических заданий",
  description: "AI-ассистент для анализа и улучшения технических заданий",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html
  lang="en"
  className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
  // ✅ Без "dark" — ThemeProvider сам добавит/уберёт этот класс
>
  <body className="min-h-full flex flex-col bg-white dark:bg-[#080d14] text-slate-900 dark:text-white transition-colors duration-300">
    <ThemeProvider>{children}</ThemeProvider>
  </body>
</html>
  );
}
