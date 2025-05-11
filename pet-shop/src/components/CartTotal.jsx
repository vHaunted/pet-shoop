import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartTotal = () => {
  const { 
    currency, 
    delivery_fee, 
    getCartAmount,
    cartItems  // Додаємо cartItems для перевірки
  } = useContext(ShopContext);
  
  // Додаємо перевірку на порожній кошик
  const isEmpty = !cartItems?.items?.length;
  const totalAmount = isEmpty ? 0 : getCartAmount();
  const delivery = isEmpty ? 0 : delivery_fee;
  const totalWithDelivery = totalAmount + delivery;

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <h1>Загальна ціна товарів</h1>
      </div>
      
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Сумарна ціна товарів</p>
          <p>{currency}{totalAmount.toFixed(2)}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Доставка</p>
          <p>{currency}{delivery.toFixed(2)}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Загальна сума</b>
          <b>{currency}{totalWithDelivery.toFixed(2)}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;