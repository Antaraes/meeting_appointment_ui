"use client";
import Sidebar from "@/components/Appointment/Sidebar";
import SmallCalendar from "@/components/Appointment/SmallCalendar";
import TimeLine from "@/components/TimeLine";
import { useParams } from "next/navigation";
import { FC } from "react";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { roomId } = useParams();
  return <Sidebar />;
};

export default Page;
