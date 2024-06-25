import { UserResponse } from "@/app/components/topBar";
import { create } from "zustand";

interface UserStore {
  user: UserResponse;
  setUser: (user: UserResponse) => void;
  removeUser: () => void;
}

export const userStore = create<UserStore>()((set) => ({
  user: {
    comments: [],
    community_Founder: [],
    community_Member: [],
    created_at: new Date(),
    email: "",
    id: "",
    name: "",
    mediaResponse: [],
    textResponse: [],
    avatar: "",
  },
  setUser: (user) => set({ user }),
  removeUser: () =>
    set({
      user: {
        name: "",
        comments: [],
        community_Founder: [],
        community_Member: [],
        created_at: new Date(),
        email: "",
        id: "",
        mediaResponse: [],
        textResponse: [],
        avatar: "",
      },
    }),
}));
