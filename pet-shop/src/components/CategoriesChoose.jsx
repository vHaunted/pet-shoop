import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';

const CategoriesChoose = () => {
  return (
    <div className='mt-16'>
      <div className='text-center mx-auto max-w-3xl px-4 mt-5 mb-8'>
        <h1 className='text-2xl sm:text-3xl font-medium'>
          Ми пропонуємо вашим улюбленцям лише якісний та оригінальний товар!
        </h1>
        <p className='mt-1 text-[#49557e]'>Перегляньте наш каталог:</p>
      </div>
      
      <div className='grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:justify-evenly sm:gap-4 md:gap-8 p-4'>
        <Link className='max-w-40 text-center' to='/collection?category=cats'>
          <img 
            src={assets.category_cat} 
            alt="Для котів" 
            className='rounded-full mx-auto'
          />
          <p className='text-[#49557e] mt-2 text-sm sm:text-base'>Котам</p>
        </Link>
        <Link className='max-w-40 text-center' to='/collection?category=dogs'>
          <img 
            src={assets.category_dog} 
            alt="Для собак" 
            className='rounded-full mx-auto'
          />
          <p className='text-[#49557e] mt-2 text-sm sm:text-base'>Собакам</p>
        </Link>
        <Link className='max-w-40 text-center' to='/collection?category=rodents'>
          <img 
            src={assets.category_hamster} 
            alt="Для гризунів" 
            className='rounded-full mx-auto'
          />
          <p className='text-[#49557e] mt-2 text-sm sm:text-base'>Гризунам</p>
        </Link>
        <Link className='max-w-40 text-center' to='/collection?category=birds'>
          <img 
            src={assets.category_bird} 
            alt="Для птахів" 
            className='rounded-full mx-auto'
          />
          <p className='text-[#49557e] mt-2 text-sm sm:text-base'>Пташкам</p>
        </Link>
      </div>
    </div>
  )
}

export default CategoriesChoose