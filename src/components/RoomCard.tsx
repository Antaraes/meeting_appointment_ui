import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

type RoomCardProps = {
  roomId?: number;
  name: string;
  description: string;
};

const RoomCard: React.FC<RoomCardProps> = ({ roomId, name, description }) => {
  return (
    <div className="card w-full min-w-72 transition-all duration-300 ease-in-out hover:-translate-y-1">
      <div className="m-0 hidden p-0 md:block">
        <h3 className="text-center text-lg font-bold text-secondary/80">
          {name}
        </h3>

        <p className="mt-3 text-center text-secondary/60">{description}</p>
        <Link
           href={`${roomId}`}
          className="mx-auto mt-3 block w-1/3 rounded-3xl bg-secondary p-2 text-center text-sm text-text-white hover:bg-[#1b294b]"
        >
          Schdule
        </Link>
      </div>

      <Link
        href="/1"
        className="m-0 flex w-full items-center justify-between p-0 md:hidden"
      >
        <h3 className="text-base font-bold">Room One</h3>
        <h3>
          <FaArrowRight />
        </h3>
      </Link>
    </div>
  );
};

export default RoomCard;
