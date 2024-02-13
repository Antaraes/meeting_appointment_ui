import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function RoomCard() {
  return (
    <div className="card w-full min-w-72 hover:-translate-y-1 transition-all duration-300 ease-in-out">
      <div className="m-0 p-0 hidden md:block">
        <h3 className="text-lg font-bold text-center text-secondary/80">
          Room One
        </h3>

        <p className="text-secondary/60 text-center mt-3">Meeting Room 1</p>
        <Link
          href="/1"
          className="mt-3 hover:bg-[#1b294b] text-center bg-secondary text-text-white mx-auto p-2 text-sm rounded-3xl block w-1/3"
        >
          Schdule
        </Link>
      </div>

      <div className="m-0 w-full p-0 md:hidden flex justify-between items-center">
        <h3 className="text-base font-bold">Room One</h3>
        <h3>
          <FaArrowRight />
        </h3>
      </div>
    </div>
  );
}
