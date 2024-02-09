import { Calendar as BigCalendar, CalendarProps, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react"; // Import useEffect and useState
import { useAppointmentSlice } from "@/store/Appointment/zustand";

const localizer = momentLocalizer(moment);

export default function Calendar(props: Omit<CalendarProps, "localizer">) {
  const minTime = new Date();
  minTime.setHours(9, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(17, 0, 0);

  return <BigCalendar {...props} localizer={localizer} max={maxTime} min={minTime} />;
}
