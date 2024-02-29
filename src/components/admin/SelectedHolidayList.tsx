"use client";

import useFetch from "@/hooks/useFetch";
import { useHolidayMutation } from "@/hooks/useHolidays";
import { createHolidays, getAllHolidays } from "@/services/api";
import { useAppointmentSlice } from "@/store/Appointment/zustand";
import { useHolidayStore } from "@/store/holidayStore";
import { HolidayData } from "@/types/holiday";
import { mdiCloseCircle, mdiRestore } from "@mdi/js";
import Icon from "@mdi/react";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";

export default function SelectedHolidayList() {
  const { data: holidays, refetch: refetchHolidays } = useFetch(
    "holidays",
    getAllHolidays,
  );
  const holidayStore = useHolidayStore();
  const prevSelectedDatesLength = useRef<number>(
    holidayStore.selectedDates.length,
  );
  const refetchHandler = () => {
    prevSelectedDatesLength.current = 0;
    holidayStore.setDefault();
    refetchHolidays();
  };
  const { mutate, isPending: isProgressing } = useHolidayMutation(
    createHolidays,
    refetchHandler,
  );

  const { setMonthIndexZ, monthIndexZ } = useAppointmentSlice();
  const handleShowDate = (date: any) =>
    setMonthIndexZ(
      monthIndexZ === dayjs(date).month()
        ? monthIndexZ + Math.random()
        : dayjs(date).month(),
    );

  const saveChangesHandler = () => {
    if (!isProgressing && !holidayStore.haveChanges) return;
    const removedHolidays = holidayStore.removedHolidays
      .map((removeHoliday) => {
        if (
          !holidayStore.selectedDates.some((selectedDate) =>
            dayjs(selectedDate).startOf("day").isSame(removeHoliday, "day"),
          )
        ) {
          return removeHoliday?.format("YYYY-MM-DD");
        } else {
          return null;
        }
      })
      .filter((holiday) => holiday !== null);

    const newHolidays = holidayStore.newHolidays
      .map((newHoliday) => {
        if (
          holidayStore.selectedDates.some((selectedDate) =>
            dayjs(selectedDate).startOf("day").isSame(newHoliday, "day"),
          )
        ) {
          return newHoliday?.format("YYYY-MM-DD");
        } else {
          return null;
        }
      })
      .filter((holiday) => holiday !== null);

    if (newHolidays.length > 0 || removedHolidays.length > 0) {
      const data: HolidayData = {
        newHolidays,
        removedHolidays,
      };
      mutate({ data: data });
    }
  };

  useEffect(() => {
    if (holidays && holidays.data.length > 0) {
      const dateArray = holidays.data.map(
        (holiday: { id: string; date: string }) => dayjs(holiday.date),
      );
      if (dateArray.length > 0) {
        dateArray.forEach((date: dayjs.Dayjs) => {
          holidayStore.setSelectedDate(date);
        });
      }
    }
  }, [holidays]);

  useEffect(() => {
    if (
      prevSelectedDatesLength.current !== 0 &&
      holidayStore.selectedDates.length !== prevSelectedDatesLength.current
    ) {
      holidayStore.setHaveChanges(true);
    }
    prevSelectedDatesLength.current = holidayStore.selectedDates.length;
  }, [holidayStore.selectedDates.length]);

  return (
    <div className="mx-auto min-w-[90%] max-w-[90%] rounded-md bg-white p-5 md:min-w-[50%] md:max-w-[50%] lg:min-w-[40%] lg:max-w-[40%]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Public Holidays List</h3>
        <div className="flex items-center justify-end gap-x-2">
          <span onClick={refetchHandler}>
            <Icon path={mdiRestore} size={1} className="me-3 cursor-pointer" />
          </span>
          <button
            onClick={saveChangesHandler}
            className={`rounded-md bg-green-500 px-2 py-1 text-sm text-white ${!holidayStore.haveChanges && "cursor-not-allowed opacity-40"} ${isProgressing && "cursor-not-allowed"}`}
          >
            {isProgressing ? "Saving......" : "Save changes"}
          </button>
        </div>
      </div>
      <div className="flex h-auto max-h-[36vh] flex-wrap overflow-y-auto">
        {holidayStore.selectedDates.length > 0 &&
          Array.from(
            { length: holidayStore.selectedDates.length },
            (_, index) => index,
          )
            .sort((a, b) => b - a)
            .map((index) => {
              const date = holidayStore.selectedDates[index];
              return (
                <div
                  className="m-2 inline-flex items-center gap-x-2 text-nowrap rounded-md bg-yellow-400 p-2 text-xs text-white "
                  key={date.toString()}
                >
                  <span
                    onClick={() => handleShowDate(date)}
                    className="cursor-pointer"
                  >
                    {date.format("YYYY-MM-DD")}
                  </span>
                  <span
                    onClick={() => {
                      holidayStore.setSelectedDate(date);
                    }}
                  >
                    <Icon
                      path={mdiCloseCircle}
                      size={1}
                      className="cursor-pointer"
                    />
                  </span>
                </div>
              );
            })}
      </div>
    </div>
  );
}
