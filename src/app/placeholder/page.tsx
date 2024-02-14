'use client'

import AddAppointment from '@/components/Form/AppointmentForm';
import UpdateConfirmationBox from '@/components/common/UpdateConfirmationBox';
import { useModalStatusStore } from '@/store/modalStatusStore'
import React from 'react'

export default function Page() {
    
  const modalStatusStore = useModalStatusStore();
  return (
    <div>
      <button onClick={() => modalStatusStore.setModal({ isOpen: true, Modal: AddAppointment })}
        className='bg-gray-400 border rounded-sm'>show form modal</button>
      <button onClick={() => modalStatusStore.setModal({ isOpen: true, Modal: UpdateConfirmationBox })}
        className='bg-gray-400 border rounded-sm'>show confirm modal</button>
    </div>
  )
}
