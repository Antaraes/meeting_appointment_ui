"use client";
import { useModalStatusStore } from "@/store/modalStatusStore";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Room as ParamRoom } from "../../types/room";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRoom, updateRoom } from "@/services/api";
import toast from "react-hot-toast";

type Room = {
  name: string;
  description: string;
};

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name Should be At Least 3 words" })
    .max(50, { message: "Name should be less than 50 words" })
    .trim(),
  description: z
    .string()
    .min(3, { message: "Description Should be At Least 3 words" })
    .max(200, { message: "Description should be less than 50 words" })
    .trim(),
});

const RoomForm: React.FC<{ room?: ParamRoom; isCreating: boolean }> = ({
  room,
  isCreating,
}) => {
  const queryClient = useQueryClient();

  const modalStatusStore = useModalStatusStore();
  const { mutate } = useMutation({
    mutationFn: isCreating
      ? (data: ParamRoom) => addRoom(data)
      : ({ id, data }: { id: number; data: ParamRoom }) => updateRoom(id, data),
    onSuccess: () => {
      toast.success(
        isCreating ? "Room Created Successfully" : "Room Updated Successfully",
      );
      modalStatusStore.setDefault();
      queryClient.refetchQueries("rooms");
    },
    onError: () => toast.error("Something went wrong"),
  });

  const { register, handleSubmit, formState, getValues } = useForm<Room>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Room> = () => {
    const formData = getValues();
    if (isCreating) {
      return;
    }
    mutate({
      id: room?.id,
      data: { ...formData },
    });
  };

  return (
    <form
      className="flex h-auto min-h-80 flex-col gap-2 overflow-x-hidden"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-2xl font-semibold tracking-tight text-secondary/80">
        Update Room
      </h3>

      <div className="mt-10 grid grid-cols-2 gap-y-10">
        <label className="mx-10 inline-flex items-center bg-transparent text-start font-semibold text-secondary/80 lg:mx-16 min-[1170px]:mx-24 ">
          Name
        </label>
        <div className="flex flex-col">
          <input
            {...register("name")}
            type="text "
            defaultValue={room?.name ?? ""}
            placeholder="Room Name"
            className="w-[85%] border-b-2 border-secondary/70 bg-transparent p-1 font-semibold text-secondary/70 outline-none placeholder:font-medium"
          />
          {formState.errors?.name && (
            <p className="mt-2 pr-3 text-start text-xs text-red-500">
              {formState.errors?.name.message}
            </p>
          )}
        </div>

        <label className="mx-10 inline-flex items-center bg-transparent text-start font-semibold text-secondary/80 lg:mx-16 min-[1170px]:mx-24 ">
          Description
        </label>
        <div className="flex flex-col">
          <input
            {...register("description")}
            type="text "
            defaultValue={room?.description ?? ""}
            placeholder="Room Description"
            className="w-[85%] border-b-2 border-secondary/70 bg-transparent p-1 font-semibold text-secondary/70 outline-none placeholder:font-medium"
          />
          {formState.errors?.description && (
            <p className="mt-2 pr-3 text-start text-xs text-red-500">
              {formState.errors?.description.message}
            </p>
          )}
        </div>
      </div>
      <div className="mx-6 mb-6 mt-16 flex justify-between sm:mx-12 md:mx-16 ">
        <button
          onClick={() => modalStatusStore.setDefault()}
          className="rounded-2xl bg-secondary/10 px-4 py-2 text-sm font-semibold sm:text-base"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-2xl bg-accent  px-4 py-2 text-sm font-semibold text-text-white sm:text-base"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default RoomForm;
