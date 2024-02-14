"use client";
import AdminRoom from "@/components/admin/AdminRoom";
import useFetch from "@/hooks/useFetch";
import { getAllRooms } from "@/services/api";
import { Room } from "@/types/room";
import React from "react";

const page = () => {
  const { data, error, isLoading } = useFetch("room", getAllRooms);
  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    console.log("error---", error);
  }

  return (
    <>
      <div className="flex justify-end pr-9 pt-8 lg:pr-16">
        <button className="text-text w-1/3 rounded-2xl bg-accent p-1 font-semibold text-text-white md:w-1/5 lg:w-[15%] ">
          Add
        </button>
      </div>
      <div className="mb-5 grid gap-6 px-8 py-5 min-[400px]:grid-cols-2 min-[642px]:grid-cols-3 min-[821px]:grid-cols-4 min-[1000px]:grid-cols-5 lg:px-16">
        {data &&
          data.data.map((room: Room) => (
            <AdminRoom key={room.id} room={room} />
          ))}
      </div>
    </>
  );
};

export default page;
