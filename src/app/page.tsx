import RoomCard from "@/components/RoomCard";
import HomePageTable from "@/components/home/HomePageTable";
import React from "react";

export default function Home() {
  return (
    <div>
      <div className=" pt-5 px-5 md:px-10">
        <div className="grid grid-cols-1 min-[637px]:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-2 pb-10 border-b border-secondary/30">
          {Array.from({ length: 4 }, (_, index) => (
            <RoomCard key={index} />
          ))}
        </div>

        <div className="mt-5">
          <HomePageTable />
        </div>
      </div>
    </div>
  );
}
