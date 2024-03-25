import { useThemeStore } from "./store/themeStore";
import { THEME_TYPES } from "./lib/constants";
import { useEffect } from "react";
import Body from "./components/Body";
import ControlBar from "@/components/ControlBar";
import { Toaster } from "./components/ui/toaster";
import { toast } from "./components/ui/use-toast";
import { Button } from "./components/ui/button";
import { cn } from "./lib/utils";

function App() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const { DARK, LIGHT } = THEME_TYPES;
    const root = window.document.documentElement;
    const isDark = theme === DARK;
    root.classList.remove(isDark ? LIGHT : DARK);
    root.classList.add(theme);
  }, [theme]);

  return (
    <>
      <div className="flex flex-col p-4 items-center  container h-lvh">
        <ControlBar />
        <Body />
        <Toaster />
      </div>
    </>
  );
}

export default App;
