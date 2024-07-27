import React from 'react'
import LoginForm from '../elements/LoginForm'
import Image from 'next/image'

const LoginSection = () => {
  return (
    <div className='flex flex-row'>
      <div className='w-1/2 flex items-center min-h-screen justify-center bg-white'>
          <Image src='/KaryaKitaLogo.png' alt='logo' width={200} height={200} />
      </div>
      <div className='w-1/2 flex min-h-screen items-center justify-center bg-primary'>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginSection
