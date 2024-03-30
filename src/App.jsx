import { useThemeStore } from "./store/themeStore";
import { THEME_TYPES, routes } from "./lib/constants";
import { useEffect } from "react";
import ControlBar from "@/components/ControlBar";
import { Toaster } from "./components/ui/toaster";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import AuthenticationPage from "./pages/auth";
import Analytics from "./pages/analytics";
import Viewall from "./pages/viewall";

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
      <div className="flex flex-col [&>*:nth-child(2)]:flex-1  gap-4 pb-4 items-center container overflow-clip h-lvh">
        <Toaster />
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.auth} element={<AuthenticationPage />} />
          <Route path={routes.analytics} element={<Analytics />} />
          <Route path={routes.all} element={<Viewall />} />
        </Routes>
        <ControlBar />
      </div>
    </>
  );
}

export default App;
