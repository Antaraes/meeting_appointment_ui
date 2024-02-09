"use client";

import React, { useContext } from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import TodayButton from "./Client/TodayButton";
import PrevMonth from "./Client/PrevMonth";
import NextMonth from "./Client/NextMonth";
import DayTitle from "./Client/DayTitle";
import { useAppointmentSlice } from "@/store/Appointment/zustand";
import Icon from "@mdi/react";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";

export default function CalendarHeader() {
  const { weekIndexZ, setIncrementWeek, setDecrementWeek, daySelectedZ } =
    useAppointmentSlice();

  return (
    <header className="px-4 py-2 flex items-center">
      <div className="mr-2 w-12 h-12"></div>
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">ACE</h1>
      <TodayButton title="Today" className="border rounded py-2 px-4 mr-5" />
      <PrevMonth className="material-icons-outlined cursor-pointer text-gray-600 mx-2" />
      <DayTitle className="ml-4 text-xl text-gray-500 font-bold" />
      <NextMonth className="material-icons-outlined cursor-pointer text-gray-600 mx-2" />
      <button onClick={() => setDecrementWeek()}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          <Icon path={mdiChevronLeft} size={1} />
        </span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {weekIndexZ.start.format("MMMM DD")}-{weekIndexZ.end.format("MMMM DD")}
      </h2>
      <button onClick={() => setIncrementWeek()}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          <Icon path={mdiChevronRight} size={1} />
        </span>
      </button>
    </header>
  );
}
