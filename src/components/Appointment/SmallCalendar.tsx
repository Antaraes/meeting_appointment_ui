"use client";

import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "./Context/GlobalContext";
import { getMonth } from "./Context/utils";
import Icon from "@mdi/react";
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js";
import { useAppointmentSlice } from "@/store/Appointment/zustand";

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);
  const {
    monthIndexZ,
    daySelectedZ,
    setMonthIndexZ,
    setWeek,
    setSmallCalendarMonthZ,
    setDaySelectedZ,
  } = useAppointmentSlice();

  useEffect(() => {
    setCurrentMonthIdx(monthIndexZ);
  }, [monthIndexZ]);

  function getDayClass(day: dayjs.Dayjs) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = (daySelectedZ as unknown as Dayjs)?.format(format);

    // Check if the day is a weekend day (Saturday or Sunday)
    const isWeekend = day.day() === 0 || day.day() === 6;

    if (nowDay === currDay) {
      return "bg-accent rounded-full text-white";
    } else if (currDay === slcDay) {
      return "bg-accent/50 rounded-full text-blue-600 font-bold";
    } else if (isWeekend) {
      return "text-gray-400 cursor-not-allowed";
    } else {
      return "";
    }
  }

  return (
    <div className="bg-secondary border rounded-xl p-4">
      <header className="flex justify-between items-center mx-4">
        <p className="text-white font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div>
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
                  setSmallCalendarMonthZ(currentMonthIdx);
                  setDaySelectedZ(day);
                  setWeek();
                  console.log("Day clicked:", day.format("YYYY-MM-DD"));
                }}
                className={`py-1 w-full ${getDayClass(day)} text-white`}
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
