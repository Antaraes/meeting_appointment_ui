"use client";

import WorkingHourList from "@/components/admin/WorkingHourList";
import WorkingHours from "@/components/admin/WorkingHours";
import HomePageTable from "@/components/home/HomePageTable";
import useFetch from "@/hooks/useFetch";
import { getAppointmentsCount } from "@/services/api";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const Page = () => {
  const { data: fetchedCount } = useFetch("counts", getAppointmentsCount);
  const [departmentPieChartData, setDepartmentPieChartData] = useState<
    [string, string | number][]
  >([["Department", "DepartmentData"]]);
  const [roomPieChartData, setRoomPieChartData] = useState<
    [string, string | number][]
  >([["Room", "RoomData"]]);
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
            [departmentName, Number(departmentCount)],
          ]);
        },
      );

      fetchedCount.data.roomCount.map(
        ({ roomName, roomCount }: { roomName: string; roomCount: string }) => {
          setRoomPieChartData((prevData) => [
            ...prevData,
            [roomName, Number(roomCount)],
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
            height={"400px"}
          />
        )}
        {roomPieChartData.length > 1 && (
          <Chart
            chartType="PieChart"
            data={roomPieChartData}
            options={{ title: "Popular Rooms" }}
            width={"100%"}
            height={"400px"}
          />
        )}
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-grow">
          <WorkingHours />
        </div>
        <div className="h-1 bg-black md:hidden"></div> {/* Vertical divider */}
        <div className="flex-grow">
          <WorkingHourList />
        </div>
      </div>
      <HomePageTable />
    </div>
  );
};

export default Page;
