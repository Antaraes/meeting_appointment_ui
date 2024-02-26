"use client";

import { useAppointmentSlice } from "@/store/Appointment/zustand";
import dayjs from "dayjs";
import React from "react";

interface TodayButtonProps {
  title: string;
  className: string;
}

const TodayButton: React.FC<TodayButtonProps> = ({ title, className }) => {
  const { monthIndexZ, setMonthIndexZ } = useAppointmentSlice();

  return (
    <button
      onClick={() =>
        setMonthIndexZ(
          monthIndexZ === dayjs().month()
            ? monthIndexZ + Math.random()
            : dayjs().month()
        )
      }
      className={className}
    >
      {title}
    </button>
  );
};

export default TodayButton;
