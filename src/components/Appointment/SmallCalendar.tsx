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
    if (nowDay === currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if (currDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  }

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div>
          <button onClick={() => setMonthIndexZ(monthIndexZ - 1)}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              <Icon path={mdiChevronLeft} size={1} />
            </span>
          </button>
          <button onClick={() => setMonthIndexZ(monthIndexZ + 1)}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              <Icon path={mdiChevronRight} size={1} />
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-sm py-1 text-center">
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
                className={`py-1 w-full ${getDayClass(day)}`}
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
