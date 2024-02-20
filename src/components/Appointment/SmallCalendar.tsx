"use client";

import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "./Context/GlobalContext";
import { getMonth } from "./Context/utils";
import Icon from "@mdi/react";
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js";
import { useAppointmentSlice } from "@/store/Appointment/zustand";
import { useHolidayStore } from "@/store/holidayStore";

export default function SmallCalendar({mode}: {mode: string}) {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const showToday = () => setMonthIndexZ(
      monthIndexZ === dayjs().month()
        ? monthIndexZ + Math.random()
        : dayjs().month()
    )
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const {
    setSelectedDate
  } = useHolidayStore();

  const holidayStore = useHolidayStore();

  const {
    monthIndexZ,
    daySelectedZ,
    setMonthIndexZ,
    setWeek,
    setSmallCalendarMonthZ,
    setDaySelectedZ,
    appointmentByRoomId,
  } = useAppointmentSlice();
  useEffect(() => {
    const nextMonthIdx = daySelectedZ?.isAfter(currentMonth[currentMonth.length - 1][6])
      ? currentMonthIdx + 1
      : daySelectedZ?.isBefore(currentMonth[0][0])
      ? currentMonthIdx - 1
      : currentMonthIdx;

    setMonthIndexZ(nextMonthIdx);
  }, [daySelectedZ]);

  useEffect(() => {
    setCurrentMonthIdx(monthIndexZ);
  }, [monthIndexZ]);

  function getDayClass(day: dayjs.Dayjs) {
    const nowDay = dayjs().startOf("day");
    const currDay = day.startOf("day");
    const slcDay = (daySelectedZ as unknown as Dayjs)?.startOf("day");
    // Check if the day is a weekend day (Saturday or Sunday)
    const isWeekend = day.day() === 0 || day.day() === 6;

    const hasAppointments =
      appointmentByRoomId &&
      appointmentByRoomId.data.some((appointment: any) =>
        dayjs(appointment.date).startOf("day").isSame(currDay, "day"),
      );
    
    let isHoliday = false;
    if (mode === 'holiday') {
      isHoliday = holidayStore.selectedDates.some((date: any) => {
        return dayjs(date).startOf("day").isSame(currDay, "day");
      })
    }

     if (currDay.isBefore(nowDay, "day")) {
      return "text-gray-600 cursor-not-allowed";
    } else if (nowDay.isSame(currDay, "day")) {
      return "bg-accent rounded-full text-white";
    } else if (currDay.isSame(slcDay, "day")) {
      return "bg-accent/50 rounded-full text-white  font-bold";
    } else if (hasAppointments) {
      return "text-red-500";
    } else if (isWeekend) {
      return "text-gray-600 cursor-not-allowed";
     } else if (isHoliday){
       return "text-white bg-yellow-400 rounded-full font-bold"
     }else {
      return "text-white";
    }
  }

  return (
    <div className="bg-secondary border rounded-xl p-4">
      <header className="flex justify-between items-center mx-4">
        <p className="text-white font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div className="flex items-center justify-end">
          <button onClick={showToday} className="hover:bg-green-500 border rounded-md border-green-500 hover:border-none text-green-500 hover:text-white text-xs font-semibold px-2 py-1 me-5">Today</button>
          <button onClick={() => setMonthIndexZ(monthIndexZ - 1)}>
            <span className="material-icons-outlined cursor-pointer text-white mx-2">
              <Icon path={mdiChevronLeft} size={1} />
            </span>
          </button>
          <button onClick={() => setMonthIndexZ(monthIndexZ + 1)}>
            <span className="material-icons-outlined cursor-pointer text-white mx-2">
              <Icon path={mdiChevronRight} size={1} />
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-sm py-1 text-center text-gray-600">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day: any, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (!getDayClass(day).includes("cursor-not-allowed")) {
                    setSmallCalendarMonthZ(currentMonthIdx);
                    if (mode === 'holiday') {
                      setSelectedDate(day)
                      return
                    }
                      setDaySelectedZ(day)
                      setWeek();
                  }
                }}
                className={`py-1 w-full ${getDayClass(day)} `}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
