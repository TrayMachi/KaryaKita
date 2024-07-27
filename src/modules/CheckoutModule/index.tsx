import React from 'react'
import { ConfirmBeli } from './elements/ConfirmBeli'
import { Rincian } from './elements/Rincian'

const CheckoutModule = () => {
  return (
    <div className='flex justify-center flex-row mx-10'>
      <Rincian />
      <ConfirmBeli />
    </div>
  )
}

export default CheckoutModule
