import { create } from "zustand";
import { persist } from "zustand/middleware";

type TStoreState = {
  auth: any;
  isAuthenticated: boolean;
  setData: () => void;
};

export const useAuthSlice = create<TStoreState>()(
  persist(
    {
      auth: null,
      isAuthenticated: false,
      setData: () => {},
    },
    {
      name: "auth store",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["user", "token"].includes(key),
          ),
        ),
    },
  ),
);
