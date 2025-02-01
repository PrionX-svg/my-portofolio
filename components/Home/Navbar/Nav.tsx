import React from 'react'
import Image from 'next/image'
import { navigationLinks } from '@/constant/constant'
import Link from 'next/link'
const Nav = () => {
  return (
    // Container for the navbar
    <div className='fixed h-[12vh] z-[10] bg-blue-950 w-full'>
      {/* Items in Navbar */}
      <div className='flex items-center h-full justify-between w-[95%] sm: w-[90%] xl: w-[80%] mx auto'>
        {/* Logo */}
        <Image src={'/images/logo.png'} alt={'Logo'}
          width={55}
          height={55}
          className='ml-[-1.5rem] sm:ml-0'
        />
        {/* Navigation Links */}
        <div className='flex items-center space-x-10'>
          {navigationLinks.map((navigationLinks)=>{
            return <Link key={navigationLinks.id} href={navigationLinks.url}>
              <p className='nav_link'>{navigationLinks.label}</p>
            </Link>
          })}
        </div>
      </div>
    </div>
  )
}

export default Nav