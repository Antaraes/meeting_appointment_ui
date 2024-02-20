import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateWorkingMutation = (Mutation: any) => {
  return useMutation({
    mutationFn: (data) => Mutation(data),
    onSuccess: () => {
        toast.success("Working created successfully");
      },
      onError: (error: any) => {
        toast.error(error.response.data.message || "An error occurred");
      },
  });
};
