import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react"; // Import useEffect and useState
import { useAppointmentSlice } from "@/store/Appointment/zustand";
import useFetch from "@/hooks/useFetch";
import { getAllWorkingHours } from "@/services/api";
import Spinner from "./common/Spinner";

const localizer = momentLocalizer(moment);

export default function Calendar(props: Omit<CalendarProps, "localizer">) {
  const { data: workingHours, isLoading } = useFetch(
    "workingHours",
    getAllWorkingHours,
  );
  let minTime = new Date();
  minTime.setHours(9, 0, 0);

  let maxTime = new Date();
  maxTime.setHours(17, 0, 0);
  if (isLoading) {
    return <Spinner lg />;
  }

  if (workingHours && workingHours.data.length > 0) {
    workingHours.data.forEach((item: any) => {
      if (item.isActive) {
        minTime = new Date();
        const startTimeParts = item.startTime.split(":");
        minTime.setHours(
          parseInt(startTimeParts[0]),
          parseInt(startTimeParts[1]),
          parseInt(startTimeParts[2]),
        );
        console.log(minTime);

        maxTime = new Date();
        const endTimeParts = item.endTime.split(":");
        maxTime.setHours(
          parseInt(endTimeParts[0]),
          parseInt(endTimeParts[1]),
          parseInt(endTimeParts[2]),
        );
      }
    });
  }

  return (
    <BigCalendar {...props} localizer={localizer} max={maxTime} min={minTime} />
  );
}
