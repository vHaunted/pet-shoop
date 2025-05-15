import React from 'react'
import { useEffect, useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import backendUrl from '../backendUrl.js'
import {toast} from 'react-toastify'
import { assets } from '../assets/assets.js'

const Orders = ({token}) => {
  const [orders, setOrders] = useState([])
   const currency = '₴'
  
  const fetchAllOrders = async () => {
    if(!token) {
      return null
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, 
        {headers:{token}})
      
      if(response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }

    } catch(error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async(event, orderId) => {
    const newStatus = event.target.value

    try {
      const response = await axios.post(backendUrl + '/api/order/status', 
        { orderId, status: newStatus },
        { headers: { token } }
      )

      if (response.data.success) {
        // оновлюємо локальний стан
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        )
        setTimeout(() => fetchAllOrders(), 500)
      }
    } catch (error) {
      console.log(error)
      toast.error("Помилка при оновленні статусу")
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  }, [token])

  return (
    <div>
      <p className='mb-2 font-extrabold'>Список усіх замовлень</p>
      <div>
        {orders.sort((a, b) => b.date - a.date)
        .map((order, index) => (
          <div key={index} className='border border-stone-300 p-4 mb-4 rounded-lg'>
            <div className='flex items-center gap-2 mb-2'>
              <img className='w-6' src={assets.basket} alt="" />
              {/* <p className='font-semibold'>Замовлення № {order._id}</p> */}
            </div>

            <div className='pl-6'>
              <p className='font-bold text-stone-600'>Товари:</p>
              {order.items.map((item, i) => (
                  <p key={i} className='text-sm mb-3'> 
                    {item.product?.name || item.name} <span className='font-bold'>× {item.quantity}</span>
                  </p>
              ))}
            </div>

            <div className='text-sm text-stone-500 mt-2 pl-6'>
              <p className='font-bold text-stone-600'>Інформація:</p>
              <p>Дата: {new Date(order.date).toLocaleDateString()} | Оплата: {order.paymentMethod}</p> 
              <p>{order.address.phoneNumber} | {order.address.name } | {order.address.email}</p>
              <p>{order.address.region} обл., {order.address.city} | Поштовий індекс: {order.address.zipcode}</p>
              <p>Оплата: {order.payment ? 'Оплачено' : 'У очікуванні'}</p>
            </div>

            <div className='px-5 mt-4 flex justify-between text-orange-700'>
              <select onChange={(event)=>statusHandler(event, order._id)} value={order.status} className='p-1 '>
                <option value="Замовлення оформлено">Замовлення оформлено</option>
                <option value="У дорозі">У дорозі</option>
                <option value="Доставлено">Доставлено</option>
            </select>
            <p className='font-bold'>{order.amount}{currency}</p>
            </div>
          </div>


        ))}
      </div>
    </div>
  )
}

export default Orders
