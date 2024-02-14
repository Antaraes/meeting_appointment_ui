"use client";

import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useModalStatusStore } from "@/store/modalStatusStore";
import { useAppointmentSlice } from "@/store/Appointment/zustand";
import { useAppointmentMutation } from "@/hooks/useAppointment";
import { createAppointment, getDepartment, getRoom } from "@/services/api";
import toast from "react-hot-toast";
import { format } from "date-fns"; // Import format function from date-fns library
import { enGB } from "date-fns/locale";
import useFetch from "@/hooks/useFetch";
import dayjs from "dayjs";
interface IFormInput {
  departmentId: string;
  roomId: string;
  staffId: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  code: string;
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
  code: z.string().min(1, { message: "Code must be filled." }),
});

export default function AppointmentForm() {
  const modalStatusStore = useModalStatusStore();
  const { data: department } = useFetch("department", getDepartment);
  const { data: room } = useFetch("room", getRoom);
  const { register, handleSubmit, formState, trigger } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });
  const { appointmentByRoomId } = useAppointmentSlice();
  console.log(room);
  const mutation = useAppointmentMutation(createAppointment);

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    const formattedDate = data.date + "T00:00:00.000Z";
    const newData = { ...data, date: formattedDate };
    console.log(newData);
    mutation.mutate(data);
  };

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
          {department?.data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
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
          {room?.data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {formState.errors?.roomId && (
          <p className="mb-5 text-red-500">
            {formState.errors?.roomId.message}
          </p>
        )}
        <input
          {...register("staffId")}
          type="number"
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
          {...register("startTime", { required: true })}
          min="09:00"
          max="17:00"
          step="600"
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
          placeholder="End Time"
          className="mb-5 h-[50px] w-full rounded-md px-2 shadow-md"
        />
        {formState.errors?.endTime && (
          <p className="mb-5 text-red-500">
            {formState.errors?.endTime.message}
          </p>
        )}
        <input
          type="text"
          {...register("code")}
          placeholder="code"
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
