import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ThemeColors {
  primary: string; // hsl string, e.g. "240 5.9% 10%"
  primaryForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  accent: string;
  accentForeground: string;
  radius: string; // e.g. "0.5rem"
}

export interface ThemePreset {
  name: string;
  label: string;
  description: string;
  light: ThemeColors;
  dark: ThemeColors;
}

export const themePresets: Record<string, ThemePreset> = {
  zinc: {
    name: "zinc",
    label: "Zinc",
    description: "Default modern neutral with crisp monochrome contrast",
    light: {
      primary: "240 5.9% 10%",
      primaryForeground: "0 0% 98%",
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      card: "0 0% 100%",
      cardForeground: "240 10% 3.9%",
      muted: "240 4.8% 95.9%",
      mutedForeground: "240 3.8% 46.1%",
      border: "240 5.9% 90%",
      accent: "240 4.8% 95.9%",
      accentForeground: "240 5.9% 10%",
      radius: "0.5rem",
    },
    dark: {
      primary: "0 0% 98%",
      primaryForeground: "240 5.9% 10%",
      background: "240 10% 4.5%",
      foreground: "0 0% 98%",
      card: "240 10% 5.5%",
      cardForeground: "0 0% 98%",
      muted: "240 3.7% 15.9%",
      mutedForeground: "240 5% 64.9%",
      border: "240 3.7% 18%",
      accent: "240 3.7% 15.9%",
      accentForeground: "0 0% 98%",
      radius: "0.5rem",
    },
  },
  slate: {
    name: "slate",
    label: "Slate",
    description: "Cool slate undertones inspired by engineering dashboards",
    light: {
      primary: "222.2 47.4% 11.2%",
      primaryForeground: "210 40% 98%",
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
      card: "0 0% 100%",
      cardForeground: "222.2 84% 4.9%",
      muted: "210 40% 96.1%",
      mutedForeground: "215.4 16.3% 46.9%",
      border: "214.3 31.8% 91.4%",
      accent: "210 40% 96.1%",
      accentForeground: "222.2 47.4% 11.2%",
      radius: "0.5rem",
    },
    dark: {
      primary: "210 40% 98%",
      primaryForeground: "222.2 47.4% 11.2%",
      background: "222.2 84% 4.9%",
      foreground: "210 40% 98%",
      card: "222.2 84% 6.5%",
      cardForeground: "210 40% 98%",
      muted: "217.2 32.6% 17.5%",
      mutedForeground: "215 20.2% 65.1%",
      border: "217.2 32.6% 17.5%",
      accent: "217.2 32.6% 17.5%",
      accentForeground: "210 40% 98%",
      radius: "0.5rem",
    },
  },
  violet: {
    name: "violet",
    label: "Violet",
    description: "Sophisticated electric purple accent for modern SaaS and dev tools",
    light: {
      primary: "262.1 83.3% 57.8%",
      primaryForeground: "210 40% 98%",
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      card: "0 0% 100%",
      cardForeground: "240 10% 3.9%",
      muted: "240 4.8% 95.9%",
      mutedForeground: "240 3.8% 46.1%",
      border: "240 5.9% 90%",
      accent: "262.1 83.3% 96%",
      accentForeground: "262.1 83.3% 45%",
      radius: "0.5rem",
    },
    dark: {
      primary: "263.4 70% 50.4%",
      primaryForeground: "210 40% 98%",
      background: "240 10% 4.5%",
      foreground: "0 0% 98%",
      card: "240 10% 5.5%",
      cardForeground: "0 0% 98%",
      muted: "240 3.7% 15.9%",
      mutedForeground: "240 5% 64.9%",
      border: "240 3.7% 18%",
      accent: "263.4 70% 25%",
      accentForeground: "0 0% 98%",
      radius: "0.5rem",
    },
  },
  emerald: {
    name: "emerald",
    label: "Emerald",
    description: "Vibrant emerald green for fintech, health and nature-inspired UI",
    light: {
      primary: "142.1 76.2% 36.3%",
      primaryForeground: "355.7 100% 97.3%",
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      card: "0 0% 100%",
      cardForeground: "240 10% 3.9%",
      muted: "240 4.8% 95.9%",
      mutedForeground: "240 3.8% 46.1%",
      border: "240 5.9% 90%",
      accent: "142.1 76.2% 95%",
      accentForeground: "142.1 76.2% 25%",
      radius: "0.5rem",
    },
    dark: {
      primary: "142.1 70.6% 45.3%",
      primaryForeground: "144.9 80.4% 10%",
      background: "240 10% 4.5%",
      foreground: "0 0% 98%",
      card: "240 10% 5.5%",
      cardForeground: "0 0% 98%",
      muted: "240 3.7% 15.9%",
      mutedForeground: "240 5% 64.9%",
      border: "240 3.7% 18%",
      accent: "142.1 70.6% 20%",
      accentForeground: "0 0% 98%",
      radius: "0.5rem",
    },
  },
  blue: {
    name: "blue",
    label: "Blue",
    description: "Vercel and Linear inspired royal blue with clean crisp contrast",
    light: {
      primary: "221.2 83.2% 53.3%",
      primaryForeground: "210 40% 98%",
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      card: "0 0% 100%",
      cardForeground: "240 10% 3.9%",
      muted: "240 4.8% 95.9%",
      mutedForeground: "240 3.8% 46.1%",
      border: "240 5.9% 90%",
      accent: "221.2 83.2% 96%",
      accentForeground: "221.2 83.2% 40%",
      radius: "0.5rem",
    },
    dark: {
      primary: "217.2 91.2% 59.8%",
      primaryForeground: "222.2 47.4% 11.2%",
      background: "240 10% 4.5%",
      foreground: "0 0% 98%",
      card: "240 10% 5.5%",
      cardForeground: "0 0% 98%",
      muted: "240 3.7% 15.9%",
      mutedForeground: "240 5% 64.9%",
      border: "240 3.7% 18%",
      accent: "217.2 91.2% 20%",
      accentForeground: "0 0% 98%",
      radius: "0.5rem",
    },
  },
  rose: {
    name: "rose",
    label: "Rose",
    description: "Warm crimson-rose hue with playful and expressive personality",
    light: {
      primary: "346.8 77.2% 49.8%",
      primaryForeground: "355.7 100% 97.3%",
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      card: "0 0% 100%",
      cardForeground: "240 10% 3.9%",
      muted: "240 4.8% 95.9%",
      mutedForeground: "240 3.8% 46.1%",
      border: "240 5.9% 90%",
      accent: "346.8 77.2% 96%",
      accentForeground: "346.8 77.2% 40%",
      radius: "0.5rem",
    },
    dark: {
      primary: "346.8 77.2% 49.8%",
      primaryForeground: "355.7 100% 97.3%",
      background: "240 10% 4.5%",
      foreground: "0 0% 98%",
      card: "240 10% 5.5%",
      cardForeground: "0 0% 98%",
      muted: "240 3.7% 15.9%",
      mutedForeground: "240 5% 64.9%",
      border: "240 3.7% 18%",
      accent: "346.8 77.2% 20%",
      accentForeground: "0 0% 98%",
      radius: "0.5rem",
    },
  },
  amber: {
    name: "amber",
    label: "Amber",
    description: "Rich amber gold tone for high-energy and creative workflows",
    light: {
      primary: "37.7 92.1% 50.2%",
      primaryForeground: "240 5.9% 10%",
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      card: "0 0% 100%",
      cardForeground: "240 10% 3.9%",
      muted: "240 4.8% 95.9%",
      mutedForeground: "240 3.8% 46.1%",
      border: "240 5.9% 90%",
      accent: "37.7 92.1% 95%",
      accentForeground: "37.7 92.1% 30%",
      radius: "0.5rem",
    },
    dark: {
      primary: "47.9 95.8% 53.1%",
      primaryForeground: "240 5.9% 10%",
      background: "240 10% 4.5%",
      foreground: "0 0% 98%",
      card: "240 10% 5.5%",
      cardForeground: "0 0% 98%",
      muted: "240 3.7% 15.9%",
      mutedForeground: "240 5% 64.9%",
      border: "240 3.7% 18%",
      accent: "47.9 95.8% 20%",
      accentForeground: "0 0% 98%",
      radius: "0.5rem",
    },
  },
};

export interface ThemeState {
  activePreset: string;
  isDarkMode: boolean;
  radius: string;
  customLight: Partial<ThemeColors>;
  customDark: Partial<ThemeColors>;
  setPreset: (preset: string) => void;
  toggleDarkMode: () => void;
  setDarkMode: (val: boolean) => void;
  setRadius: (radius: string) => void;
  updateColorToken: (mode: "light" | "dark", token: keyof ThemeColors, value: string) => void;
  resetTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      activePreset: "zinc",
      isDarkMode: true,
      radius: "0.5rem",
      customLight: {},
      customDark: {},

      setPreset: (preset: string) => {
        set({ activePreset: preset, customLight: {}, customDark: {} });
      },

      toggleDarkMode: () => {
        set((state) => {
          const next = !state.isDarkMode;
          if (typeof document !== "undefined") {
            if (next) {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
          }
          return { isDarkMode: next };
        });
      },

      setDarkMode: (val: boolean) => {
        if (typeof document !== "undefined") {
          if (val) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
        set({ isDarkMode: val });
      },

      setRadius: (radius: string) => {
        set({ radius });
      },

      updateColorToken: (mode: "light" | "dark", token: keyof ThemeColors, value: string) => {
        set((state) => ({
          [mode === "light" ? "customLight" : "customDark"]: {
            ...state[mode === "light" ? "customLight" : "customDark"],
            [token]: value,
          },
        }));
      },

      resetTheme: () => {
        set({
          activePreset: "zinc",
          radius: "0.5rem",
          customLight: {},
          customDark: {},
        });
      },
    }),
    {
      name: "forge-ui-theme-storage",
    }
  )
);
