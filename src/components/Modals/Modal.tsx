"use client";

import { useModalStatusStore } from "@/store/modalStatusStore";
import React from "react";

export default function Modal() {
  const modalStatusStore = useModalStatusStore();
  return (
    <>
      {modalStatusStore.formModal.isOpen && (
        <div
          onClick={() => modalStatusStore.setModal({ isOpen: false })}
          className="fixed left-0 top-0 z-0 flex h-screen w-screen items-center justify-center bg-gray-800/25"
        >
          <div
            onClick={(e: any) => e.stopPropagation()}
            className="z-50 w-[95%] rounded-md bg-gray-50 p-2 text-center sm:w-[80%] md:w-[50%] lg:w-[40%]"
          >
            <modalStatusStore.formModal.Modal />
          </div>
        </div>
      )}
    </>
  );
}
