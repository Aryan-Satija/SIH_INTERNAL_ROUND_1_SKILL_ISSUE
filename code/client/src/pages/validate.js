import React from 'react';
import { SideDrawer } from '../components/drawer';
import { ValidateTable } from '../components/validateTable';

export const Validate = () => {
  return (
    <div className='px-4 min-h-screen flex flex-row gap-4 items-center justify-center pt-[5.5rem]'>
      <div>
        <SideDrawer index={2}/>
      </div>
      <div className='w-full flex flex-col gap-8 items-center'>
        <div className='flex flex-col items-center gap-2'>
          <div className='text-gray-200 text-4xl'>Validate Document</div>
          <p className='text-gray-500 text-center w-[80%]'>Whether you're a seasoned professional managing sensitive contracts, a diligent student submitting crucial research papers, or anyone in between, DocSecure provides the assurance and peace of mind you need.</p>
        </div>
        <div className='mx-auto w-[95%] md:w-[80%]'>
          <ValidateTable/>
        </div>
      </div>
    </div>
  )
}
