import React from 'react'
import { ProfileData } from './section/ProfileData'
import { EditForm } from './section/EditForm'

export const ProfileGeneralModule = () => {
  return (
    <main className='flex flex-row justify-center items-center mt-[10vh] gap-4'>
        <ProfileData />
        <div className="bg-[#B5B3B3] flex flex-col h-[400px] w-[1px]" />
        <EditForm />
    </main>
  )
}
