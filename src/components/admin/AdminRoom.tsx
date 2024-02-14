"use client";

import { useModalStatusStore } from "@/store/modalStatusStore";
import { Room } from "@/types/room";
import React from "react";
import { FaEdit } from "react-icons/fa";
import RoomForm from "../Form/RoomForm";

const AdminRoom: React.FC<{ room: Room }> = ({ room }) => {
  const modalStatusStore = useModalStatusStore();
  return (
    <div className=" flex h-auto min-h-32 flex-col  rounded-2xl border border-secondary/10 bg-white  p-4 shadow-secondary drop-shadow-xl">
      <div className="mx-auto  text-center">
        <h1 className="  text-xl font-bold text-secondary/90">{room.name}</h1>
        <p className="my-3  text-secondary/[0.65]">{room.description}</p>
      </div>
      <div className="my-auto flex justify-end">
        <FaEdit
          onClick={() =>
            modalStatusStore.setModal({ isOpen: true, Modal: RoomForm })
          }
          size={18}
          className="cursor-pointer text-secondary/70"
        />
      </div>
    </div>
  );
};

export default AdminRoom;
