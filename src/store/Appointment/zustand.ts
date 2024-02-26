"use client";

import dayjs from "dayjs";
import { create } from "zustand";

type Store = {
  weekIndexZ: any;
  monthIndexZ: number;
  smallCalendarMonthZ: any;
  daySelectedZ: any;
  appointmentByRoomId: any;
};

type Actions = {
  setWeekIndexZ: (weekIndex: any) => void;
  setMonthIndexZ: (monthIndex: number) => void;
  setSmallCalendarMonthZ: (smallCalendarMonth: any) => void;
  setDaySelectedZ: (daySelected: any) => void;
  setIncrementWeek: () => void;
  setDecrementWeek: () => void;
  setWeek: () => void;
  setAppointmentRoomById: (data: any) => void;
};

export const useAppointmentSlice = create<Store & Actions>((set) => {
  let today = dayjs();
  let startOfWeek = today.startOf("week");
  let endOfWeek = today.endOf("week");

  return {
    monthIndexZ: today.month(),
    weekIndexZ: { start: startOfWeek, end: endOfWeek },
    smallCalendarMonthZ: null,
    daySelectedZ: null,
    appointmentByRoomId: null,

    setWeekIndexZ: (weekIndexZ: any) => set({ weekIndexZ }),
    setMonthIndexZ: (monthIndexZ: number) => set({ monthIndexZ }),
    setAppointmentRoomById: (data) => set({ appointmentByRoomId: data }),

    setWeek: () => {
      set((state) => {
        return {
          weekIndexZ: {
            start: state.daySelectedZ.startOf("week"),
            end: state.daySelectedZ.endOf("week"),
          },
        };
      });
    },

    setSmallCalendarMonthZ: (smallCalendarMonthZ: any) => set({ smallCalendarMonthZ }),
    setDaySelectedZ: (daySelectedZ: any) => set({ daySelectedZ }),

    setIncrementWeek: () => {
      set((state) => {
        const nextWeekStart = state.weekIndexZ.start.add(1, "week");
        const nextWeekEnd = state.weekIndexZ.end.add(1, "week");
        return { weekIndexZ: { start: nextWeekStart, end: nextWeekEnd } };
      });
    },

    setDecrementWeek: () => {
      set((state) => {
        const nextWeekStart = state.weekIndexZ.start.subtract(1, "week");
        const nextWeekEnd = state.weekIndexZ.end.subtract(1, "week");
        return { weekIndexZ: { start: nextWeekStart, end: nextWeekEnd } };
      });
    },
  };
});
