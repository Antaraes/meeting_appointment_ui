import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateAppointment } from "@/services/api";

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

  const { mutate } = useMutation({
    mutationFn: (data: any) =>
      updateAppointment({ data, id: event.appointmentData?.id || event.id }),
    onSuccess: () => {
      toast.success("Extended successfully");
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Current End Time: {event.endTime}</p>
        <input
          type="number"
          {...register("endTimeExtension")}
          placeholder="Enter extension in minutes"
        />
        {formState.errors?.endTimeExtension && (
          <p>{formState.errors?.endTimeExtension.message}</p>
        )}
        <button type="submit">Extend End Time</button>
      </form>
    </div>
  );
};

export default ExtendForm;
