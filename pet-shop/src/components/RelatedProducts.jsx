import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const RelatedProducts = ({category, subCategory}) => {
    const {products} = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(()=>{
        if(products.length > 0) {
            let productsCopy = products.slice();
            
            productsCopy = productsCopy.filter((item)=> category === item.category);
            productsCopy = productsCopy.filter((item)=> subCategory === item.subCategory);

            setRelated(productsCopy.slice(0,5));
            
        }

    }, [])

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <h1>Вас також можуть зацікавити:</h1>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
      {related.map((item, index) => (
        <ProductItem 
          key={index} 
          _id={item._id} 
          name={item.name} 
          price={item.price} 
          image={item.images?.[0]} // Змінити item.image на item.images?.[0]
        />
      ))}
      </div>
    </div>
  )
}

export default RelatedProducts
