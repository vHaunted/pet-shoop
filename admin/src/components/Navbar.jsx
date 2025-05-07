import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex flex-row items-center py-2 px-[4%] justify-between'>
      <img className='w-64' src={assets.logo_admin} alt="" />
      <button onClick={()=>setToken('')} className='logout-button'>Вийти</button>
    </div>
  )
}

export default Navbar
