import CalendarHeader from '@/components/Appointment/CalendarHeader';
import SmallCalendar from '@/components/Appointment/SmallCalendar';
import SelectedHolidayList from '@/components/admin/SelectedHolidayList';
import React from 'react'

export default function holidays() {

  return (
    <div className='w-full flex flex-col md:flex-row justify-center gap-x-5 mt-5'>
      <div className='w-[90%] md:w-[50%] lg:w-[40%] mx-auto mb-5 md:mb-0'>
        <SmallCalendar mode={'holiday'} />
      </div>
      <SelectedHolidayList/>
    </div>
  )
}
