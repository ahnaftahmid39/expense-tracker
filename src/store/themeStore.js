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
        const { DARK, LIGHT } = THEME_TYPES;
        const newTheme = theme === LIGHT ? DARK : LIGHT;
        get().setTheme(newTheme);
      },
    }),
    {
      name: "theme-storage",
    }
    // { partialize: (state) => ({ theme: state.theme }) }
  )
);
