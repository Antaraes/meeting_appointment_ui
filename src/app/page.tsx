"use client";

import RoomCard from "@/components/RoomCard";
import HomePageTable from "@/components/home/HomePageTable";
import useFetch from "@/hooks/useFetch";
import { getAllRooms } from "@/services/api";
import { Room } from "@/types/room";
import Skeleton from "react-loading-skeleton";
import React from "react";

export default function Home() {
  const { data, error, isLoading } = useFetch("room", getAllRooms);
  // console.log("🚀 ~ Home ~ data:", data?.data[0]?.id, typeof data?.data[0]?.id);

  return (
    <div>
      <div className=" px-5 pt-5 md:px-10">
        <div className="grid grid-cols-1 gap-2  border-b border-secondary/30 pb-10 min-[637px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array(4)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    role="status"
                    className="card w-full min-w-72 max-w-sm animate-pulse bg-gray-200 transition-all duration-300 ease-in-out hover:-translate-y-1 dark:bg-gray-700"
                  >
                    <div className="mb-4 h-4 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <span className="sr-only">Loading...</span>
                  </div>
                ))
            : // Render actual content if data is loaded
              data?.data?.map((room: Room) => (
                <RoomCard
                  key={room.id}
                  roomId={room.id}
                  name={room.name}
                  description={room.description}
                />
              ))}
        </div>

        <div className="mt-5">
          <HomePageTable />
        </div>
      </div>
    </div>
  );
}
