"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useModalStatusStore } from "@/store/modalStatusStore";
import { useAppointmentSlice } from "@/store/Appointment/zustand";
interface IFormInput {
  departmentId: string;
  roomId: string;
  staffId: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
}

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const schema = z.object({
  departmentId: z.string().min(1, { message: "Department must be selected." }),
  roomId: z.string().min(1, { message: "Room must be selected." }),
  staffId: z.string().min(1, { message: "Staff Id must be filled." }),
  description: z.string().min(1, { message: "Description must be filled." }),
  date: z.string().min(1, { message: "Date must be filled." }),
  startTime: z.string().min(1, { message: "Start time must be filled." }),
  endTime: z.string().min(1, { message: "End time must be filled." }),
});

export default function AppointmentForm() {
  const modalStatusStore = useModalStatusStore();
  const { register, handleSubmit, formState, trigger } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });
  const { appointmentByRoomId } = useAppointmentSlice();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[500px] overflow-y-auto px-2 md:max-h-[400px]"
      >
        <div className="algn my-5 flex items-center justify-between px-2">
          <button
            onClick={modalStatusStore.setDefault}
            type="button"
            className="rounded-md p-2 font-bold text-text-black md:bg-gray-500 md:text-gray-50"
          >
            Cancel
          </button>
          <h4 className="font-bold md:text-lg">New Appointment</h4>
          <button
            type="submit"
            className="rounded-md p-2 font-bold text-text-black md:bg-green-600 md:text-gray-50"
          >
            Add
          </button>
        </div>
        <select
          {...register("departmentId")}
          className="mb-5 h-[50px] w-full rounded-md px-2 shadow-md "
        >
          <option value="">Select Department</option>
          <option value="1">D-1</option>
          <option value="2">D-2</option>
        </select>
        {formState.errors?.departmentId && (
          <p className="mb-5 text-red-500">
            {formState.errors?.departmentId.message}
          </p>
        )}
        <select
          {...register("roomId")}
          className="mb-5 h-[50px] w-full rounded-md px-2 shadow-md"
        >
          <option value="">Select Room</option>
          <option value="1">R-1</option>
          <option value="2">R-2</option>
        </select>
        {formState.errors?.roomId && (
          <p className="mb-5 text-red-500">
            {formState.errors?.roomId.message}
          </p>
        )}
        <input
          {...register("staffId")}
          placeholder="Staff Id"
          className="mb-5 h-[50px] w-full rounded-md px-2 shadow-md"
        />
        {formState.errors?.staffId && (
          <p className="mb-5 text-red-500">
            {formState.errors?.staffId.message}
          </p>
        )}
        <textarea
          {...register("description")}
          placeholder="Description"
          className="mb-5 h-[50px] w-full rounded-md px-2 shadow-md"
        />
        {formState.errors?.description && (
          <p className="mb-5 text-red-500">
            {formState.errors?.description.message}
          </p>
        )}
        <input
          type="date"
          {...register("date")}
          placeholder="Date"
          className="mb-5 h-[50px] w-full rounded-md px-2 shadow-md"
          min={getCurrentDate()}
        />

        {formState.errors?.date && (
          <p className="mb-5 text-red-500">{formState.errors?.date.message}</p>
        )}
        <input
          type="time"
          {...register("startTime")}
          placeholder="Start Time"
          className="mb-5 h-[50px] w-full rounded-md px-2 shadow-md"
        />

        {formState.errors?.startTime && (
          <p className="mb-5 text-red-500">
            {formState.errors?.startTime.message}
          </p>
        )}
        <input
          type="time"
          {...register("endTime")}
          placeholder="Start Time"
          className="mb-5 h-[50px] w-full rounded-md px-2 shadow-md"
        />
        {formState.errors?.endTime && (
          <p className="mb-5 text-red-500">
            {formState.errors?.endTime.message}
          </p>
        )}
      </form>
    </div>
  );
}
