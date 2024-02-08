"use client";

import { useAppointmentSlice } from "@/store/Appointment/zustand";
import dayjs from "dayjs";
import React from "react";

interface DayTitle {
    className: string;
}

const DayTitle: React.FC<DayTitle> = ({className}) => {
  const { monthIndexZ } = useAppointmentSlice();
  return (
    <h2 className={className}>
      {dayjs(new Date(dayjs().year(), monthIndexZ)).format("MMMM YYYY")}
    </h2>
  );
};

export default DayTitle;
