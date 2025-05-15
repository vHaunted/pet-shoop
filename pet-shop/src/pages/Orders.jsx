import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';

const Orders = () => { 
  const { currency, backendUrl, token } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if(!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);

      if (response.data.success && Array.isArray(response.data.orders)) {
        setOrderData(response.data.orders); // запис у state
      }
      
    } catch (error) {
         console.error("Помилка отримання замовлень:", error);
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='border-t pt-16'>
      <div className='text-3xl mb-7'>
        <h1>Ваші замовлення</h1>
      </div>

      <div className='space-y-4'>
        {orderData.sort((a, b) => b.date - a.date)
        .map((order) => (
          <div key={order._id} className='border p-4 space-y-2'>
            {/* <h2 className='font-bold'>Замовлення № {order._id}</h2> */}
            <p className='text-sm text-stone-500'>Дата: {new Date(order.date).toLocaleString()}</p>
            <div className='space-y-2'>
              {order.items.map((item, i) => {
                const product = item.product || item; // якщо продукт вже попульовано
                return (
                  <div key={i} className='flex items-center gap-4 border-b pb-2'>
                    <img 
                      src={product.images?.[0] || ''} 
                      alt={product.name} 
                      className='w-16 h-16 object-cover rounded-lg' 
                    />
                    <div className='flex-1'>
                      <p className='font-medium mb-2'>{product.name}</p>
                      <div className='flex gap-5'>
                        <p className='text-sm text-stone-500'>
                          Кількість: {item.quantity}
                        </p>
                        <p className='text-sm text-stone-500'>
                          Ціна: <strong>{currency}{(product.price * item.quantity).toFixed(0)}</strong> 
                        </p>
                      </div>
                      <p className='text-sm font-medium text-stone-500'>Спосіб оплати: {order.paymentMethod}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className='flex justify-between items-center'>
              <p className='font-semibold text-orange-700'>{order.status}</p>
              <p className='mt-2'>
                Сума замовлення: <strong className='text-orange-700 font-bold text-lg'>{currency}{order.amount.toFixed(0)}</strong> 
              </p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders 