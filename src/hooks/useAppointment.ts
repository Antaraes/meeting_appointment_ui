import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAppointmentMutation = (mutationFn: any) => {
  return useMutation({
    mutationFn: (data) => mutationFn(data),
    onSuccess: (response: any) => {
      console.log("It's work");

      // if (response.status === 201) {
      //     setTimeout(() => {
      //         toast.success("Add blog successful");
      //         router.navigate("/user/profile");
      //     }, 800);
      // }
      // if (response.status === "success") {
      //     switch (true) {
      //         case response.message === "Delete blog successful":
      //             router.navigate("/user/profile");
      //             break;
      //         case response.message === "Update blog status successful":
      //             router.navigate(nextPage);
      //             break;
      //         default:
      //             break;
      //     }
      //     toast.success(response.message);
      // }
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSettled: () => {
      // QueryClient.invalidateQueries("create");
    },
  });
};
