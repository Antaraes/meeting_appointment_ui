import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateAppointment } from "@/services/api";
import { useModalStatusStore } from "@/store/modalStatusStore";
import Spinner from "../common/Spinner";

interface ExtendFormProps {
  event: any;
}

interface ExtendForm {
  endTimeExtension: string;
}

const schema = z.object({
  endTimeExtension: z.string(),
});

const ExtendForm: FC<ExtendFormProps> = ({ event }) => {
  const { register, handleSubmit, formState } = useForm<ExtendForm>({
    resolver: zodResolver(schema),
  });
  const queryClient = useQueryClient();
  const modalStatusStore = useModalStatusStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) =>
      updateAppointment({ data, id: event.appointmentData?.id || event.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAppointmentByRoomId"] });
      toast.success("Extended successfully");
      modalStatusStore.setDefault();
    },
    onError: async (error: any) => {
      toast.error(error.response.data.message || "An error occurred");
    },
  });

  const onSubmit = (data: ExtendForm) => {
    const { endTimeExtension } = data;
    const extensionMinutes = parseInt(endTimeExtension, 10);

    if (isNaN(extensionMinutes)) {
      toast.error("Extension must be a valid number.");
      return;
    }

    const currentEndTime = event.appointmentData?.endTime || event.endTime;
    const [currentHours, currentMinutes] = currentEndTime
      .split(":")
      .map(Number);

    let totalMinutes = currentHours * 60 + currentMinutes + extensionMinutes;

    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;

    const extendedEndTime = `${newHours.toString().padStart(2, "0")}:${newMinutes.toString().padStart(2, "0")}`;

    const newData = {
      endTime: extendedEndTime,
      date: event.appointmentData?.date || event.date,
    };
    mutate(newData);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[500px] overflow-y-auto px-2 py-4 md:max-h-[400px]"
      >
        <p className="my-4 text-xl font-bold">
          Current End Time: {event.appointmentData?.endTime || event.endTime}
        </p>

        <input
          type="number"
          {...register("endTimeExtension")}
          className="mx-auto mb-5 h-[50px] w-[80%] rounded-md px-2 shadow-md"
          placeholder="Enter extension in minutes"
        />
        {formState.errors?.endTimeExtension && (
          <p>{formState.errors?.endTimeExtension.message}</p>
        )}
        <button
          type="submit"
          className="mx-4 rounded-md p-2 font-bold text-text-black md:bg-green-600 md:text-gray-50"
        >
          {isPending ? <Spinner sm /> : "Extend"}
        </button>
      </form>
    </div>
  );
};

export default ExtendForm;
