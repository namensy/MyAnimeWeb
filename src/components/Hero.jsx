import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    // ต้องการ Adjust image-postion โดยใช้ Tailwindcss
      <div style={{ background: `url(${assets.solo})` ,backgroundPosition: 'left 30%',}} className=' h-[900px] flex justify-center items-center scale-[0.9] '>
        <div className='text-9xl bg-gradient-to-r from-black to-transparent" '>Hello</div>
        <div className='text-9xl'>Hello</div>
      </div>
  )
}

export default Hero