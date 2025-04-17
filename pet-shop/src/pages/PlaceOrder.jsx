import React from 'react'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'

const PlaceOrder = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 min-h-[80vh] border-t'>
      {/* === Left Side === */}
      <div className='flex flex-col gap-3 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl mb-3'>
          <h1>Delivery Information</h1>
        </div>
        
        <div className='flex gap-3'>
          <input className='order_input flex-1' placeholder='First name'/>
          <input className='order_input flex-1' placeholder='Last name'/>
        </div>
        
        <input className='order_input' placeholder='Email'/>
        <input className='order_input' placeholder='Phone number'/>
        
        <div className='flex gap-3'>
          <input className='order_input flex-1' placeholder='Область'/>
          <input className='order_input flex-1' placeholder='Місто'/>
        </div>

        <div className='flex gap-3'>
        <select className='order_input flex-1 text-gray-700'>
            <option>НоваПошта</option>
            <option>УкрПошта</option>
          </select>
          <input className='order_input flex-1' placeholder='Поштовий індекс'/>
        </div>
      </div>
      {/* === Right Side === */}
      <div className='mt-8'>
          <div className='mt-8 min-w-80'>
            <CartTotal/>
          </div>
          <div className='mt-12 text-2xl'>
            <h1>Метод Оплати</h1>
            {/* Payment Method Selection */}
            <div className='flex gap-3 flex-col lg:flex-row'>
              <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer text-lg'>
                <p className={`min-w-3.5 h-3.5 border rounded-full`}></p>
                <img className='w-7' src={assets.credit_card_filled} alt="" />
                <p>Кредитна картка</p>
              </div>
              <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer text-lg'>
                <p className={`min-w-3.5 h-3.5 border rounded-full`}></p>
                <img className='w-7' src={assets.hand_money} alt="" />
                <p>При отриманні у відділенні пошти</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default PlaceOrder
