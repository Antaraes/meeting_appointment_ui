import { useModalStatusStore } from "@/store/modalStatusStore";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAppointmentMutation = (mutationFn: any) => {
  const modalStatusStore = useModalStatusStore();
  return useMutation({
    mutationFn: ({ id, data }: { id?: number; data: any }) => {
      // Check if id exists, then call the appropriate mutation function
      console.log(id, data);
      if (id !== undefined) {
        return mutationFn(id, data);
      } else {
        return mutationFn(data);
      }
    },

    onSuccess: async () => {
      await toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
        loading: "Saving...",
        success: "<b>Successfully created!</b>",
        error: "<b>Could not save.</b>",
      });
      modalStatusStore.setDefault;
    },
    onError: async (error: any) => {
      toast.error(error.response.data.message || "An error occurred");
    },
  });
};
