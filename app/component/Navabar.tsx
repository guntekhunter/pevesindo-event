import Image from 'next/image'
import React from 'react'

export default function Navabar() {
    return (
        <div className='w-full flex justify-around py-[1rem] border-b-[1px] bg-white'>
            <div className='w-[90%] justify-center flex'>
                <Image src="/logo.png" alt='' height={300} width={300} className='w-[8rem]' />
            </div>
        </div>
    )
}
