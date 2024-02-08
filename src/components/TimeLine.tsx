// CustomCalendar.js
"use client";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Event 1",
    start: new Date(2024, 1, 7, 24, 0), // year, month, day, hour, minute
    end: new Date(2024, 1, 7, 12, 0),
  },
  {
    title: "Event 2",
    start: new Date(2024, 1, 7, 14, 0),
    end: new Date(2024, 1, 7, 16, 0),
  },
];

function CustomCalendar() {
  return (
    <div style={{ height: "800px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
      />
    </div>
  );
}

export default CustomCalendar;
