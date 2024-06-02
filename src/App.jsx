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
import { auth, db } from "../firebase-config";
import { useAuthStore } from "./store/authStore";
import ProfilePage from "./pages/profile";
import { useTransactionStore } from "./store/transactionStore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useToast } from "./components/ui/use-toast";
function App() {
  const theme = useThemeStore((state) => state.theme);
  const setUser = useAuthStore((state) => state.setUser);
  const setTransactions = useTransactionStore((state) => state.setTransactions);
  const setFutureExpenses = useTransactionStore(
    (state) => state.setFutureExpenses
  );

  const { toast } = useToast();

  useEffect(() => {
    const { DARK, LIGHT } = THEME_TYPES;
    const root = window.document.documentElement;
    const isDark = theme === DARK;
    root.classList.remove(isDark ? LIGHT : DARK);
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        try {
          const q = query(
            collection(db, "transactions"),
            where("userId", "==", user.uid)
          );

          const transactions = (await getDocs(q)).docs.map((doc) => ({
            ...doc.data(),
            dateAdded: doc.data().dateAdded.toDate?.() || new Date(doc.data().dateAdded),
            docId: doc.id,
          }));
          setTransactions(transactions);

          const f = query(
            collection(db, "futureExpenses"),
            where("userId", "==", user.uid)
          );

          const futureExpenses = (await getDocs(f)).docs.map((doc) => ({
            ...doc.data(),
            dateAdded: doc.data().dateAdded.toDate(),
            docId: doc.id,
          }));
          setFutureExpenses(futureExpenses);

          console.log({ transactions, futureExpenses });
        } catch (e) {
          toast({
            title: "Error",
            description: e.message,
            className: "border-destructive",
            variant: "destructive",
          });
        }
      } else {
        setTransactions([]);
        setFutureExpenses([]);
      }
    });
  }, [setUser, setTransactions, setFutureExpenses, toast]);

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
