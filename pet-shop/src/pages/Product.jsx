import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState(assets.placeholder)

  const fetchProductData = async () => {
    if (!products || products.length === 0) return;
    
    const foundProduct = products.find(item => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.images?.[0] || assets.placeholder);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products]); // Додаємо products в залежності

  if (!productData) {
    return <div className='opacity-0'>Loading...</div>;
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        
        {/* === Product Images === */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.images?.length > 0 ? (
              productData.images.map((item, index) => (
                <img 
                  onClick={() => setImage(item)} 
                  src={item} 
                  key={index} 
                  className='product_look w-[35%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' 
                  alt="" 
                  onError={(e) => e.target.src = assets.placeholder}
                />
              ))
            ) : (
              <img 
                src={assets.placeholder} 
                className='product_look w-[35%] sm:w-full sm:mb-3 flex-shrink-0' 
                alt="Placeholder" 
              />
            )}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img 
              src={image} 
              className='product_look max-h-[500px]' 
              alt={productData.name}
              onError={(e) => e.target.src = assets.placeholder}
            />
          </div>
        </div>

        {/* === Product Info === */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star} className="w-3" alt="star" />
              <img src={assets.star} className="w-3" alt="star" />
              <img src={assets.star} className="w-3" alt="star" />
              <img src={assets.star} className="w-3" alt="star" />
              <img src={assets.star} className="w-3" alt="star" />
              <p className='pl-2 text-gray-500'>(9)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          
          {/* == Add to Cart == */}
          <div className='mt-7'>
            <button onClick={() => addToCart(productData._id)}>Додати до кошика</button>
            <hr className='mt-8 sm:w-4/5'/>
            <div className='text-sm text-gray-600 mt-5 flex flex-col gap-1'>
                <p>100% Оригінальний продукт!</p>
                <p>Доступна оплата у відділенні.</p>
            </div>
          </div>
        </div>
      </div>

      {/* === Description and Review Section == */}
      <div className='mt-20'>
        <div className='flex'>
            <b className='border px-5 py-3 text-sm'>Description</b>
            <p className='border px-5 py-3 text-sm'>Reviews(9)</p>
        </div>
        <div className='flex flex-col gap-4 border py-6 px-6 text-sm text-gray-600'>
        <p className='text-sm preserve-whitespace'>{productData.description}</p>
        </div>
          
        {/* === display related products === */}
        <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
      </div>
    </div>
  );
}

export default Product;