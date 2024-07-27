import React from 'react'
import Image from 'next/image'

const TaroKtp = () => {
  return (
    <div className='bg-primary flex rounded-xl h-[226px] w-full'>
        <div className='bg-[#FBFBFB] border-2 border-black border-dashed my-2 mx-1 w-full h-[210px] rounded-xl'>
            <div className='flex flex-col'>
                <Image src='/IdentificationCard.svg' alt='' width={100} height={100} className='mx-auto my-3' />
                <div className="text-center -mt-4">
                    <p className="text-sm font-bold">
                        <span className="text-secondary">Drag</span> atau 
                        <span className="text-primary"> upload </span>
                        fotomu di sini!
                    </p>
                    <p className="text-purple-600">
                        Wajib memperlihatkan muka dan KTP dengan jelas
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TaroKtp
