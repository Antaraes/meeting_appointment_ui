import React from "react";
import { FaArrowRight } from 'react-icons/fa';

export default function RoomCard() {
  return (
    <div className="card w-72">
      <div className="m-0 p-0 hidden md:block">
        <h3 className="text-[15px] font-bold text-center">Room One</h3>
        <div className="flex justify-around items-center mt-3">
          <button className="rounded-xl bg-detail text-text-white px-3 py-1 text-[12px] hover:bg-opacity-75 active:bg-opacity-75">
            Detail
          </button>
          <button className="rounded-xl bg-secondary text-text-white px-3 py-1 text-[12px] hover:bg-opacity-75 active:bg-opacity-75">
            Book
          </button>
        </div>
      </div>

      <div className="m-0 p-0 md:hidden flex justify-between items-center">
        <h3 className="text-[15px] font-bold">Room One</h3>
        <h3><FaArrowRight /></h3>
      </div>
    </div>
  );
}
