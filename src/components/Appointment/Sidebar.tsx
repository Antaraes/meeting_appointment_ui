"use client";
import React from "react";
import CreateAppointmentButton from "./CreateAppointmentButton";
import SmallCalendar from "./SmallCalendar";
import useMediaQuery from "@/hooks/useMediaQuery";
import { SCREEN_SIZE } from "@/constants/responsive";
import TimeLine from "../TimeLine";
import CalendarHeader from "./CalendarHeader";
export default function Sidebar() {
  const isMobile = useMediaQuery(SCREEN_SIZE);
  return (
    <>
      {!isMobile ? (
        <>
          <CalendarHeader />
          <div className="flex">
            <div className="border p-5 w-1/3">
              <CreateAppointmentButton />
              <SmallCalendar />
            </div>
            <div className="w-full">
              <TimeLine />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" mx-5 ">
            <CreateAppointmentButton />
            <SmallCalendar />
            <div>
              <TimeLine />
            </div>
          </div>
        </>
      )}
    </>
  );
}
