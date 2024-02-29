"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLoginMutation } from "@/hooks/useLogin";
import { auth } from "@/services/api";
import { setCookie } from "cookies-next";
import { login } from "@/types/login";
// import { redirect } from "next/dist/server/api-utils";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Spinner from "@/components/common/Spinner";

type FormData = {
  username: string;
  password: string;
};

const schema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const mutation = useLoginMutation(auth);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data: login) => {
    try {
      const result: any = await mutation.mutateAsync(data as never);
      const token = result?.data?.data?.token;
      const user = result?.data?.data?.account;
      setCookie("admin", JSON.stringify({ token, user } as any));
      // localStorage.setItem("admin", JSON.stringify({ token, user } as any));
      router.replace("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-auto flex-col items-center justify-start gap-10 rounded-xl border-4 border-accent bg-secondary p-3 md:w-[40vw]"
      >
        <div className="mb-4 text-4xl font-bold text-white">LOGIN</div>
        <div className="w-full px-10">
          <input
            {...register("username")}
            className="h-[40px] w-full rounded-lg p-3 text-xl text-gray-500"
            placeholder="Username"
            type="text"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
        </div>
        <div className="w-full px-10">
          <input
            {...register("password")}
            className="h-[40px] w-full rounded-lg p-3 text-xl text-gray-500"
            placeholder="Password"
            type="password"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div className="mb-3 mt-5 flex w-full justify-between px-10">
          <button
            type="button"
            className="h-[40px] w-[90px] rounded-lg bg-white hover:border-2 hover:border-green-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex h-[40px] w-[90px] items-center justify-center rounded-lg bg-white text-center hover:border-2 hover:border-green-300"
          >
            {mutation.isPending ? <Spinner sm /> : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
