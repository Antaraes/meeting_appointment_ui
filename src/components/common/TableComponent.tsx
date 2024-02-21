"use client";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Box, useTheme } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridSortItem,
  GridToolbar,
} from "@mui/x-data-grid";
import { useAppointmentSlice } from "@/store/Appointment/zustand";
import useFetch from "@/hooks/useFetch";
import { getAllAppointment } from "@/services/api";
import dayjs from "dayjs";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";

type TableData = {
  id: number;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  department: string;
};

interface TableComponentProps {
  header: GridColDef<TableData>[];
  tableData: TableData[];
  isLoading: boolean;
}

const TableComponent: React.FC<TableComponentProps> = ({
  header: columns,
  tableData: appointments,
  isLoading,
}) => {
  const initialSortModel: GridSortItem[] = columns.map((col) => ({
    field: col.field,
    sort: "desc", // or 'desc' depending on your requirement
  }));
  const initialState: GridInitialStateCommunity = {
    sorting: {
      sortModel: initialSortModel,
    },
  };
  return (
    <div className="mx-auto mb-20 mt-2 flex  w-full rounded-lg lg:w-5/6">
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
          initialState={initialState}
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
