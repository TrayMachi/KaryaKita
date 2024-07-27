"use client"
import React, { useState } from 'react'

export const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }
    console.log('searchQuery', searchQuery)
  return (
    <div className='w-[630px] mt-[44px] mx-auto rounded-lg h-[50px] bg-primary-foreground border-2 border-[#CCCBCB]'>
        <div className='flex flex-row my-auto pl-2 pt-3'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z" stroke="#B5B3B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.8034 15.8034L21 21" stroke="#B5B3B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input
                type='text'
                placeholder='Cari Barang/Jasa'
                className='bg-transparent text-black pl-2 text-[14px] focus:outline-none focus:border-transparent'
                value={searchQuery}
                onChange={handleSearch}
            />
        </div>  
    </div>
  )
}

