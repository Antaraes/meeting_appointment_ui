import dayjs from "dayjs";
import { create } from "zustand";

type Store = {
  monthIndexZ: number;
  smallCalendarMonthZ: any;
  daySelectedZ: any;
};

type Actions = {
  setMonthIndexZ: (monthIndex: number) => void;
  setSmallCalendarMonthZ: (smallCalendarMonth: number) => void;
  setDaySelectedZ: (daySelected: any) => void;
};

export const useAppointmentSlice = create<Store & Actions>((set) => ({
  monthIndexZ: Number(dayjs().month()),
  smallCalendarMonthZ: null,
  daySelectedZ: dayjs(),
  setMonthIndexZ: (monthIndexZ: number) => set({ monthIndexZ }),
  setSmallCalendarMonthZ: (smallCalendarMonthZ: any) => set({ smallCalendarMonthZ }),
  setDaySelectedZ: (daySelectedZ: any) => set({ daySelectedZ }),
}));
