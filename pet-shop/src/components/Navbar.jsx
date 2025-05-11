import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets.js';
import { NavLink, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <>
      {/* Перший навбар (основний) */}
      <div className='z-50 flex items-center justify-between py-5 font-medium'>
        <Link to={'/'}><img src={assets.logo} className='w-64' alt="Логотип" /></Link> 
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
          <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>Головна сторінка</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink to='/collection' className='flex flex-col items-center gap-1'>
            <p>Каталог</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        </ul>

        <div className='flex items-center gap-6 cursor-pointer'>
          <img onClick={() => setShowSearch(true)} className='w-8 cursor-pointer' src={assets.search_icon} alt="" />
        
          <Link to='/cart' className='relative'>
            <img src={assets.basket_icon} alt="Кошик" className='w-8'/>
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]'>{getCartCount()}</p>
          </Link>

          {/* PROFILE PIC ======================== */}
          <div className='group relative'>
            <img onClick={()=>token ? null : navigate('/login')}
              src={assets.profile_icon} 
              alt="Профіль" 
              className="cursor-pointer w-8 my-3 " 
            />
            {/* === Dropdown menu === */}
            {token &&
              <div className='group-hover:block z-20 hidden absolute dropdown-menu right-0 bg-stone-100'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5'>
                  <p className='cursor-pointer hover:text-stone-700 border-stone-400'>Мій профіль</p>
                  <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-stone-700'>Замовлення</p>
                  <p onClick={logout} className='cursor-pointer hover:text-stone-700'>Вийти</p>
                </div>
              </div>
            }

          </div>
          <img 
            onClick={() => setVisible(true)} 
            src={assets.menu_burger} 
            className='w-8' 
            alt="Меню" 
          />
        </div>
      </div>

      {/* Sidebar menu for small screen */}
      <div className={`fixed top-0 right-0 bottom-0 bg-white shadow-xl z-50 overflow-y-auto transition-all duration-300 transform ${visible ? 'translate-x-0 w-72' : 'translate-x-full w-0'}`}>
        <div className='flex flex-col p-4'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.angle_left} className='h-4' />
            <p>Закрити</p>
          </div>
          
          <NavLink onClick={() => setVisible(false)} className='py-3 px-4 border-b' to='/'>Головна</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-3 px-4 border-b' to='/collection'>Каталог</NavLink>
          
        </div>
      </div>
    </>
  );
};

export default Navbar;