import React from 'react';
import Image from 'next/image';
import { items } from '@/modules/LandingPageModule/constant';
import { Button } from '@/components/ui/button';

export const IsiDetailBidding = () => {
  return (
    <div className='flex items-center w-[600px] justify-center mt-20'>
      <div className='flex flex-col ml-5'>
        <div className='px-5 text-primary'>
          <p className='text-[24px] font-bold'>{items[0].title}</p>
          <p className='text-[16px] mb-2'>{items[0].rating} | <span>1000 terjual</span></p>
          <p className='font-extrabold text-[32px]'>{items[0].priceRange}</p>
        </div>
        <div className='border-t-2 border-b-2  w-[500px] border-[#E3E3E3] flex items-center py-3 mx-5 my-5'>
          <Image src="/cowo.svg" alt="" width={60} height={60} className="rounded-md" />
          <div className='ml-3'>
            <p className='text-primary text-[18px]'>Pudidi Arts</p>
            <p className='text-primary text-[14px]'>Jakarta</p>
          </div>
          <Button className='mx-5'>Cek Profil</Button>
        </div>
        <div className='mx-5 text-primary  w-[500px] border-b-2 border-[#E3E3E3] pb-3'>
          <p className='text-[16px] font-bold'>Deskripsi</p>
          <p className='text-[14px] mb-2'>
            kata gweh ini ganti jadi apa ya, gweh gatau juga sih, tapi gweh yakin ini bakal jadi deskripsi yang bagus
          </p>
        </div>
        <div className='flex flex-row items-center  px-5 mt-3 py-3'>
          <div className='flex flex-col'>
            <p className='text-primary text-[24px]'>Pengiriman</p>
            <p className='text-primary text-[16px]'>Jakarta Pusat</p>
          </div>
          <Button className='bg-green-400 mx-5'>Hubungi Whatsapp</Button>
        </div>
      </div>
    </div>
  );
};

