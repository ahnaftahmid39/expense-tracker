import { Button } from "@/components/ui/button";
import { CardWithForm } from "@/components/CardWithForm";
import { useThemeStore } from "./store/themeStore";
import { THEME_TYPES } from "./lib/constants";
import { useEffect } from "react";

function App() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  useEffect(() => {
    const { THEME_DARK, THEME_LIGHT } = THEME_TYPES;
    const root = window.document.documentElement;
    const isDark = theme === THEME_DARK;
    root.classList.remove(isDark ? THEME_LIGHT : THEME_DARK);
    root.classList.add(theme);
  }, [theme]);

  return (
    <>
      <div className="flex flex-col text-center gap-4 items-center justify-center container h-dvh">
        <Button  onClick={toggleTheme}>ChangeTheme</Button>
        <CardWithForm />
      </div>
    </>
  );
}

export default App;
