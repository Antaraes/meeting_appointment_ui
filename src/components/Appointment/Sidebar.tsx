"use client";
import React from "react";
import CreateAppointmentButton from "./CreateAppointmentButton";
import SmallCalendar from "./SmallCalendar";
import useMediaQuery from "@/hooks/useMediaQuery";
import { SCREEN_SIZE } from "@/constants/responsive";
export default function Sidebar({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery(SCREEN_SIZE);
  return (
    <>
      {!isMobile ? (
        <>
          <aside className="border p-5 w-64">
            <CreateAppointmentButton />
            <SmallCalendar />
          </aside>
          <div className="w-full">{children}</div>
        </>
      ) : (
        <>
          <div className="">
            <CreateAppointmentButton />
            <SmallCalendar />
            <div>{children}</div>
          </div>
        </>
      )}
    </>
  );
}
