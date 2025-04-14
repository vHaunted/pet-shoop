import React from 'react'
import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom';

const CategoriesChoose = () => {
  return (
    <div className='grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:justify-evenly sm:gap-4 md:gap-8 p-4'>
      <Link className='max-w-40 text-center' to='/collection'>
        <img src={assets.category_cat} alt="" 
            style={{borderRadius: '50%'}}/>
        <p className='mt-2 text-sm sm:text-base'>Котам</p>
      </Link>
      <Link className='max-w-40 text-center' to='/collection'>
        <img src={assets.category_dog} alt="" 
            style={{borderRadius: '50%'}}/>
        <p className='mt-2 text-sm sm:text-base'>Собакам</p>
      </Link>
      <Link className='max-w-40 text-center' to='/collection'>
        <img src={assets.category_hamster} alt="" 
            style={{borderRadius: '50%'}}/>
        <p className='mt-2 text-sm sm:text-base'>Гризунам</p>
      </Link>
      <Link className='max-w-40 text-center' to='/collection'>
        <img src={assets.category_bird} alt="" 
            style={{borderRadius: '50%'}}/>
        <p className='mt-2 text-sm sm:text-base'>Пташкам</p>
      </Link>
    </div>
  )
}

export default CategoriesChoose
