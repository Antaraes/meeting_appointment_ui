import { useModalStatusStore } from "@/store/modalStatusStore";
import React from "react";

const RoomForm = () => {
  const modalStatusStore = useModalStatusStore();
  return (
    <form className="flex h-80 flex-col gap-2">
      <h3 className="text-2xl font-semibold tracking-tight text-secondary/80">
        Update Room
      </h3>

      <div className="mt-10 grid grid-cols-2 gap-y-10">
        <label className="mx-10 inline-flex items-center bg-transparent text-start font-semibold text-secondary/80 lg:mx-16 min-[1170px]:mx-24 ">
          Name
        </label>
        <input
          type="text "
          placeholder="Room Name"
          className="mr-4 border-b-2 border-secondary/70 bg-transparent p-1 font-semibold text-secondary/70 outline-none placeholder:font-medium"
        />

        <label className="mx-10 inline-flex items-center bg-transparent text-start font-semibold text-secondary/80 lg:mx-16 min-[1170px]:mx-24 ">
          Description
        </label>
        <input
          type="text "
          placeholder="Room Description"
          className="mr-4 border-b-2 border-secondary/70 bg-transparent p-1 font-semibold text-secondary/70 outline-none placeholder:font-medium"
        />
      </div>
      <div className="mx-6 mt-16 flex justify-between sm:mx-12 md:mx-16 ">
        <button
          onClick={() => modalStatusStore.setDefault()}
          className="rounded-2xl bg-secondary/10 px-4 py-2 text-sm font-semibold sm:text-base"
        >
          Cancel
        </button>
        <button className="rounded-2xl bg-accent  px-4 py-2 text-sm font-semibold text-text-white sm:text-base">
          Update
        </button>
      </div>
    </form>
  );
};

export default RoomForm;
