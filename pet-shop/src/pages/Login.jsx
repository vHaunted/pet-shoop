import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const onSubmitHandler = async (event) => {
    event.preventDefault
  }

  return (
    <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-black' action="">
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <h1 className='text-4xl'>{currentState}</h1>
        <hr className='border-none h-'/>
      </div>
      {currentState === 'Login' ? '' : <input type="text" className='order_input w-[400px]' placeholder='Name' required/>}
      <input type="text" className='order_input w-[400px]' placeholder='Email' required/>
      <input type="password" className='order_input w-[400px]' placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Забули пароль?</p>
        {
          currentState === 'Login'
          ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Створити акаунт</p>
          : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Ввійти в акаунт</p>
        }
      </div>
      <button className=''>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
