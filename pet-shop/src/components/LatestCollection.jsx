import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const {products} = useContext(ShopContext);

    const [LatestProducts, setLatestProducts] = useState([]);
    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[])

    return (
        <div className=''>
            <div className='text-center py-5 text-3xl'>
                <h1>Новинки</h1>
                <p className='text-[#49557e] w=3/4 m-auto text-xs sm:text-base '>
                    Оцініть нові пропозиції:
                </p>
            </div>

            {/* Rendering PRODUCTS */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
            LatestProducts.map((item, index) => (
                <ProductItem 
                    key={index} 
                    _id={item._id} 
                    image={item.images?.[0]} // Змінити item.image на item.images?.[0]
                    name={item.name} 
                    price={item.price}
                    />
                ))
            }
            </div>
        </div>
  )
}

export default LatestCollection
