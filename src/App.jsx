import { useThemeStore } from "./store/themeStore";
import { THEME_TYPES } from "./lib/constants";
import { useEffect } from "react";
import ControlBar from "@/components/ControlBar";
import { Toaster } from "./components/ui/toaster";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import AuthenticationPage from "./pages/auth";
import Analytics from "./pages/analytics";

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
      <div className="flex flex-col p-4 items-center container h-lvh">
        <ControlBar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthenticationPage />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
