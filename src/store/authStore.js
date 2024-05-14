import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: null,
  setUser: (user) => {
    set(() => ({ user: user }));
  },
}));
