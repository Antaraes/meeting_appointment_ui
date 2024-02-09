"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Calendar from "./Calendar";
import { useAppointmentSlice } from "@/store/Appointment/zustand";
import useMediaQuery from "@/hooks/useMediaQuery";
import { SCREEN_SIZE } from "@/constants/responsive";
import dayjs from "dayjs";

const events = [
  {
    start: moment("2024-02-08T08:10:00").toDate(),
    end: moment("2024-02-08T17:00:00").toDate(),
    title: "MRI Registration",
    data: {
      type: "Reg",
    },
  },
  {
    start: moment("2023-03-18T14:00:00").toDate(),
    end: moment("2023-03-18T15:30:00").toDate(),
    title: "ENT Appointment",
    data: {
      type: "App",
    },
  },
];

const components = {
  event: (props: any) => {
    const eventType = props?.event?.data?.type;
    return <div className={`p-2 rounded bg-red-600 text-white`}>{props.title}</div>;
  },
};

const TimeLine = () => {
  const { daySelectedZ, setDaySelectedZ } = useAppointmentSlice();
  const isMobile = useMediaQuery(SCREEN_SIZE);
  const [defaultDate, setDefaultDate] = useState(new Date());
  console.log(daySelectedZ);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (daySelectedZ) {
      const year = daySelectedZ.year();
      const monthIndex = daySelectedZ.month();
      const dayOfMonth = daySelectedZ.date();
      setDefaultDate(new Date(year, monthIndex, dayOfMonth));
    }
  }, [daySelectedZ]);

  return (
    <>
      <Calendar
        date={new Date(daySelectedZ)}
        events={events}
        view={isMobile ? "day" : "week"}
        views={isMobile ? ["day"] : ["week"]}
        components={components}
        onNavigate={(date) => setDaySelectedZ(dayjs(date))}
      />
    </>
  );
};

export default TimeLine;
