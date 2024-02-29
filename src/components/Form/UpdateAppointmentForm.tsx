"use client";

import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useModalStatusStore } from "@/store/modalStatusStore";
import { useAppointmentSlice } from "@/store/Appointment/zustand";
import { useAppointmentMutation } from "@/hooks/useAppointment";
import {
  createAppointment,
  getDepartment,
  getAllRooms,
  updateAppointment,
} from "@/services/api";
import toast from "react-hot-toast";
import { format } from "date-fns"; // Import format function from date-fns library
import { enGB } from "date-fns/locale";
import useFetch from "@/hooks/useFetch";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../common/Spinner";
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
  departmentId: z.string().optional(),
  roomId: z.string().optional(),
  staffId: z.string().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  code: z.string().optional(),
});

export default function UpadteAppointmentForm({
  event,
  password,
}: {
  event: any;
  password: string;
}) {
  const modalStatusStore = useModalStatusStore();
  const { data: department } = useFetch("department", getDepartment);
  const { data: room } = useFetch("room", getAllRooms);
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState, trigger } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });
  const mutation = useMutation({
    mutationFn: (data: any) =>
      updateAppointment({ data, id: event.appointmentData?.id || event.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAppointmentByRoomId"] });
      toast.success("updated appointment");
      modalStatusStore.setDefault();
    },
    onError: async (error: any) => {
      toast.error(error.response.data.message || "An error occurred");
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    const formattedDate = data.date + "T00:00:00.000Z";
    const departmentToNumber = parseInt(data.departmentId, 10);

    // Ensure roomId and staffId are valid numbers
    const roomId = parseInt(data.roomId, 10);
    const staffId = parseInt(data.staffId, 10);

    const newData = {
      ...data,
      date: formattedDate,
      roomId: roomId,
      departmentId: departmentToNumber,
      staffId: staffId,
    };

    mutation.mutate(newData);
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
          <h4 className="font-bold md:text-lg">Update Appointment</h4>
          <button
            type="submit"
            className="rounded-md p-2 font-bold text-text-black md:bg-green-600 md:text-gray-50"
          >
            {mutation.isPending ? <Spinner sm /> : "Add"}
          </button>
        </div>
        <select
          {...register("departmentId")}
          defaultValue={
            event.appointmentData?.departmentId || event.department?.id
          }
          className="mb-5 h-[50px] w-full rounded-md px-2 shadow-md "
        >
          <option value="">Select Department</option>
          {department?.data.map((item: any) => (
            <option
              key={item.id}
              value={item.id}
              selected={
                item.id === event.appointmentData?.departmentId ||
                event.department?.id
              }
            >
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
          defaultValue={event.appointmentData?.roomId || event.room?.id}
          className="mb-5 h-[50px] w-full rounded-md px-2 shadow-md"
        >
          <option value="">Select Room</option>
          {room?.data.map((item: any) => (
            <option
              key={item.id}
              value={item.id}
              selected={
                item.id === event.appointmentData?.roomId || event.room?.id
              }
            >
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
          defaultValue={event.appointmentData?.staffId || event.staffId}
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
          defaultValue={event.appointmentData?.description || event.description}
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
          defaultValue={dayjs(
            new Date(event.appointmentData?.date || event.date),
          ).format("YYYY-MM-DD")}
          {...register("date")}
          placeholder="Date"
          className="mb-5  h-[50px] w-full rounded-md px-2 shadow-md"
          min={getCurrentDate()}
        />

        {formState.errors?.date && (
          <p className="mb-5 text-red-500">{formState.errors?.date.message}</p>
        )}
        <input
          type="time"
          defaultValue={event.appointmentData?.startTime || event.startTime}
          {...register("startTime", { required: true })}
          min="09:00"
          max="17:00"
          step="600"
          placeholder="Start Time"
          className="mx-4 mb-5 h-[50px] w-full rounded-md px-2 shadow-md md:mx-0"
        />

        {formState.errors?.startTime && (
          <p className="mb-5 text-red-500">
            {formState.errors?.startTime.message}
          </p>
        )}
        <input
          type="time"
          defaultValue={event.appointmentData?.endTime || event.endTime}
          min="09:00"
          max="17:00"
          step="600"
          {...register("endTime")}
          placeholder="End Time"
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
