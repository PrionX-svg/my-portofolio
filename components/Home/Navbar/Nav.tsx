import React from 'react'
import Image from 'next/image'
import { navigationLinks } from '@/constant/constant'
import Link from 'next/link'
import { HiBars3BottomRight } from 'react-icons/hi2'

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
          <div className='hidden lg:flex items-center space-x-8'>
            {navigationLinks.map((navigationLinks)=>{
              return <Link key={navigationLinks.id} href={navigationLinks.url}>
                <p className='nav_link'>{navigationLinks.label}</p>
              </Link>
            })}
          </div>
          {/* Button */}
          <div className='flex items-center space-x-4'>
            <button className='md:px-10 md:py-3 px-8 py-3 text-blue-800 font-semibold sm:text-base text-sm bg-white hover:bg-yellow-300 transition-all duration-200 rounded-lg'>
              Hire Me
            </button>
          </div>
          {/* Burger Menu for Mobile Navbar */}
          <HiBars3BottomRight className='w-8 h-8 cursor-pointer text-white lg:hidden'/>
        </div>
      </div>
    </div>
  )
}

export default Nav