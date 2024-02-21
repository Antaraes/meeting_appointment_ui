"use client";
import { activateWorkingHours } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useModalStatusStore } from "@/store/modalStatusStore";

const ActiveWorkingHourConfirm = ({
  workingHourId,
}: {
  workingHourId: number;
}) => {
  const modalStatusStore = useModalStatusStore();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => activateWorkingHours(id),

    onSuccess: () => {
      toast.success("Successfully Activated");
      modalStatusStore.setDefault();
      queryClient.refetchQueries("workingHours");
    },
    onError: (error) => {
      toast.error("Something went wrong");
    },
  });

  return (
    <div className="h-60">
      <h6 className="border-b border-secondary/30 pb-3 text-secondary/60">
        Confirm Model{" "}
      </h6>
      <h1 className="p-3 text-xl font-medium text-secondary">
        Do You Want to Activate This Working Hour ?
      </h1>
      <div className="mt-14 flex items-center justify-end gap-3 font-medium text-text-white lg:mt-20 xl:mt-24">
        <button
          onClick={() => modalStatusStore.setDefault()}
          className="rounded-md bg-gray-400 p-2"
        >
          Cancel
        </button>
        <button
          onClick={() => mutate(workingHourId)}
          className="rounded-md bg-green-600  p-2"
        >
          Activate
        </button>
      </div>
    </div>
  );
};

export default ActiveWorkingHourConfirm;
