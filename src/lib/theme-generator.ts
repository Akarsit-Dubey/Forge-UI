import { ThemeColors } from "@/store/theme-store";

export function generateCssVariablesString(
  lightColors: ThemeColors,
  darkColors: ThemeColors,
  radius: string
): string {
  return `:root {
  --background: ${lightColors.background};
  --foreground: ${lightColors.foreground};
  --card: ${lightColors.card};
  --card-foreground: ${lightColors.cardForeground};
  --primary: ${lightColors.primary};
  --primary-foreground: ${lightColors.primaryForeground};
  --muted: ${lightColors.muted};
  --muted-foreground: ${lightColors.mutedForeground};
  --border: ${lightColors.border};
  --accent: ${lightColors.accent};
  --accent-foreground: ${lightColors.accentForeground};
  --radius: ${radius};
}

.dark {
  --background: ${darkColors.background};
  --foreground: ${darkColors.foreground};
  --card: ${darkColors.card};
  --card-foreground: ${darkColors.cardForeground};
  --primary: ${darkColors.primary};
  --primary-foreground: ${darkColors.primaryForeground};
  --muted: ${darkColors.muted};
  --muted-foreground: ${darkColors.mutedForeground};
  --border: ${darkColors.border};
  --accent: ${darkColors.accent};
  --accent-foreground: ${darkColors.accentForeground};
  --radius: ${radius};
}`;
}

export interface DesignToken {
  category: "Color" | "Radius" | "Spacing" | "Shadow" | "Typography";
  name: string;
  variable: string;
  value: string;
  previewType: "color" | "radius" | "box" | "text";
}

export const designTokensList: DesignToken[] = [
  // Colors
  { category: "Color", name: "Primary", variable: "--primary", value: "hsl(var(--primary))", previewType: "color" },
  { category: "Color", name: "Primary Foreground", variable: "--primary-foreground", value: "hsl(var(--primary-foreground))", previewType: "color" },
  { category: "Color", name: "Background", variable: "--background", value: "hsl(var(--background))", previewType: "color" },
  { category: "Color", name: "Foreground", variable: "--foreground", value: "hsl(var(--foreground))", previewType: "color" },
  { category: "Color", name: "Muted", variable: "--muted", value: "hsl(var(--muted))", previewType: "color" },
  { category: "Color", name: "Muted Foreground", variable: "--muted-foreground", value: "hsl(var(--muted-foreground))", previewType: "color" },
  { category: "Color", name: "Border", variable: "--border", value: "hsl(var(--border))", previewType: "color" },
  { category: "Color", name: "Accent", variable: "--accent", value: "hsl(var(--accent))", previewType: "color" },

  // Radii
  { category: "Radius", name: "Radius SM", variable: "var(--radius-sm)", value: "calc(var(--radius) - 4px)", previewType: "radius" },
  { category: "Radius", name: "Radius MD", variable: "var(--radius-md)", value: "calc(var(--radius) - 2px)", previewType: "radius" },
  { category: "Radius", name: "Radius LG", variable: "var(--radius)", value: "var(--radius)", previewType: "radius" },
  { category: "Radius", name: "Radius Full", variable: "rounded-full", value: "9999px", previewType: "radius" },

  // Spacing
  { category: "Spacing", name: "Space 1", variable: "spacing-1", value: "0.25rem (4px)", previewType: "box" },
  { category: "Spacing", name: "Space 2", variable: "spacing-2", value: "0.5rem (8px)", previewType: "box" },
  { category: "Spacing", name: "Space 3", variable: "spacing-3", value: "0.75rem (12px)", previewType: "box" },
  { category: "Spacing", name: "Space 4", variable: "spacing-4", value: "1rem (16px)", previewType: "box" },
  { category: "Spacing", name: "Space 6", variable: "spacing-6", value: "1.5rem (24px)", previewType: "box" },
  { category: "Spacing", name: "Space 8", variable: "spacing-8", value: "2rem (32px)", previewType: "box" },
  { category: "Spacing", name: "Space 12", variable: "spacing-12", value: "3rem (48px)", previewType: "box" },

  // Shadows
  { category: "Shadow", name: "Shadow SM", variable: "shadow-sm", value: "0 1px 2px 0 rgb(0 0 0 / 0.05)", previewType: "box" },
  { category: "Shadow", name: "Shadow MD", variable: "shadow-md", value: "0 4px 6px -1px rgb(0 0 0 / 0.1)", previewType: "box" },
  { category: "Shadow", name: "Shadow LG", variable: "shadow-lg", value: "0 10px 15px -3px rgb(0 0 0 / 0.1)", previewType: "box" },

  // Typography
  { category: "Typography", name: "Text XS", variable: "text-xs", value: "0.75rem / 1rem", previewType: "text" },
  { category: "Typography", name: "Text SM", variable: "text-sm", value: "0.875rem / 1.25rem", previewType: "text" },
  { category: "Typography", name: "Text Base", variable: "text-base", value: "1rem / 1.5rem", previewType: "text" },
  { category: "Typography", name: "Text LG", variable: "text-lg", value: "1.125rem / 1.75rem", previewType: "text" },
];
