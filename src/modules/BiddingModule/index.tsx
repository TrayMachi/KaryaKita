import React from 'react'
import { IsiDetailBidding } from './sections/IsiDetail'
import { CarouselFoto } from './components/CarouselFoto'
import { BuatBeli } from './sections/BuatBeli'

export const BiddingModule = () => {
  return (
    <div className='flex flex-row gap-x-5'>
      <CarouselFoto />
      <IsiDetailBidding />
      <BuatBeli />
    </div>
  )
}

