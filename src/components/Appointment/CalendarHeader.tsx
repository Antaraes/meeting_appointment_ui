"use client";

import dayjs from "dayjs";
import React, { useContext } from "react";
import logo from "@/assets/logo.png";
import GlobalContext from "./Context/GlobalContext";
import Image from "next/image";
import Icon from "@mdi/react";
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js";
import { useAppointmentSlice } from "@/store/Appointment/zustand";

export default function CalendarHeader() {
  const {
    monthIndexZ,
    smallCalendarMonthZ,
    setMonthIndexZ,
    setSmallCalendarMonthZ,
  } = useAppointmentSlice();

  return (
    <header className="px-4 py-2 flex items-center">
      <Image src={logo} alt="calendar" className="mr-2 w-12 h-12" />
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">Calendar</h1>
      <button
        onClick={() =>
          setMonthIndexZ(
            monthIndexZ === dayjs().month()
              ? monthIndexZ + Math.random()
              : dayjs().month()
          )
        }
        className="border rounded py-2 px-4 mr-5"
      >
        Today
      </button>
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
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndexZ)).format("MMMM YYYY")}
      </h2>
    </header>
  );
}
