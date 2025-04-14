import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div className='justify-items-center'>
            <img className='w-16' src={assets.hand_heart} alt="" />
            <p>Something good about our shop</p>
        </div>
        <div className='justify-items-center'>
            <img className='w-16' src={assets.store_alt} alt="" />
            <p>Something good about our shop</p>
        </div>
        <div className='justify-items-center'>
            <img className='w-16' src={assets.twenty_four} alt="" />
            <p>Something good about our shop</p>
        </div>
        <div className='justify-items-center'>
            <img className='w-16' src={assets.sertified} alt="" />
            <p>Something good about our shop</p>
        </div>
        <div className='justify-items-center'>
            <img className='w-16' src={assets.paw_heart} alt="" />
            <p>Something good about our shop</p>
        </div>
      
    </div>
  )
}

export default OurPolicy
