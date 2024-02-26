"use client";
import { useModalStatusStore } from "@/store/modalStatusStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { comparePassCode } from "@/services/api";
import { useParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import AddAppointment from "@/components/Form/AppointmentForm";
import UpadteAppointmentForm from "./UpdateAppointmentForm";
import ExtendForm from "./ExtendForm";

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
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const appointment = event.appointmentData || event;
  console.log(appointment);
  const { roomId } = useParams() || appointment.room.id;
  const { register, handleSubmit, formState, trigger } = useForm<PasscodeForm>({
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: (data) => comparePassCode({ data, id: appointment.id }),
    onSuccess: () => {
      toast.success("Passcode correctly");
      toast(
        (t) => (
          <div className="flex w-[200px] gap-4">
            <button
              onClick={() => {
                modalStatusStore.setModal({
                  isOpen: true,
                  Modal: () => (
                    <UpadteAppointmentForm event={event} password={password} />
                  ),
                });

                toast.dismiss(t.id);
              }}
              type="button"
              className="text-text-[#1b294b] mx-auto mt-3 block  w-full rounded-3xl bg-background p-2 text-center text-sm "
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                modalStatusStore.setModal({
                  isOpen: true,
                  Modal: () => <ExtendForm event={event} password={password} />,
                });

                toast.dismiss(t.id);
              }}
              className="text-text-[#1b294b] mx-auto mt-3 block  w-full rounded-3xl bg-background p-2 text-center text-sm "
            >
              Extend
            </button>
          </div>
        ),
        {
          style: {
            borderRadius: "10px",
            background: "transparent",
          },
        },
      );
    },
    onError: async (error: any) => {
      toast.error(error.response.data.message || "An error occurred");
    },
  });

  const onSubmit: SubmitHandler<PasscodeForm> = (data: any) => {
    console.log(data);
    setPassword(data.code);
    mutate(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[500px] overflow-y-auto px-2 py-4 md:max-h-[400px]"
      >
        <p className="my-4 text-xl font-bold">Confrim Meeting Passcode</p>
        <input
          type="text"
          {...register("code")}
          placeholder="code"
          className="mx-auto mb-5 h-[50px] w-[80%] rounded-md px-2 shadow-md"
        />
        {formState.errors?.code && (
          <p className="mb-5 text-red-500">{formState.errors?.code.message}</p>
        )}
        <div className="algn  flex items-center  justify-between px-2 md:justify-around">
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
