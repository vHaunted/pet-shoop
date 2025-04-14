import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(()=>{
        if(location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false)
        }
    }, [location])

    return showSearch && visible ?(
        <div className='border-t py-4 text-center'>
            <div className='inline-flex items-center justify-center border border-orange-300 px-5 rounded-full w-3/4 sm:w-1/2'>
                <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm py-2' type="text" placeholder='Пошук' />
                <img className='w-4' src={assets.search_icon} alt="" />
            </div>
            <img 
            onClick={() => {
                setShowSearch(false);
                setSearch(''); // чистим пошуковий запит
            }} 
            className='inline w-4 cursor-pointer mx-2' 
            src={assets.cross_icon} 
            alt="" 
            />
        </div>
    ) : null
}

export default SearchBar
