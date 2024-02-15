"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Calendar from "./Calendar";
import { useAppointmentSlice } from "@/store/Appointment/zustand";
import useMediaQuery from "@/hooks/useMediaQuery";
import { SCREEN_SIZE } from "@/constants/responsive";
import dayjs from "dayjs";
import "./TimeLine.css";
import AddAppointment from "@/components/Form/AppointmentForm";
import { useModalStatusStore } from "@/store/modalStatusStore";
import PasscodeForm from "./Form/PasscodeForm";

const events = [
  {
    start: moment("2024-02-08T08:10:00").toDate(),
    end: moment("2024-02-08T17:00:00").toDate(),
    title: "MRI Registration",
  },
  {
    start: moment("2023-03-18T14:00:00").toDate(),
    end: moment("2023-03-18T15:30:00").toDate(),
    title: "ENT Appointment",
  },
];

const TimeLine = () => {
  const format = "YYYY-MM-DD";
  const { daySelectedZ, setDaySelectedZ, appointmentByRoomId } =
    useAppointmentSlice();
  const isMobile = useMediaQuery(SCREEN_SIZE);
  const [defaultDate, setDefaultDate] = useState(new Date());
  const modalStatusStore = useModalStatusStore();
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

  const events = appointmentByRoomId
    ? appointmentByRoomId.data.map((appointment) => ({
        start: moment(
          dayjs(appointment.date).format(format) + "T" + appointment.startTime,
        ).toDate(),
        end: moment(
          dayjs(appointment.date).format(format) + "T" + appointment.endTime,
        ).toDate(),
        title: appointment.description,
        appointmentData: appointment,
      }))
    : [];
  const handleEventClick = (event) => {
    // Implement your logic to open the modal with the event data
    modalStatusStore.setModal({
      isOpen: true,
      Modal: () => <PasscodeForm event={event} />,
    });
  };

  return (
    <>
      <Calendar
        date={daySelectedZ && new Date(daySelectedZ)}
        defaultDate={new Date()}
        events={events}
        view={isMobile ? "day" : "week"}
        views={isMobile ? ["day"] : ["week"]}
        onNavigate={(date) => setDaySelectedZ(dayjs(date))}
        onSelectEvent={handleEventClick}
      />
    </>
  );
};

export default TimeLine;
