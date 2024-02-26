'use client'

import { useModalStatusStore } from '@/store/modalStatusStore'
import React from 'react'

export default function UpdateConfirmationBox() {
    
    const modalStatusStore = useModalStatusStore();
  const submitHandler = () => {
    modalStatusStore.setDefault();
    alert("Updated");
   }
  return (
    <div>
        <h3 className='text-xl font-medium mb-5'>Are you sure?</h3>
        <p className='mb-5'>You want to update your appointment.</p>
        <div className='flex justify-end gap-4'>
            <button onClick={submitHandler}
            className='bg-emerald-500 text-white p-2 rounded-md' >Confirm</button>
            <button onClick={modalStatusStore.setDefault}
            className='bg-gray-500 text-white p-2 rounded-md'>Cancel</button>
        </div>
    </div>
  )
}
