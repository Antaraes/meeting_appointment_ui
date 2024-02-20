import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react"; // Import useEffect and useState
import { useAppointmentSlice } from "@/store/Appointment/zustand";

const localizer = momentLocalizer(moment);

export default function Calendar(props: Omit<CalendarProps, "localizer">) {
  const minTime = new Date();
  minTime.setHours(9, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(17, 0, 0);

  // Function to determine if a date is a weekend or public holiday
  const isDisabledDate = (date) => {
    // Check if it's a weekend (Saturday or Sunday)
    if (date.getDay() === 0 || date.getDay() === 6) {
      return true;
    }

    // Add logic to check for public holidays here if needed

    return false;
  };

  return (
    <BigCalendar {...props} localizer={localizer} max={maxTime} min={minTime} />
  );
}
