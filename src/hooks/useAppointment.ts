import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAppointmentMutation = (mutationFn: any) => {
  return useMutation({
    mutationFn: (data) => mutationFn(data),
    onSuccess: () => {
      toast.success("Appointment created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "An error occurred");
    },
  });
};
