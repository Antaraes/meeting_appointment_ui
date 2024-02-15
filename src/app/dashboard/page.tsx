"use client";

import HomePageTable from "@/components/home/HomePageTable";
import useFetch from "@/hooks/useFetch";
import { getAppointmentsCount } from "@/services/api";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Departments", "Test"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

const page = () => {
  const { data: fetchedCount } = useFetch("counts", getAppointmentsCount);
  const [departmentPieChartData, setDepartmentPieChartData] = useState([
    ["Department", "DepartmentData"],
  ]);
  const [roomPieChartData, setRoomPieChartData] = useState([
    ["Room", "RoomData"],
  ]);
  useEffect(() => {
    if (fetchedCount) {
      setDepartmentPieChartData((prevData) => [prevData[0]]);
      setRoomPieChartData((prevData) => [prevData[0]]);

      fetchedCount.data.departmentCount.map(
        ({
          departmentName,
          departmentCount,
        }: {
          departmentName: string;
          departmentCount: string;
        }) => {
          setDepartmentPieChartData((prevData) => [
            ...prevData,
            [departmentName, departmentCount],
          ]);
        },
      );

      fetchedCount.data.roomCount.map(
        ({ roomName, roomCount }: { roomName: string; roomCount: string }) => {
          setRoomPieChartData((prevData) => [
            ...prevData,
            [roomName, roomCount],
          ]);
        },
      );
    }
  }, [fetchedCount]);

  return (
    <div className="h-screen">
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2">
        {departmentPieChartData.length > 1 && (
          <Chart
            chartType="PieChart"
            data={departmentPieChartData}
            options={{ title: "Appointment Count By Department" }}
            width={"100%"}
            height={"600px"}
          />
        )}
        {roomPieChartData.length > 1 && (
          <Chart
            chartType="PieChart"
            data={roomPieChartData}
            options={{ title: "Popular Rooms" }}
            width={"100%"}
            height={"600px"}
          />
        )}
      </div>
      <HomePageTable />
    </div>
  );
};

export default page;
