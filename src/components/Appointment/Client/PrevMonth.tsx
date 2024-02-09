"use client";

import React from "react";

import { useAppointmentSlice } from "@/store/Appointment/zustand";
import Icon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";

interface PrevMonth {
  className: string;
}

const PrevMonth: React.FC<PrevMonth> = ({ className }) => {
  const { monthIndexZ, setMonthIndexZ } = useAppointmentSlice();
  return (
    <button onClick={() => setMonthIndexZ(monthIndexZ - 1)}>
      <span className={className}>
        <Icon path={mdiChevronLeft} size={1} />
      </span>
    </button>
  );
};

export default PrevMonth;
