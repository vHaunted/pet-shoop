import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Login = () => {
  const [currentState, setCurrentState] = useState('Зареєструватись');
  const onSubmitHandler = async (event) => {
    event.preventDefault
  }

  return (
    <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-black' action="">
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <h1 className='text-4xl'>{currentState}</h1>
        <hr className='border-none h-'/>
      </div>
      {currentState === 'Увійти' ? '' : <input type="text" className='order_input w-[400px]' placeholder='Імʼя' required />}

      <input type="text" className='order_input w-[400px]' placeholder='Адреса e-mail' required/>
      <input type="password" className='order_input w-[400px]' placeholder='Пароль' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Забули пароль?</p>
        {
          currentState === 'Увійти'
          ? <p onClick={()=>setCurrentState('Зареєструватись')} className='cursor-pointer'>Створити акаунт</p>
          : <p onClick={()=>setCurrentState('Увійти')} className='cursor-pointer'>Ввійти в акаунт</p>
        }
      </div>
      <button className=''>
        {currentState === 'Увійти' ? 'Увійти' : 'Зареєструватись'}
      </button>

    </form>
  )
}

export default Login
