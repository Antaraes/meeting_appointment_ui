"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Spinner from "../common/Spinner";
import { AnimatePresence } from "framer-motion";
// function Loading() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     const handleStart = (url: any) => url !== router.asPath && setLoading(true);
//     const handleComplete = (url: any) =>
//       url === router.asPath &&
//       setTimeout(() => {
//         setLoading(false);
//       }, 500);
//     router.events.on("routeChangeStart", handleStart);
//     router.events.on("routeChangeComplete", handleComplete);
//     return () => {
//       router.events.off("routeChangeStart", handleStart);
//       router.events.off("routeChangeComplete", handleComplete);
//     };
//   });
//   return (
//     loading && (
//       <div>
//         <Spinner lg />
//       </div>
//     )
//   );
// }

const Provider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <AnimatePresence>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </AnimatePresence>
      {/* <Loading /> */}
    </>
  );
};

export default Provider;
