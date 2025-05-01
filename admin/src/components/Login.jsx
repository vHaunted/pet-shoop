import React, {useState} from 'react'
import axios from 'axios'
import backendUrl from '../backendUrl'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            const response = await axios.post(backendUrl + '/api/user/admin', {email, password});
          } catch (error) {
           
          }
    }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='admin_panel shadow-md rounded-xl px-8 py-6 max-w-md'>
        <h1 className='font-semibold mb-3'>Адміністративна панель</h1>
        <form onSubmit={onSubmitHandler}>
            <div className='mb-3 min-w-72'>
                <p>E-mail адреса</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='bg-white rounded-xl w-full px-3 py-2 border border-stone-400 text-stone-500 mb-2' type="email" placeholder='your@email.com' required/>
            </div>
            <div>
                <p>Пароль</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='bg-white rounded-xl w-full px-3 py-2 border border-stone-400 text-stone-500 mb-2' type="password" placeholder='Введіть пароль' required/>
            </div>
            <button className='rounded-xl w-full py-2 px-3 mt-3 bg-amber-100 shadow-sm text-stone-700 font-bold' type='submit'>Увійти</button>
            
        </form>
      </div>
    </div>
  )
}

export default Login
