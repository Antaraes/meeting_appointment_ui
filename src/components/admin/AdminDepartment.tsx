"use client";

import { useModalStatusStore } from "@/store/modalStatusStore";
import React from "react";
import { FaEdit } from "react-icons/fa";
import RoomForm from "../Form/RoomForm";
import { Department } from "@/types/department";
import DepartmentForm from "../Form/DepartmentForm";

const AdminDepartment: React.FC<{ department: Department }> = ({ department }) => {
  const modalStatusStore = useModalStatusStore();
  return (
    <div className=" flex h-auto min-h-32 flex-col  rounded-2xl border border-secondary/10 bg-white  p-4 shadow-secondary drop-shadow-xl">
      <div className="mx-auto  text-center">
        <h1 className="  text-xl font-bold text-secondary/90">{department.name}</h1>
        <p className="my-3  text-secondary/[0.65]">{department.description}</p>
      </div>
      <div className="my-auto flex justify-end">
        <FaEdit
          onClick={() =>
            modalStatusStore.setModal({
              isOpen: true,
              Modal: () => <DepartmentForm department={department} isCreating={false} />,
            })
          }
          size={18}
          className="cursor-pointer text-secondary/70"
        />
      </div>
    </div>
  );
};

export default AdminDepartment;
