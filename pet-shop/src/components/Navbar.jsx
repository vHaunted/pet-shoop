import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets.js';
import { NavLink, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  const categories = [
    {
      name: "Для котів",
      subCategories: ["Сухий корм", "Консерви", "Ласощі", "Іграшки"]
    },
    {
      name: "Для собак",
      subCategories: ["Сухий корм", "Консерви", "Кістки", "Нашийники"]
    },
    {
      name: "Для гризунів",
      subCategories: ["Корм", "Клітки", "Аксесуари"]
    },
    {
      name: "Для птахів",
      subCategories: ["Корм", "Клітки", "Іграшки"]
    }
  ];

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
          <img onClick={() => setShowSearch(true)} className='w-5 cursor-pointer' src={assets.search_icon} alt="" />
          <Link to='/cart' className='relative'>
            <img src={assets.basket_icon} alt="Кошик" />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]'>{getCartCount()}</p>
          </Link>
          <div className='group relative'>
            <Link to='/login'><img 
              src={assets.profile_icon} 
              alt="Профіль" 
              className="cursor-pointer" 
            /></Link>
            <div className='absolute hidden group-hover:block right-0 top-full mt-1 z-50'>
              <div className='dropdown_profile'>
                <p className='pb-2'>Мій профіль</p>
                <p className='pb-2'>Замовлення</p>
                <p className=''>Вийти</p>
              </div>
            </div>
          </div>
          <img 
            onClick={() => setVisible(true)} 
            src={assets.menu_burger} 
            className='menu_burger' 
            alt="Меню" 
          />
        </div>
      </div>

      {/* Другий навбар (категорії) */}
      {/* <div className='border-b hidden sm:block'>
        <div className='container mx-auto flex justify-center'>
          <ul className='flex gap-1 py-3'>
            {categories.map((category) => (
              <li key={category.name} className='group relative'>
                <button className='font-medium text-gray-700 hover:text-orange-500 transition'>
                  {category.name}
                </button>
                <div className='absolute hidden group-hover:block left-0 top-full mt-1 bg-white shadow-lg rounded-md p-3 z-40 min-w-[200px]'>
                  {category.subCategories.map((subCat) => (
                    <Link 
                      key={subCat} 
                      to={`/collection?category=${category.name}&subCategory=${subCat}`}
                      className='block py-2 px-4 hover:bg-gray-100 rounded transition'
                    >
                      {subCat}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div> */}

      {/* Sidebar menu for small screen */}
      <div className={`fixed top-0 right-0 bottom-0 bg-white shadow-xl z-50 overflow-y-auto transition-all duration-300 transform ${visible ? 'translate-x-0 w-72' : 'translate-x-full w-0'}`}>
        <div className='flex flex-col p-4'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.angle_left} className='h-4' />
            <p>Закрити</p>
          </div>
          
          <NavLink onClick={() => setVisible(false)} className='py-3 px-4 border-b' to='/'>Головна</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-3 px-4 border-b' to='/collection'>Каталог</NavLink>
          
          {/* Категорії в бургер-меню */}
          {/* <div className='mt-4'>
            <h3 className='font-bold px-4 py-2'>Категорії</h3>
            <ul className='pl-4'>
              {categories.map((category) => (
                <li key={category.name} className='mb-2'>
                  <details>
                    <summary className='font-medium py-2 cursor-pointer'>{category.name}</summary>
                    <ul className='ml-4 mt-1'>
                      {category.subCategories.map((subCat) => (
                        <li key={subCat}>
                          <Link 
                            onClick={() => setVisible(false)}
                            to={`/collection?category=${category.name}&subCategory=${subCat}`}
                            className='block py-1.5 px-2 hover:bg-gray-100 rounded transition'
                          >
                            {subCat}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;