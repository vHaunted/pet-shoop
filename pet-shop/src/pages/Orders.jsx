import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const Orders = () => { 
  const { products, currency } = useContext(ShopContext);

  // Перевірка наявності продуктів
  if (!products || products.length === 0) {
    return (
      <div className='border-t pt-16'>
        <div className='text-2xl mb-4'>
          <h1>Ваші замовлення</h1>
        </div>
        <p>Немає доступних замовлень</p>
      </div>
    )
  }

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl mb-6'>
        <h1>Ваші замовлення</h1>
      </div>

      <div className='space-y-4'>
        {products.slice(1, 4).map((item) => ( // Беремо перші 3 продукти
          <div key={item._id} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center gap-6'>
            <img 
              className='w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-lg' 
              src={item.image[0]} 
              alt={item.name} 
            />
            <div className='flex-1'>
              <h3 className='font-medium'>{item.name}</h3>
              <p className='text-orange-700 mt-1'>
                {currency}{item.price.toFixed(2)}
              </p>
            </div>
            {/* <div className='text-sm text-gray-500'>
              Статус: <span className='text-green-600'>Доставлено</span>
            </div> */}

            <div className=' flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>Доставлено</p>
                <p></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders 