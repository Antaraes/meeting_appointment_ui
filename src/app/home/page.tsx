import RoomCard from "@/components/RoomCard";
import NavBar from "@/components/clientLayOut/NavBar";
import HomePageTable from "@/components/home/HomePageTable";
import React from "react";

export default function Home() {
  return (
    <div>
      <NavBar />

      <div className=" pt-5 px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 pb-10 border-b border-secondary">
          <div className="m-auto">
          <RoomCard />
          </div>
          <div className="m-auto">
          <RoomCard />
          </div>
          <div className="m-auto">
          <RoomCard />
          </div>
          <div className="m-auto">
          <RoomCard />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1">
            <HomePageTable />
        </div>
      </div>
    </div>
  );
}
