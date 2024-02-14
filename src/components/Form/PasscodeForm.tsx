"use client";
import { useModalStatusStore } from "@/store/modalStatusStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { comparePassCode } from "@/services/api";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AddAppointment from "@/components/Form/AppointmentForm";

interface PasscodeFormProps {
  event: any;
}

interface PasscodeForm {
  code: string;
}
const schema = z.object({
  code: z.string().min(1, { message: "Code must be filled." }),
});

const PasscodeForm: FC<PasscodeFormProps> = ({ event }) => {
  const modalStatusStore = useModalStatusStore();

  const router = useRouter();
  const { roomId } = useParams();
  console.log(typeof roomId);
  const { register, handleSubmit, formState, trigger } = useForm<PasscodeForm>({
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: (data) =>
      comparePassCode({ data, id: event.appointmentData.id }),
    onSuccess: () => {
      modalStatusStore.setModal({
        isOpen: true,
        Modal: AddAppointment,
      });

      toast.success("Authorized successfully into Appointment");
    },
  });

  const onSubmit: SubmitHandler<PasscodeForm> = (data: PasscodeForm) => {
    console.log(data);
    mutate(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[500px] overflow-y-auto px-2 md:max-h-[400px]"
      >
        <input
          type="text"
          {...register("code")}
          placeholder="code"
          className="mb-5 h-[50px] w-full rounded-md px-2 shadow-md"
        />
        {formState.errors?.code && (
          <p className="mb-5 text-red-500">{formState.errors?.code.message}</p>
        )}
        <div className="algn my-5 flex items-center justify-between px-2">
          <button
            onClick={modalStatusStore.setDefault}
            type="button"
            className="rounded-md p-2 font-bold text-text-black md:bg-gray-500 md:text-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-md p-2 font-bold text-text-black md:bg-green-600 md:text-gray-50"
          >
            Confrim
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasscodeForm;
