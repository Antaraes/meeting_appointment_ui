import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function RoomCard() {
  return (
    <Link
      href="/1"
      className="card w-full min-w-72 hover:-translate-y-1 transition-all duration-300 ease-in-out"
    >
      <div className="m-0 p-0 hidden md:block">
        <h3 className="text-lg font-bold text-center text-secondary/80">
          Room One
        </h3>
        <div className="flex justify-around items-center mt-3">
          <p className="text-secondary/60">Meeting Room 1</p>
        </div>
      </div>

      <div className="m-0 w-full p-0 md:hidden flex justify-between items-center">
        <h3 className="text-base font-bold">Room One</h3>
        <h3>
          <FaArrowRight />
        </h3>
      </div>
    </Link>
  );
}
