"use client";
import React from "react";
import CreateAppointmentButton from "./CreateAppointmentButton";
import SmallCalendar from "./SmallCalendar";
import useMediaQuery from "@/hooks/useMediaQuery";
import { SCREEN_SIZE } from "@/constants/responsive";
import TimeLine from "../TimeLine";
import CalendarHeader from "./CalendarHeader";
import { motion } from "framer-motion";
import { headContainerAnimation, slideAnimation } from "../common/motion";
export default function Sidebar() {
  const isMobile = useMediaQuery(SCREEN_SIZE);
  return (
    <>
      {!isMobile ? (
        <>
          <div className="flex">
            <motion.div
              {...headContainerAnimation}
              className="w-1/3 border p-5"
            >
              <CreateAppointmentButton />
              <SmallCalendar />
            </motion.div>
            <motion.div {...slideAnimation("right")} className="mt-5 w-full">
              <TimeLine />
            </motion.div>
          </div>
        </>
      ) : (
        <>
          <div className=" mx-5 ">
            <CreateAppointmentButton />
            <SmallCalendar />
            <div className="mt-5">
              <TimeLine />
            </div>
          </div>
        </>
      )}
    </>
  );
}
