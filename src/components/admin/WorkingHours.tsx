import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useWorkingHoursSlice } from "@/store/WorkingHoursZustand";

const WorkingHours = ({
  handleInputChange,
  handleClick,
  isLoading,
  endTime,
  startTime,
  handleUpdateClick,
}: {
  handleInputChange: any;
  handleClick: any;
  isLoading: any;
  endTime: any;
  startTime: any;
  handleUpdateClick: any;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isEdit, startTimeZ, endTimeZ } = useWorkingHoursSlice();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    isEdit ? handleUpdateClick(e) : handleClick(e);
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="my-5 flex flex-col gap-5">
        <div className="mx-auto flex flex-col gap-2">
          <label
            htmlFor="startTime"
            className="font-semibold text-secondary/90"
          >
            Start Working hour
          </label>
          <input
            type="time"
            name="startTime"
            className="w-[250px] border border-secondary px-2 py-1 "
            placeholder="Start Time..."
            onBlur={(e) => handleInputChange(e)}
            defaultValue={startTimeZ ?? ""}
          />
        </div>
        <div className="mx-auto flex flex-col gap-2">
          <label htmlFor="endTime" className="font-semibold text-secondary/90">
            Finish Working hour
          </label>
          <input
            type="time"
            name="endTime"
            className="w-[250px] border border-black px-2 py-1 "
            placeholder="End Time..."
            onBlur={(e) => handleInputChange(e)}
            defaultValue={endTimeZ ?? ""}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="w-[100px] border border-black bg-gray-400 px-3 py-1 text-black"
          >
            {isEdit ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default WorkingHours;
