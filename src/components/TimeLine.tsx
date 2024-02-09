"use client";
import moment from "moment";
import Calendar from "./Calendar";
import { useEffect, useState } from "react";
import { useAppointmentSlice } from "@/store/Appointment/zustand";

const events = [
  {
    start: moment("2024-02-18T10:10:00").toDate(),
    end: moment("2024-02-18T11:00:00").toDate(),
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
    switch (eventType) {
      case "Reg":
        return (
          <div style={{ background: "yellow", color: "white", height: "100%" }}>{props.title}</div>
        );
      case "App":
        return (
          <div style={{ background: "lightgreen", color: "white", height: "100%" }}>
            {props.title}
          </div>
        );
      default:
        return null;
    }
  },
};

export default function TimeLine() {
  const { daySelectedZ } = useAppointmentSlice();
  const [defaultDate, setDefaultDate] = useState(new Date());
  useEffect(() => {
    // Update defaultDate when daySelectedZ changes
    if (daySelectedZ) {
      const year = daySelectedZ.year();
      const monthIndex = daySelectedZ.month();
      const dayOfMonth = daySelectedZ.date();
      setDefaultDate(new Date(year, monthIndex, dayOfMonth));
    }
  }, [daySelectedZ]);
  return <Calendar defaultDate={defaultDate} events={events} components={components} />;
}
