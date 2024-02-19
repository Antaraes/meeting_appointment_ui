"use client";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useAppointmentSlice } from "@/store/Appointment/zustand";
import useFetch from "@/hooks/useFetch";
import { getAllAppointment } from "@/services/api";
import dayjs from "dayjs";
type Header = {
  id: number;
  Title: string;
};

type TableData = {
  id: number;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  department: string;
};

interface TableComponentProps {
  header: Header[];
  tableData: TableData[];
}

const TableComponent: React.FC<TableComponentProps> = ({
  header,
  tableData,
}) => {
  const { data, isLoading } = useFetch("allAppointments", getAllAppointment);
  console.log(data?.data);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (data) {
      const formattedAppointments = data.data.map((appointment) => ({
        id: appointment.id,
        room: appointment.room.name,
        date: dayjs(appointment.date).format("YYYY-MM-DD"),
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        department: appointment.department.name,
      }));
      setAppointments(formattedAppointments);
    }
  }, [data]);

  const columns = [
    {
      field: "room",
      headerName: "Room",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 0.5,
    },
    {
      field: "startTime",
      headerName: "Start-Time",
      flex: 1,
    },
    {
      field: "endTime",
      headerName: "End-Time",
      flex: 0.4,
    },
    {
      field: "department", // Assuming department object has a name property
      headerName: "Department",
      flex: 1,
    },
    {
      field: "",
      headerName: "",
      flex: 0.5,
      renderCell: (params) => (
        <button
          className=" transition-all duration-300 ease-in-out hover:text-secondary"
          onClick={() => console.log(params.row.id)} // handleEdit function to be implemented
        >
          <FaEdit size={20} />
        </button>
      ),
    },
  ];

  return (
    <div className="mx-auto mb-20 mt-2 flex  w-full rounded-lg lg:w-5/6">
      {/* <table className="table-auto w-full border p-1">
        <thead className="bg-secondary text-text-white border-none">
          <tr>
            {header.map((item) => (
              <th key={item.id} className="px-4 text-left py-2">
                {item.Title}
              </th>
            ))}
            <th className="px-4 text-left py-2"></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr
              key={item.id}
              className={` break-words text-secondary/80 ${index % 2 == 0 && "bg-gray-200/50"}`}
            >
              <td className="px-4 py-2 ">{item.room}</td>
              <td className="px-4 py-2 ">{item.date}</td>
              <td className="px-4 py-2 ">{item.startTime}</td>
              <td className="px-4 py-2 ">{item.endTime}</td>
              <td className="px-4 py-2 ">{item.department}</td>
              <td className="px-4 py-2 ">
                <button className=" hover:text-secondary transition-all duration-300 ease-in-out">
                  <FaEdit className=" " size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <Box height={"75vh"} width={"100%"}>
        <DataGrid
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          loading={isLoading || !appointments}
          getRowId={(row) => row.id}
          rows={appointments || []}
          columns={columns}
          autoPageSize
          initialState={{
            ...appointments,
            sorting: {
              ...appointments,
              sortModel: columns,
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </Box>
    </div>
  );
};

export default TableComponent;
