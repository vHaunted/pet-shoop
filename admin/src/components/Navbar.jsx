import React from 'react'
import {assets} from '../assets/assets'

const Navbar = () => {
  return (
    <div className='flex flex-row items-center py-2 px-[4%] justify-between'>
      <img className='w-64' src={assets.logo_admin} alt="" />
      <img className='w-8' src={assets.logout} alt="" />
    </div>
  )
}

export default Navbar
