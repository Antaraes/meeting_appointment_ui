"use client";
import React, { useContext } from "react";
import plusImg from "@/assets/plus.svg";
import Image from "next/image";
import { useParams } from "next/navigation";
// import GlobalContext from "../context/GlobalContext";
export default function CreateEventButton() {
  const { roomId } = useParams();
  //   const { setShowEventModal } = useContext(GlobalContext);
  return (
    <div className="flex justify-between items-center">
      <p className="font-bold">{roomId}</p>
      <button
        //   onClick={() => setShowEventModal(true)}
        className="border bg-accent  my-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
      >
        <span className="text-white p-2"> Get Appointment</span>
      </button>
    </div>
  );
}
