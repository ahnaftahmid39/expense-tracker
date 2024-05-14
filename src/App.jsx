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
import { auth } from "../firebase-config";
import { useAuthStore } from "./store/authStore";
import ProfilePage from "./pages/profile";

function App() {
  const theme = useThemeStore((state) => state.theme);
  const setUser = useAuthStore((state) => state.setUser);
  
  useEffect(() => {
    const { DARK, LIGHT } = THEME_TYPES;
    const root = window.document.documentElement;
    const isDark = theme === DARK;
    root.classList.remove(isDark ? LIGHT : DARK);
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, [setUser]);

  return (
    <>
      <div className="flex flex-col [&>*:nth-child(2)]:grow  gap-4 pb-4 items-center container  h-lvh">
        <Toaster />
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.auth} element={<AuthenticationPage />} />
          <Route path={routes.analytics} element={<Analytics />} />
          <Route path={routes.all} element={<Viewall />} />
          <Route path={routes.profile} element={<ProfilePage />} />
        </Routes>
        <ControlBar />
      </div>
    </>
  );
}

export default App;
