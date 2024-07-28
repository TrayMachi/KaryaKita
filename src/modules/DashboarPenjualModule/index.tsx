import React from 'react'
import { SalesTracking } from './components/SalesTracking'
import ListPesanan from './elements/ListPesanan'

const DashboardPenjualModule = () => {
  return (
    <div className='mt-10'>
      <SalesTracking />
      <div className='mt-10'>
        <ListPesanan />
      </div>
    </div>
  )
}

export default DashboardPenjualModule
