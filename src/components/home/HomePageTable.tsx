import React from "react";
import HeaderComponent from "../common/HeaderComponent";
import TextComponent from "../common/TextComponent";
import TableComponent from "../common/TableComponent";

const HomePageTable = () => {
  const headerTable = [
    {
        id: 1,
        Title: "Room",
    },
    {
        id: 2,
        Title: "Date",
    },
    {
        id: 3,
        Title: "Start-Time",
    },
    {
        id: 4,
        Title: "End-Time",
    },
    {
        id: 5,
        Title: "Department",
    },
  ];

  const dataTable = [
    {
      id: 1,
      room: "Room 1",
      date: "2021-01-01",
      startTime: "10:00",
      endTime: "11:00",
      department: "Pending",
    },
    {
      id: 2,
      room: "Room 1",
      date: "2021-01-01",
      startTime: "10:00",
      endTime: "11:00",
      department: "Pending",
    },
    {
      id: 3,
      room: "Room 1asdfasdfasd",
      date: "2021-01-01",
      startTime: "10:00",
      endTime: "11:00",
      department: "Pending",
    },
    {
      id: 4,
      room: "Room 1",
      date: "2021-01-01",
      startTime: "10:00",
      endTime: "11:00",
      department: "Pending",
    },
    {
      id: 5,
      room: "Room 1",
      date: "2021-01-01",
      startTime: "10:00",
      endTime: "11:00",
      department: "Pending",
    },
  ];

  return (
    <div>
      <div className="flex w-[1000px] mx-auto justify-between">
        <HeaderComponent title="Appointment" className="text-black font-bold" />
        <TextComponent
          type="text"
          className="w-[150px] px-5 py-1"
          placeholder="search"
        />
      </div>
      <TableComponent header={headerTable} tableData={dataTable}/>
    </div>
  );
};

export default HomePageTable;
