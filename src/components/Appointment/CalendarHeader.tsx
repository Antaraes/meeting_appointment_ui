import React, { useContext } from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import TodayButton from "./Client/TodayButton";
import PrevMonth from "./Client/PrevMonth";
import NextMonth from "./Client/NextMonth";
import DayTitle from "./Client/DayTitle";

export default function CalendarHeader() {
  return (
    <header className="px-4 py-2 flex items-center">
      <div className="mr-2 w-12 h-12"></div>
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">ACE</h1>
      <TodayButton title="Today" className="border rounded py-2 px-4 mr-5" />
      <PrevMonth className="material-icons-outlined cursor-pointer text-gray-600 mx-2" />
      <NextMonth className="material-icons-outlined cursor-pointer text-gray-600 mx-2" />
      <DayTitle className="ml-4 text-xl text-gray-500 font-bold" />
    </header>
  );
}
