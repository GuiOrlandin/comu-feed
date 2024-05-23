import { create } from "zustand";

interface UserStore {
  user: string;
  setUser: (user: string) => void;
  removeUser: () => void;
}

export const emailStore = create<UserStore>()((set) => ({
  user: "",
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: "" }),
}));
