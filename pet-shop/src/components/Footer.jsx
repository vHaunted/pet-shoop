import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer  className="bg-no-repeat mt-20" 
    style={{ backgroundImage: `url(${assets.back_1})`,
        backgroundRepeat: 'revert',
        }}>

        {/* Content block */}
        <div className='flex flex-col sm:grid grid-cols-[2fr_1fr_1fr_1fr] gap-6 my-10 text-sm sm:px-[9vw]'>
            <div>
                <img className='mb-5 w-[150px]' src={assets.logo_2} alt="" />
                <p className='w-full text-gray-600'>©2024-2025</p>
                <p className='w-full text-gray-600'>Тут можна написати типу цей сайт це наша проектна робота таких то студентва ну просто по приколу</p>
            </div>

            {/* <div className='ml-10'>
                <p className='text-xl mb-5 font-[Prata]'>Щось тут</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Головна сторінка</li>
                    <li>Про нас</li>
                    <li>Доставка</li>
                    <li>Сертифікати</li>
                    <li>Приватність</li>
                    <li>Щось там</li>
                </ul>
            </div> */}

            <div>
                <p className='text-xl mb-5 font-[Prata]'>Контактна інформація</p>
                <ul className='flex flex-col gap-4 text-gray-600'>
                    <li className='flex items-center gap-2'>
                        <img className='w-[15px]' src={assets.telegram} alt="Telegram" />
                        <a href="">Telegram-чат: @MeowGazinSupport</a>
                    </li>
                    <li className='flex gap-2'>
                        <img className='w-[15px] h-[15px]' src={assets.phone} alt="Telegram" />
                        <a href="">+8 800 555 35 35 <br /> звінки приймаємо з 7:00 до 22:00</a>
                    </li>
                </ul>
            </div>

            <div>
                <p className='text-xl mb-5 font-[Prata]'>Ми в соцмережах</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li className='flex items-center gap-2'>
                        <img className='w-[15px]' src={assets.telegram} alt="Telegram" />
                        <a href="">Telegram-група: @MeowGazinGroup</a>
                    </li>
                </ul>
                <div className='flex flex-row gap-2 pt-5'>
                <a href=""><img className='w-[30px]' src={assets.insta} alt="" /></a>
                <a href=""><img className='w-[30px]' src={assets.facebook} alt="" /></a>
                </div>
            </div>
        </div>
        <div className="w-full bg-black/70 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-300 text-sm">
          © 2025 MeowGazin. Усі права захищені.
        </div>
      </div>
    </footer>
  )
}

export default Footer