import React from 'react'

export default function RoomCard() {
  return (
    <div className='card max-w-60'>
        <h3 className='text-[15px] font-bold'>Room One</h3>
        <div className='flex justify-around items-center mt-2'>
            <button className='rounded-xl bg-detail text-text-white px-3 py-1 text-[12px] hover:bg-opacity-75 active:bg-opacity-75'>
                Detail
            </button>
            <button className='rounded-xl bg-secondary text-text-white px-3 py-1 text-[12px] hover:bg-opacity-75 active:bg-opacity-75'>
                Book
            </button>
        </div>
    </div>
  )
}
