"use client";

import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "./Context/GlobalContext";
import { getMonth } from "./Context/utils";
import Icon from "@mdi/react";
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js";
import { useAppointmentSlice } from "@/store/Appointment/zustand";
import { format } from "@/utils";

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
    appointmentByRoomId,
  } = useAppointmentSlice();
  useEffect(() => {
    const nextMonthIdx = daySelectedZ?.isAfter(
      currentMonth[currentMonth.length - 1][6],
    )
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

    const isWeekend = day.day() === 0 || day.day() === 6;

    const hasAppointments =
      appointmentByRoomId &&
      appointmentByRoomId.data.some((appointment: any) =>
        dayjs(appointment.date).startOf("day").isSame(currDay, "day"),
      );

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
    } else {
      return "text-white";
    }
  }

  return (
    <div className="rounded-xl border bg-secondary p-4">
      <header className="mx-4 flex items-center justify-between">
        <p className="font-bold text-white">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div>
          <button onClick={() => setMonthIndexZ(monthIndexZ - 1)}>
            <span className="material-icons-outlined mx-2 cursor-pointer text-white">
              <Icon path={mdiChevronLeft} size={1} />
            </span>
          </button>
          <button onClick={() => setMonthIndexZ(monthIndexZ + 1)}>
            <span className="material-icons-outlined mx-2 cursor-pointer text-white">
              <Icon path={mdiChevronRight} size={1} />
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="py-1 text-center text-sm text-gray-600">
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
                    setDaySelectedZ(day);
                    setWeek();
                    console.log("Day clicked:", day.format("YYYY-MM-DD"));
                  }
                }}
                className={`w-full py-1 ${getDayClass(day)} `}
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
