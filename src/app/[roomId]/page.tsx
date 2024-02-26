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

  // Check if roomId is an array and take the first element if it is
  const id = Array.isArray(roomId) ? roomId[0] : roomId;

  // Parse id as an integer
  const roomIdInt = parseInt(id, 10);
  const { setAppointmentRoomById } = useAppointmentSlice();
  const { data, refetch, isLoading, isSuccess } = useFetch(
    "getAppointmentByRoomId",
    () => getAppointmentByRoomID(roomIdInt),
  );

  useEffect(() => {
    if (data) {
      setAppointmentRoomById(data);
    }
  }, [data]);
  console.log("Appointment", data);

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return <Sidebar />;
};

export default Page;
