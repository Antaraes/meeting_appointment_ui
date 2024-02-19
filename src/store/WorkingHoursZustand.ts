import { create } from "zustand";

type Store = {
  isEdit: boolean;
  idZ: number | null;
  startTimeZ: string;
  endTimeZ: string;
};

type Actions = {
  setIsEdit: (value: boolean) => void;
  setTime: (id: number, start: string, end: string) => void;
  setDeleteData: () => void;
};

export const useWorkingHoursSlice = create<Store & Actions>((set) => {
  let isEdit = false;
  let idZ = null;
  let startTimeZ = "";
  let endTimeZ = "";

  return {
    isEdit,
    startTimeZ,
    endTimeZ,
    idZ,
    setIsEdit: (value: boolean) => set({ isEdit: value }),
    setTime: (id: number, start: string, end: string) =>
      set({ idZ: id, startTimeZ: start, endTimeZ: end }),
    setDeleteData: () =>
      set({ isEdit: false, idZ: null, startTimeZ: "", endTimeZ: "" }),
  };
});
