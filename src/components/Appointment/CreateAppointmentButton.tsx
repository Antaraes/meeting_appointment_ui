"use client";
import React, { useContext } from "react";
import plusImg from "@/assets/plus.svg";
import Image from "next/image";
import { useParams } from "next/navigation";
import BreadCrumbs from "./BreadCrumbs";
import { useModalStatusStore } from "@/store/modalStatusStore";
import AddAppointment from "@/components/Form/AppointmentForm";
import useFetch from "@/hooks/useFetch";
import { getRoomById } from "@/services/api";
// import GlobalContext from "../context/GlobalContext";
export default function CreateEventButton() {
  const { roomId } = useParams();
  const modalStatusStore = useModalStatusStore();
  // Check if roomId is an array and take the first element if it is
  const id = Array.isArray(roomId) ? roomId[0] : roomId;

  // Parse id as an integer
  const roomIdInt = parseInt(id, 10);

  const { data, isLoading } = useFetch("roomByID", () =>
    getRoomById(roomIdInt),
  );
  if (isLoading) {
    return <h1>Loading</h1>;
  }

  //   const { setShowEventModal } = useContext(GlobalContext);
  return (
    <div className="flex items-center justify-between">
      <BreadCrumbs roomName={data.data.name} />
      <button
        onClick={() =>
          modalStatusStore.setModal({ isOpen: true, Modal: AddAppointment })
        }
        className="my-2 flex  items-center rounded-full border bg-accent shadow-md hover:shadow-2xl"
      >
        <span className="p-2 text-white"> Get Appointment</span>
      </button>
    </div>
  );
}
