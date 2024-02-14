"use client";
import Sidebar from "@/components/Appointment/Sidebar";
import SmallCalendar from "@/components/Appointment/SmallCalendar";
import TimeLine from "@/components/TimeLine";
import useFetch from "@/hooks/useFetch";
import { getAllAppointment, getAppointmentByRoomID } from "@/services/api";
import { useAppointmentSlice } from "@/store/Appointment/zustand";
import { useParams } from "next/navigation";
import { FC, useEffect } from "react";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { roomId } = useParams();
  const id = parseInt(roomId, 10);
  const { setAppointmentRoomById } = useAppointmentSlice();
  const { data, refetch, isLoading, isSuccess } = useFetch(
    "getAppointmentByRoomId",
    () => getAppointmentByRoomID(id),
  );

  useEffect(() => {
    if (data) {
      setAppointmentRoomById(data);
    }
  }, [data]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return <Sidebar />;
};

export default Page;
