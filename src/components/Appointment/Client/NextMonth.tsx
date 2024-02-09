"use client";

import React from "react";

import { useAppointmentSlice } from "@/store/Appointment/zustand";
import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";

interface NextMonth {
  className: string;
}

const NextMonth: React.FC<NextMonth> = ({ className }) => {
  const { monthIndexZ, setMonthIndexZ } = useAppointmentSlice();
  return (
    <button onClick={() => setMonthIndexZ(monthIndexZ + 1)}>
      <span className={className}>
        <Icon path={mdiChevronRight} size={1} />
      </span>
    </button>
  );
};

export default NextMonth;
