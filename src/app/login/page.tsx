"use client"
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type FormData = {
  username: string;
  password: string;
};

const schema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center bg-white w-screen h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-start items-center gap-10 md:w-[40vw] h-auto p-3 border-4 border-accent bg-secondary rounded-xl">
        <div className="text-white text-4xl font-bold mb-4">LOGIN</div>
        <div className="w-full px-10">
          <input {...register('username')} className="w-full h-[40px] rounded-lg text-gray-500 text-xl p-3" placeholder="Username" type="text" />
          {errors.username && <span className="text-red-500">{errors.username.message}</span>}
        </div>
        <div className="w-full px-10">
          <input {...register('password')} className="w-full h-[40px] rounded-lg text-gray-500 text-xl p-3" placeholder="Password" type="password" />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>
        <div className="w-full flex justify-between px-10 mt-5 mb-3">
          <button type="button" className="w-[90px] h-[40px] bg-white hover:border-2 hover:border-green-300 rounded-lg">Back</button>
          <button type="submit" className="w-[90px] h-[40px] bg-white hover:border-2 hover:border-green-300 rounded-lg">Login</button>
        </div>
      </form>
    </div>
  );
}
