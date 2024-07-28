import React from 'react'
import { IsiDetail } from './sections/IsiDetail'
import { CarouselFoto } from './components/CarouselFoto'
import { BuatBeli } from './sections/BuatBeli'
import { items } from '../LandingPageModule/constant'

const ItemDetailModule = ({item} : {item: string}) => {
  return (
    <div className='flex flex-row gap-x-5 items-center justify-center'>
      <CarouselFoto />
      <IsiDetail />
      <BuatBeli />
    </div>
  )
}

export default ItemDetailModule
