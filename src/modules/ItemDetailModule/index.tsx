import React from 'react'
import { IsiDetail } from './sections/IsiDetail'
import { CarouselFoto } from './components/CarouselFoto'
import { BuatBeli } from './sections/BuatBeli'

const ItemDetailModule = () => {
  return (
    <div className='flex flex-row gap-x-5'>
      <CarouselFoto />
      <IsiDetail />
      <BuatBeli />
    </div>
  )
}

export default ItemDetailModule
