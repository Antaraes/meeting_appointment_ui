import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useLoginMutation = (mutationFn: any) => {
  return useMutation({
    mutationFn: (data) => {
      console.log("🚀 ~ useLoginMutation ~ data:", data);
      return mutationFn(data);
    },
    onSuccess: () => {
      toast.success("Login successful");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "An error occurred");
    },
  });
};
