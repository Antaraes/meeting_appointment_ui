import React from "react";

const WorkingHours = () => {
  return (
    <div className="my-5 flex flex-col gap-5">
      <div className="mx-auto flex flex-col gap-2">
        <label htmlFor="start" className="text-black">
          Start Working hour
        </label>
        <input
          type="number"
          name="start"
          className="w-[250px] border border-black px-2 py-1 "
          placeholder="Start Time..."
        />
      </div>
      <div className="mx-auto flex flex-col gap-2">
        <label htmlFor="end" className="text-black">
          Finishe Working hour
        </label>
        <input
          type="number"
          name="end"
          className="w-[250px] border border-black px-2 py-1 "
          placeholder="End Time..."
        />
      </div>
      <div className="flex justify-center">
        <button className="w-[100px] bg-gray-400 px-3 py-1 border border-black text-black">submit</button>
      </div>
    </div>
  );
};

export default WorkingHours;
