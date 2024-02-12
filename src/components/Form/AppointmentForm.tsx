'use client'

import ReactDOM from "react-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useModalStatusStore } from "@/store/modalStatusStore";

interface IFormInput {
  departmentId: string
  roomId: string
  staffId: string
  description: string
  date: Date
  startTime: string
  endTime: string
}

const schema = z.object({
  departmentId: z.string().nonempty({ message: "Department must be selected."}),
  roomId: z.string().nonempty({message: "Room must be selected."}),
  staffId: z.string().nonempty({message: "Staff Id must be fill."}),
  description: z.string().nonempty({message: "Description Id must be fill."}),
  date: z.string().nonempty({message: "Date must be fill."}),
  startTime: z.string().nonempty({message: "Start time must be fill."}),
  endTime: z.string().nonempty({message: "End time must be fill."}),
})

export default function AppointmentForm() {
  const modalStatusStore = useModalStatusStore();
  const { register, handleSubmit ,formState, trigger} = useForm<IFormInput>(
    {resolver: zodResolver(schema)}
  )
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}
      className="px-2 max-h-[400px] overflow-y-auto">
        <div className="flex justify-between items-center algn px-2 my-5">
          <button
            onClick={modalStatusStore.setDefault}
            type="button"
            className="bg-gray-500 text-gray-50 p-2 rounded-md"
          >
            Cancel
          </button>
          <h4 className="font-bold md:text-lg">
            New Appointment
          </h4>
          <button
            type="submit"
            className="bg-green-600 text-gray-50 p-2 rounded-md"
          >
            Submit
          </button>
        </div>
        <select {...register("departmentId")} onBlur={() => trigger("departmentId")} onChange={() => trigger("departmentId")}
        className="w-full h-[50px] mb-5 px-2 rounded-md">
          <option value="">Select Department</option>
          <option value="1">D-1</option>
          <option value="2">D-2</option>
        </select>
        {formState.errors?.departmentId && <p className="text-red-500 mb-5">{formState.errors?.departmentId.message}</p>}
        <select {...register("roomId")} onBlur={() => trigger("roomId")} onChange={() => trigger("roomId")}
        className="w-full h-[50px] mb-5 px-2 rounded-md">
          <option value="">Select Room</option>
          <option value="1">R-1</option>
          <option value="2">R-2</option>
        </select>
        {formState.errors?.roomId && <p className="text-red-500 mb-5">{formState.errors?.roomId.message}</p>}
        <input {...register("staffId")} placeholder="Staff Id" onBlur={() => trigger("staffId")} onChange={() => trigger("staffId")}
          className="w-full h-[50px] mb-5 px-2 rounded-md" />
        {formState.errors?.staffId && <p className="text-red-500 mb-5">{formState.errors?.staffId.message}</p>}
        <textarea {...register("description")} placeholder="Description"
          className="w-full h-[50px] mb-5 px-2 rounded-md" />
        {formState.errors?.description && <p className="text-red-500 mb-5">{formState.errors?.description.message}</p>}
        <input type="date" {...register("date")} placeholder="Date"
          className="w-full h-[50px] mb-5 px-2 rounded-md" />
        {formState.errors?.date && <p className="text-red-500 mb-5">{formState.errors?.date.message}</p>}
        <input type="time" {...register("startTime")} placeholder="Start Time"
          className="w-full h-[50px] mb-5 px-2 rounded-md" />
        {formState.errors?.startTime && <p className="text-red-500 mb-5">{formState.errors?.startTime.message}</p>}
        <input type="time" {...register("endTime")} placeholder="Start Time"
          className="w-full h-[50px] mb-5 px-2 rounded-md" />
        {formState.errors?.endTime && <p className="text-red-500 mb-5">{formState.errors?.endTime.message}</p>}
      </form>
    </div>
  )
}