import holidays from '@/app/dashboard/holidays/page';
import dayjs from 'dayjs';
import { create } from 'zustand';

interface State {
    haveChanges: boolean;
    selectedDates: dayjs.Dayjs[];
    newHolidays: (dayjs.Dayjs | null)[];
    removedHolidays: (dayjs.Dayjs | null)[];
}

interface Actions {
    setSelectedDate: (date: dayjs.Dayjs) => void;
    setHaveChanges: (status: boolean) => void;
    setDefault: () => void
}

export const useHolidayStore = create<State & Actions>(
    (set) => ({
        haveChanges: false,
        selectedDates: [],
        newHolidays: [],
        removedHolidays: [],
        setSelectedDate: (date) => {
            set((state: State) => {
                let updatedDates;
                const index = state.selectedDates.findIndex(d => d.format("YYYY-MM-DD") === date.format("YYYY-MM-DD"));
                if (index !== -1) {
                    updatedDates = state.selectedDates.filter(d => d !== date);
                    state.removedHolidays = [...state.removedHolidays, date];
                } else {
                    updatedDates = [...state.selectedDates, date];
                    state.newHolidays = [...state.newHolidays, date];
                }
                return {
                    ...state,
                    selectedDates: updatedDates
                };
            });
        },
        setHaveChanges: (status: boolean) => {
            set((state: State) => ({
                ...state,
                haveChanges: status
            }));
        },
        setDefault: () => {
            set((state: State) => ({
                haveChanges: false,
                selectedDates: [],
                newHolidays: [],
                removedHolidays: [],
            }));
        }
    })
);
