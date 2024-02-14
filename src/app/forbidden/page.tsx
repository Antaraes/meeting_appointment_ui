import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center gap-10">
      <h1 className="text-center text-3xl font-bold">Forbidden</h1>
      <Link
        href={"/"}
        className="block w-1/3 rounded-2xl bg-secondary p-2 text-center text-text-white md:w-1/5 lg:w-1/12"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default page;
