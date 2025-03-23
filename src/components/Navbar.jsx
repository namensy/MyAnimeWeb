import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  
  return (
    <div className='flex items-center justify-between'>
      <div className='flex gap-2'>
        <div className='hover:text-white cursor-pointerbg-white'>
          <img className='w-30 cursor-pointer hover:-translate-y-0.5 transition-transform' src={assets.crunchyroll} alt="Crunchyroll logo" />
        </div>
        <button className='hover:-translate-y-0.5 transition-transform cursor-pointer text-white p-2 w-25 '>New</button>
        <button className='hover:-translate-y-0.5 transition-transform cursor-pointer text-white p-2 w-25'>Popular</button>
      </div>
      <div className='bg-[#454545] rounded-sm border-b-amber-500 focus-within:border-b-2'>
        <input type="text" placeholder='Search ..' className='w-full placeholder-white text-white text-lg py-1 pl-4 focus:pr-72 outline-none transition-all duration-400' />
      </div>
      <button className='cursor-pointer block hover:-translate-y-0.5 transition-transform text-white px-10 py-5 mr-10'>Create Account</button>
    </div>
  )
}

export default Navbar