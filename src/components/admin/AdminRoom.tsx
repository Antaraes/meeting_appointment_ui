import React from "react";
import { FaEdit } from "react-icons/fa";

const AdminRoom = () => {
  return (
    <div className=" flex h-32 flex-col  rounded-2xl border border-secondary/10 bg-white  p-4 shadow-secondary drop-shadow-xl">
      <div className="mx-auto  text-center">
        <h1 className="  text-xl font-bold text-secondary/90">Room 1</h1>
        <p className="my-3  text-secondary/[0.65]">Meeting Room 1</p>
      </div>
      <div className="my-auto flex justify-end">
        <FaEdit size={18} className="cursor-pointer text-secondary/70" />
      </div>
    </div>
  );
};

export default AdminRoom;
