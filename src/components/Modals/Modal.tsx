'use client'

import { useModalStatusStore } from '@/store/modalStatusStore'
import React from 'react'

export default function Modal() {
  const modalStatusStore = useModalStatusStore();
  return (
    <>
      {modalStatusStore.formModal.isOpen && (
        <div
          onClick={() => modalStatusStore.setModal({ isOpen: false })}
          className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-gray-800/25 z-0"
        >
          <div onClick={(e:any) => e.stopPropagation()} className="w-[95%] sm:w-[80%] md:w-[50%] lg:w-[40%] bg-gray-50 p-2 text-center z-50 rounded-md">
            <modalStatusStore.formModal.Modal/>
          </div>
        </div>
      )}
    </>
  )
}
