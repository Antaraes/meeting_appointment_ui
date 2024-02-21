import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useHolidayMutation = (mutationFn: any, refetchHandler: any) => {
    return useMutation({
        mutationFn: (data) => mutationFn(data),
        onSuccess: () => {
            toast.success("Holiday changes saved successfully");
            setTimeout(() => {
                refetchHandler();
            }, 400)
        },
        onError: (error: any) => {
            toast.error(error.response.data.message || "An error occurred");
        },
    });
};
