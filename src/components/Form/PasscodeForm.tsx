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
  const { roomId } = useParams();
  console.log(typeof roomId);
  const { register, handleSubmit, formState, trigger } = useForm<PasscodeForm>({
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: (data) =>
      comparePassCode({ data, id: event.appointmentData.id }),
    onSuccess: () => {
      toast(
        (t) => (
          <div className="flex bg-white">
            <p>Authorized successfully into Appointment</p>
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
              className="mb-2 me-2 rounded-lg bg-gradient-to-r from-teal-200 to-lime-200 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:outline-none focus:ring-4 focus:ring-lime-200 dark:focus:ring-teal-700"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                modalStatusStore.setModal({
                  isOpen: true,
                  Modal: AddAppointment,
                });

                toast.dismiss(t.id);
              }}
              className="mb-2 me-2 rounded-lg bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-red-100 dark:focus:ring-red-400"
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
  });

  const onSubmit: SubmitHandler<PasscodeForm> = (data: PasscodeForm) => {
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
