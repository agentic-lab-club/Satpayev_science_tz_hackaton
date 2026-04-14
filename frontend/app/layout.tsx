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
  // Suppress hydration warning to allow ThemeProvider to safely mutate the class and style
  suppressHydrationWarning
>
  <head>
    {/* Block rendering until initial theme is read to prevent scrollbar flash */}
    <script
      dangerouslySetInnerHTML={{
        __html: `
          try {
            var theme = localStorage.getItem('app-theme') || 'dark';
            if (theme === 'dark') {
              document.documentElement.classList.add('dark');
              document.documentElement.style.colorScheme = 'dark';
            } else {
              document.documentElement.classList.remove('dark');
              document.documentElement.style.colorScheme = 'light';
            }
          } catch (e) {}
        `,
      }}
    />
  </head>
  <body className="min-h-full flex flex-col">
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </body>
</html>
  );
}
