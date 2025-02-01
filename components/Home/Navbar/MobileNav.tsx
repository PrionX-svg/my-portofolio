import React from 'react'
import { navigationLinks } from '@/constant/constant'
import Link from 'next/link'
import { CgClose } from 'react-icons/cg'

const MobileNav = () => {
  return (
    <div>
      {/* Overlay */}
      <div className='fixed inset-0 z-[100] bg-black opacity-70 w-full h-screen'></div>
      {/* Navigation Links */}
      <div className='text-white fixed justify-center flex flex-col h-full w-[80%] sm:w-[60%] bg-[#0f0715] space-y-6 z-[10000]'>
        {navigationLinks.map((navigationLinks)=>{
        return <Link key={navigationLinks.id} href={navigationLinks.url}>
            <p className='nav_link text-[20px] ml-12 border-b-[1.5px] pb-2 border-white sm:text-[30px]'>{navigationLinks.label}</p>
          </Link>
        })}
        {/* Close Button */}
        <CgClose className='absolute top-[0.7rem] right-[1.4rem] sm:h-8 w-6 h-6 text-white'/>
      </div>
      
    </div>
  )
}

export default MobileNav