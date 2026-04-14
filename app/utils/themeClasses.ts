/**
 * Theme utility classes for consistent styling across light and dark modes
 * 
 * Usage:
 * import { getThemeClasses } from "@/app/utils/themeClasses";
 * 
 * const classes = getThemeClasses();
 * 
 * // Apply to elements:
 * <div className={classes.bg.primary}>
 * <button className={classes.button.primary}>
 */

export const themeClasses = {
  // Background colors
  bg: {
    primary: "dark:bg-[#080d14] light:bg-white",
    secondary: "dark:bg-slate-900 light:bg-slate-50",
    tertiary: "dark:bg-slate-800 light:bg-slate-100",
    hover: "dark:hover:bg-slate-700 light:hover:bg-slate-200",
    active: "dark:bg-slate-700 light:bg-slate-200",
    card: "dark:bg-slate-900/40 light:bg-white/40",
    input: "dark:bg-slate-800/50 light:bg-slate-100",
  },

  // Text colors
  text: {
    primary: "dark:text-white light:text-slate-900",
    secondary: "dark:text-slate-400 light:text-slate-600",
    tertiary: "dark:text-slate-500 light:text-slate-500",
    accent: "dark:text-amber-400 light:text-blue-600",
    hover: "dark:hover:text-amber-400 light:hover:text-blue-600",
  },

  // Border colors
  border: {
    primary: "dark:border-slate-700 light:border-slate-300",
    hover: "dark:hover:border-slate-600 light:hover:border-slate-400",
    focus: "dark:focus:border-blue-400 light:focus:border-blue-600",
    accent: "dark:border-amber-400/50 light:border-blue-600/50",
  },

  // Gradient backgrounds
  gradient: {
    primary: "dark:from-blue-500 dark:to-purple-600 light:from-blue-400 light:to-purple-500",
    secondary: "dark:from-green-500 dark:to-blue-600 light:from-green-400 light:to-blue-500",
    accent: "dark:from-purple-500 dark:to-pink-600 light:from-purple-400 light:to-pink-500",
  },

  // Button styles
  button: {
    primary:
      "dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 dark:hover:from-blue-600 dark:hover:to-purple-700 light:bg-gradient-to-r light:from-blue-400 light:to-purple-500 light:hover:from-blue-500 light:hover:to-purple-600 text-white font-bold rounded-xl px-4 py-2 transition-all",
    secondary:
      "dark:bg-slate-800 dark:hover:bg-slate-700 light:bg-slate-200 light:hover:bg-slate-300 dark:text-white light:text-slate-900 font-semibold rounded-xl px-4 py-2 transition-all",
    outline:
      "dark:border dark:border-slate-700 dark:hover:border-slate-600 light:border light:border-slate-400 light:hover:border-slate-500 dark:text-white light:text-slate-900 font-semibold rounded-xl px-4 py-2 transition-all",
  },

  // Card styles
  card:
    "dark:bg-slate-900/40 dark:border dark:border-slate-700 light:bg-white/40 light:border light:border-slate-300 rounded-xl backdrop-blur-sm",

  // Input styles
  input:
    "dark:bg-slate-800/50 dark:border dark:border-slate-700 dark:text-white dark:placeholder-slate-500 dark:focus:border-blue-400/50 dark:focus:ring-blue-400/20 light:bg-slate-100 light:border light:border-slate-400 light:text-slate-900 light:placeholder-slate-600 light:focus:border-blue-600/50 light:focus:ring-blue-600/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 transition-all",

  // Backdrop blur
  backdrop: "dark:bg-slate-900/30 light:bg-white/30 backdrop-blur-md",

  // Status indicators
  status: {
    success: "dark:text-emerald-400 light:text-emerald-600",
    error: "dark:text-rose-400 light:text-rose-600",
    warning: "dark:text-amber-400 light:text-amber-600",
    info: "dark:text-blue-400 light:text-blue-600",
  },
};

/**
 * Get responsive theme classes based on current mode
 * Use with Tailwind dark: and light: modifiers
 */
export function getThemeClasses() {
  return themeClasses;
}

/**
 * Combine multiple theme classes
 * @param classes Array of class strings
 * @returns Combined class string
 */
export function combineThemeClasses(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Create a theme-aware className string
 * @param baseDarkClass Dark mode classes
 * @param baseLightClass Light mode classes
 * @returns Combined class string
 */
export function themeClass(baseDarkClass: string, baseLightClass: string): string {
  return `dark:${baseDarkClass} light:${baseLightClass}`;
}
