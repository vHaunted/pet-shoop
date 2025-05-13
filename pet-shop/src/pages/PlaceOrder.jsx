import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  // cod is for cash on delivery
  const [method, setMethod] = useState('cod'); 
  const {navigate , backendUrl, token, cartItems, setCardItems, getCartAmount, delivery_fee, products} = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name:'',
    surname: '',
    email: '',
    phoneNumber: '',
    region: '',
    city: '',
    zipcode: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({...data, [name]:value}))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      let orderItems = []

      for(const items in cartItems) {
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const itemInfo = structuredClone(products.find(product => product._id === items))

            if(itemInfo) {
              itemInfo.quantity = cartItems[items][item] 
              orderItems.push(itemInfo)
            }

          }
        }
      }

      if (cartItems?.items && Array.isArray(cartItems.items)) {
        for (const item of cartItems.items) {
          if (item.quantity > 0) {
            const productInfo = products.find(product => product._id === item.product?._id);
            
            if (productInfo) {
              orderItems.push({
                ...productInfo,
                quantity: item.quantity
              });
            }
          }
        }
      }

      console.log("Order Items:", orderItems);
      
      if (orderItems.length === 0) {
        console.error("Кошик порожній!");
        return;
      }

    } catch (error) {
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-evenly gap-4 pt-5 min-h-[80vh] border-t'>
      {/* === Left Side === */}
      <div className='flex flex-col gap-3 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl mb-3'>
          <h1>Введіть інформацію</h1>
        </div>
        
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='name' value={formData.name} className='border border-stone-500 rounded-xl p-2 flex-1' placeholder='Імʼя'/>
          <input required onChange={onChangeHandler} name='surname' value={formData.surname} className='border border-stone-500 rounded-xl p-2 flex-1' placeholder='Прізвище'/>
        </div>
        
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-stone-500 rounded-xl p-2' placeholder='Email'/>
        <input required onChange={onChangeHandler} name='phoneNumber' value={formData.phoneNumber} className='border border-stone-500 rounded-xl p-2' placeholder='Номер телефону'/>
        
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='region' value={formData.region} className='border border-stone-500 rounded-xl p-2 flex-1' placeholder='Область'/>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-stone-500 rounded-xl p-2 flex-1' placeholder='Місто'/>
        </div>

        <div className='flex gap-3'>
        <select className='border border-stone-500 rounded-xl p-2 flex-1 text-gray-700'>
            <option>НоваПошта</option>
            <option>УкрПошта</option>
          </select>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-stone-500 rounded-xl p-2 flex-1' placeholder='Поштовий індекс'/>
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
              <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer text-lg'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-orange-400' : ''}`}></p>
                <img className='w-6' src={assets.hand_money} alt="" />
                <p>При отриманні у відділенні пошти</p>
              </div>
              <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer text-lg'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-orange-400' : ''}`}></p>
                <img className='w-16' src={assets.stripe} alt="" />
                <p></p>
              </div>
              <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer text-lg'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-orange-400' : ''}`}></p>
                <img className='w-28' src={assets.razorpay} alt="" />
                <p></p>
              </div>
            </div>

            <div className='w-full text-end mt-3 text-lg'>
              {/* onClick={()=>navigate('/orders')} у кнопці */}
              <button type='submit' >Зробити замовлення</button> 
            </div>
          </div>
      </div>
    </form>
  )
}

export default PlaceOrder
