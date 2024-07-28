import React from 'react';
import { Button } from '@/components/ui/button';

export const BuatBeli = () => {
  return (
    <div className='w-[271px] rounded-2xl shadow-xl my-auto h-fit border-2 border-[#E3E3E3] p-4 flex flex-col justify-between'>
      <div className='mb-1'> 
        <p className='text-primary font-extrabold text-[24px] mb-2'>Beli</p>
        <p className='text-primary font-extrabold text-[18px] mb-2'>Bid</p>
        <input type='text' placeholder='Masukkan nilai bid' className='border-2 border-[#E3E3E3] rounded-lg p-2 w-full' />
      </div>
      <div className='flex flex-col gap-2 mt-5'> 
        <Button>Bid</Button>
      </div>
    </div>
  );
};


