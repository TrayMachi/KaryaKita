import React from 'react';
import Image from 'next/image';
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

export const Footer = () => {
  return (
    <div className='w-screen mt-5 px-10 h-[120px] text-white border-t-2'>
      <div className='flex justify-between items-center h-full'>
        <Image src='/KaryaKitaLogo.png' alt='KaryaKita Logo' width={100} height={100} />
        <div className='flex space-x-4'>
          <FaInstagram className='text-2xl cursor-pointer hover:text-gray-400 text-black transition-colors' />
          <FaTwitter className='text-2xl cursor-pointer hover:text-gray-400 text-black transition-colors' />
          <MdOutlineMail className='text-2xl cursor-pointer hover:text-gray-400 text-black transition-colors' />
        </div>
      </div>
    </div>
  );
}
