import { THEME_TYPES } from "@/lib/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "light",
      setTheme: (theme) => {
        set({ theme });
      },
      toggleTheme: () => {
        const { theme } = get();
        const { THEME_DARK, THEME_LIGHT } = THEME_TYPES;
        const newTheme = theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
        get().setTheme(newTheme);
      },
    }),
    {
      name: "theme-storage",
    }
  )
);
