import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({_id,image,name,price}) => {
    const {currency} = useContext(ShopContext);

    return (
        <Link className='cursor-pointer' to={`/product/${_id}`}>
            <div className='images-container'>
                {/* hover:scale-110 transition ease-in-out */}
                <img className='product_image' src={image[0]} alt="" />
            </div>
            <p className=' pt-3 pb-1 text-sm'>{name}</p>
            
            <p className='text-[] text-sm font-medium'>{currency}{price}</p>
        </Link>
  )
}

export default ProductItem
