import { Button } from "@/components/ui/button";
import { CardWithForm } from "@/components/CardWithForm";
import { useThemeStore } from "./store/themeStore";
import { THEME_TYPES } from "./lib/constants";
import { useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Body from "./components/Body";

function App() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  useEffect(() => {
    const { DARK, LIGHT } = THEME_TYPES;
    const root = window.document.documentElement;
    const isDark = theme === DARK;
    root.classList.remove(isDark ? LIGHT : DARK);
    root.classList.add(theme);
  }, [theme]);

  return (
    <>
      <div className="flex flex-col p-4 bg-slate-50 items-center container h-dvh">
        <Button onClick={toggleTheme}>ChangeTheme</Button>
        <Body />
      </div>
    </>
  );
}

export default App;
