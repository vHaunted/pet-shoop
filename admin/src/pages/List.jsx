import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backendUrl from '../backendUrl';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);
  const currency = '₴';

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products || response.data.message || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Не вдалося завантажити список продуктів");
      console.error(error);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove', 
        { id: productToDelete._id }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        toast.success(`Товар "${productToDelete.name}" успішно видалено`);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Не вдалося видалити товар");
      console.error("Помилка видалення:", error);
    } finally {
      setProductToDelete(null);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2'>Список усіх продуктів</p>
      <div className='flex flex-col gap-2'>

        {/* Products Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Зобр.</b>
          <b>Назва</b>
          <b>Категорія</b>
          <b>Підкатегорія</b>
          <b>Ціна</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product List */}
        {list.length > 0 ? (
          list.map((item) => (
            <div key={item._id} className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border'>
              <img 
                src={item.images?.[0] || assets.placeholder}  // Беремо перше зображення з масиву
                alt={item.name} 
                className='w-15 h-20 object-cover'
                onError={(e) => {
                  e.target.src = assets.placeholder; // Запасний варіант
                  console.error("Не вдалося завантажити:", item.images?.[0]); // Для діагностики
                }}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.subCategory}</p>
              <p>{currency}{item.price}</p>
              <div className="flex justify-center">
                <button 
                  onClick={() => handleDeleteClick(item)}
                >
                  <img className='w-6' src={assets.trash} alt="" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Немає продуктів для відображення</p>
        )}

        {/* Confirm Delete === === === */}
        {productToDelete && (
          <div className="confirm-delete-window fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h3 className="text-lg font-bold mb-4">Підтвердження видалення</h3>
              <p>Ви впевнені, що хочете видалити товар <strong>"{productToDelete.name}"</strong>?</p>
              
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  onClick={() => setProductToDelete(null)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Скасувати
                </button>
                <button 
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Видалити
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default List;