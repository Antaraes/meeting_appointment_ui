"use client";
import DepartmentForm from "@/components/Form/DepartmentForm";
import RoomForm from "@/components/Form/RoomForm";
import AdminDepartment from "@/components/admin/AdminDepartment";
import AdminRoom from "@/components/admin/AdminRoom";
import useFetch from "@/hooks/useFetch";
import { getDepartment } from "@/services/api";
import { useModalStatusStore } from "@/store/modalStatusStore";
import { Department } from "@/types/department";
import { Room } from "@/types/room";
import React from "react";

const page = () => {
  const { data, error, isLoading } = useFetch("department", getDepartment);

  const modalStatusStore = useModalStatusStore();
  return (
    <>
      <div className="flex justify-end pr-9 pt-8 lg:pr-16">
        <button
          onClick={() =>
            modalStatusStore.setModal({
              isOpen: true,
              Modal: () => <DepartmentForm isCreating={true} />,
            })
          }
          className="text-text w-1/3 rounded-2xl bg-accent p-1 font-semibold text-text-white md:w-1/5 lg:w-[15%] "
        >
          Add
        </button>
      </div>
      <div className="mb-5 grid gap-6 px-8 py-5 min-[400px]:grid-cols-2 min-[642px]:grid-cols-3 min-[821px]:grid-cols-4 min-[1000px]:grid-cols-5 lg:px-16">
        {data &&
          data.data.map((department: Department) => (
            <AdminDepartment key={department.id} department={department} />
          ))}
      </div>
    </>
  );
};

export default page;
