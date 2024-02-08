import React from "react";
import CreateAppointmentButton from './CreateAppointmentButton'
import SmallCalendar from "./SmallCalendar";
export default function Sidebar() {
  return (
    <aside className="border p-5 w-64">
      <CreateAppointmentButton />
      <SmallCalendar />
    </aside>
  );
}
