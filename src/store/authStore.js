import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => {
    set(() => ({ user: user, isLoggedIn: user ? true : false }));
  },
}));
