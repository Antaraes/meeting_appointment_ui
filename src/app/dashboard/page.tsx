"use client";

import WorkingHourList from "@/components/admin/WorkingHourList";
import WorkingHours from "@/components/admin/WorkingHours";
import HomePageTable from "@/components/home/HomePageTable";
import { useAppointmentMutation } from "@/hooks/useAppointment";
import useFetch from "@/hooks/useFetch";
import {
  createWorkingHours,
  deleteWorkingHours,
  getAllWorkingHours,
  getAppointmentsCount,
  updateWorkingHours,
} from "@/services/api";
import { useWorkingHoursSlice } from "@/store/WorkingHoursZustand";
import { working_hour } from "@/types/workingHours";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import toast from "react-hot-toast";

const Page = () => {
  const { data: fetchedCount } = useFetch("counts", getAppointmentsCount);
  console.log(fetchedCount);
  const { idZ, startTimeZ, endTimeZ, setDeleteData } = useWorkingHoursSlice();
  const [data, setData] = useState({
    startTime: "",
    endTime: "",
  });

  const [dataServer, setDataServer] = useState<{ data: any[] }>({ data: [] });

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

  console.log("department-----", departmentPieChartData);
  console.log("room-----", roomPieChartData);

  const {
    data: workingHoursData,
    error,
    isLoading,
    refetch,
  } = useFetch("workingHours", getAllWorkingHours);

  useEffect(() => {
    if (!error) {
      setDataServer(workingHoursData);
    }
  }, [workingHoursData, error]);

  const mutation = useMutation({
    mutationFn: (data) => createWorkingHours(data as any),
    onSuccess: () => {
      toast.success("Appointment created successfully");
      refetch();
      setData({
        startTime: "",
        endTime: "",
      });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "An error occurred");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      updateWorkingHours(id as any, data as any),
    onSuccess: () => {
      toast.success("Appointment updated successfully");
      refetch();
      setData({
        startTime: "",
        endTime: "",
      });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "An error occurred");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (data) => deleteWorkingHours(data as any),
    onSuccess: () => {
      toast.success("Appointment deleted successfully");
      refetch();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "An error occurred");
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (data.startTime === "") {
      toast.error("Start Time is required");
      return;
    }
    if (data.endTime === "") {
      toast.error("End Time is required");
      return;
    }
    mutation.mutate(data as any);
  };

  const handleDeleteClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    data: any,
  ) => {
    e.preventDefault();
    deleteMutation.mutate(data as any);
  };

  const handleUpdateClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (data.startTime === "") {
      toast.error("Start Time is required");
      return;
    }
    if (data.endTime === "") {
      toast.error("End Time is required");
      return;
    }

    if (idZ) {
      updateMutation.mutate({
        id: idZ,
        data: {
          startTime: data.startTime.slice(0, 5),
          endTime: data.endTime.slice(0, 5),
        },
      });
    }
    setDeleteData();
  };

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
          <WorkingHours
            handleInputChange={handleInputChange}
            handleUpdateClick={handleUpdateClick}
            handleClick={handleClick}
            isLoading={isLoading}
            endTime={data.endTime}
            startTime={data.startTime}
          />
        </div>
        <div className="h-1 bg-black md:hidden"></div>
        <div className="flex-grow">
          <WorkingHourList
            handleDeleteClick={handleDeleteClick}
            dataServer={dataServer}
          />
        </div>
      </div>
      {/* <HomePageTable /> */}
    </div>
  );
};

export default Page;
