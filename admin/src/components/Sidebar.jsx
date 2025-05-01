import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-w-[200px] min-h-screen border-r border-stone-300'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink className='flex items-center gap-3 border border-r-0 py-4 pl-4 border-stone-300' to="/add">
          <img className='w-8' src={assets.add_icon} alt="" />
          <p className='hidden md:block'>Додати продукт</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-r-0 py-4 pl-4 border-stone-300' to="/list">
          <img className='w-8' src={assets.overview} alt="" />
          <p className='hidden md:block'>Список продуктів</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-r-0 py-4 pl-4 border-stone-300' to="/orders">
          <img className='w-8' src={assets.basket} alt="" />
          <p className='hidden md:block'>Замовлення</p>
        </NavLink>
      </div>
        
    </div>
  )
}

export default Sidebar
