import React from "react";
import HeaderComponent from "../common/HeaderComponent";
import TextComponent from "../common/TextComponent";
import TableComponent from "../common/TableComponent";
import MobileHomeTable from "../common/MobileHomeTable";
import { FaSearch } from "react-icons/fa";

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
      department: "Banking",
    },
    {
      id: 2,
      room: "Room 1",
      date: "2021-01-01",
      startTime: "10:00",
      endTime: "11:00",
      department: "Banking",
    },
    {
      id: 3,
      room: "Room 1asdfasdfasd",
      date: "2021-01-01",
      startTime: "10:00",
      endTime: "11:00",
      department: "Banking",
    },
    {
      id: 4,
      room: "Room 1",
      date: "2021-01-01",
      startTime: "10:00",
      endTime: "11:00",
      department: "Banking",
    },
    {
      id: 5,
      room: "Room 1",
      date: "2021-01-01",
      startTime: "10:00",
      endTime: "11:00",
      department: "Banking",
    },
  ];

  return (
    <div className="mx-auto w-auto p-0">
      <div className="m-0 hidden px-10 md:block">
        <div className="mx-auto flex justify-between lg:w-5/6">
          <HeaderComponent
            title="Appointment"
            className="pl-2 text-xl font-bold text-secondary/90"
          />
          <TextComponent
            type="text"
            className="w-1/4 rounded-3xl bg-secondary/10 px-5 py-1 text-secondary/70 outline-none placeholder:text-secondary/30"
            placeholder="search"
          />
        </div>
        <TableComponent header={headerTable} tableData={dataTable} />
      </div>
      <div className="mx-auto p-0 md:hidden">
        <div className="mb-3 flex justify-between px-5">
          <HeaderComponent
            title="Appointment"
            className="font-bold text-black"
          />

          <button className="bg-transparent text-center">
            <FaSearch size={20} />
          </button>
        </div>

        <MobileHomeTable tableData={dataTable} />
      </div>
    </div>
  );
};

export default HomePageTable;
