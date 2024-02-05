import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Store = {
  count: number;
};

type Actions = {
  increase: () => void;
  descrease: () => void;
};

export const useCounterSlice = create<Store & Actions>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increase: () =>
          set((state: any) => ({
            count: state.count + 1,
          })),
        descrease: () =>
          set((state: any) => ({
            count: state.count - 1,
          })),
      }),
      { name: "count", getStorage: () => localStorage }
    )
  )
);
