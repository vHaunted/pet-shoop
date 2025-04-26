import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='policy_ '>
        <div className='justify-items-center'>
            <img className='icon_ w-16 mb-2' src={assets.store_alt} alt="" />
            <p className='text-[#49557e]'>Магазини у більшості міст України!</p>
        </div>
        <div className='justify-items-center'>
            <img className='icon_ w-16 mb-2' src={assets.twenty_four} alt="" />
            <p className='text-[#49557e]'>Працюємо цілодобово!</p>
        </div>
        <div className='justify-items-center'>
            <img className='icon_ w-16 mb-2' src={assets.sertified} alt="" />
            <p className='text-[#49557e]'>Лише оригінальні товари!</p>
        </div>
        <div className='justify-items-center'>
            <img className='icon_ w-16 mb-2' src={assets.paw_heart} alt="" />
            <p className='text-[#49557e]'>З турботою про ваших улюбленців!</p>
        </div>
    </div>
  )
}

export default OurPolicy
