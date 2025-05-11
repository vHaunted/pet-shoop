import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal.jsx';

const Cart = () => {
  const { 
    products, 
    currency, 
    cartItems, 
    updateQuantity, 
    navigate, 
    token,
    fetchCart
  } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      if (!token) {
        navigate('/login');
        return;
      }
      
      try {
        await fetchCart();
      } catch (error) {
        console.error("Помилка завантаження кошика:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [token, navigate, fetchCart]);

  if (loading) {
    return <div className="text-center py-10">Завантаження кошика...</div>;
  }

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <h1>Ваша корзинка</h1>
      </div>

      {cartItems?.items?.length > 0 ? (
        <div>
          {cartItems.items.map((item) => {
            // Знаходимо продукт в загальному списку або використовуємо попульований з кошика
            const product = products.find(p => p._id === item.product?._id) || item.product;
            
            if (!product) {
              console.warn("Продукт не знайдено:", item.product);
              return null;
            }

            return (
              <div key={item.product._id || item.product} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img 
                    className='w-16 h-16 object-cover rounded-lg' 
                    src={product.images?.[0] || assets.placeholder} 
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = assets.placeholder;
                    }}
                  />
                  <div>
                    <p className='text-sm sm:text-lg font-medium'>{product.name}</p>
                    <p className='text-orange-600 mt-1'>{currency}{product.price?.toFixed(2) || '0.00'}</p>
                  </div>
                </div>
                <input
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val > 0) updateQuantity(item.product._id || item.product, val);
                  }}
                  className='border max-w-20 px-2 py-1'
                  type="number"
                  min={1}
                  value={item.quantity}
                />
                <img
                  onClick={() => updateQuantity(item.product._id || item.product, 0)}
                  className='w-6 cursor-pointer'
                  src={assets.delete_icon}
                  alt="Видалити"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p className='py-10 text-center'>Кошик порожній</p>
      )}
      
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button 
              onClick={() => navigate('/place-order')} 
              className='mt-6 px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition'
              disabled={!cartItems?.items?.length}
            >
              Зробити замовлення
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;