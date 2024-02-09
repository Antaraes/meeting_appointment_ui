import Sidebar from "@/components/Appointment/Sidebar";
import React from "react";
import TimeLine from "@/components/TimeLine";

const CalendarPage = () => {
  return (
    <div className="flex">
      <Sidebar>
        <TimeLine />
      </Sidebar>
    </div>
  );
};

export default CalendarPage;
