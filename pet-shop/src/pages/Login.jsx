import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Увійти');
  const {token, setToken, navigate} = useContext(ShopContext);
  const backendUrl = "http://localhost:4000";
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Зареєструватись') {
        const response = await axios.post(
          backendUrl + '/api/user/register', 
          {name, email, password}
        );
      
        if(response.data.success) {
          toast.success(response.data.message);
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          navigate('/');
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {email, password})
        if(response.data.success) {
          setToken(response.data.token)
          localStorage.getItem('token',response.data.token)
        } else {
          toast.error(response.data.message)
        }
        
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Сталася помилка');
      console.error(error);
    }
  }

  useEffect(()=>{
    if(token) {
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-black' action="">
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <h1 className='text-4xl'>{currentState}</h1>
        <hr className='border-none h-'/>
      </div>
      {currentState === 'Увійти' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='order_input w-[400px]' placeholder='Імʼя' required />}

      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" className='order_input w-[400px]' placeholder='Адреса e-mail' required/>
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='order_input w-[400px]' placeholder='Пароль' required/>
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
