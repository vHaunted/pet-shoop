import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import backendUrl from '../backendUrl'

const Add = () => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [subCategory, setSubCategory] = useState("")
  const [brand, setBrand] = useState("")

  const onSubmitHandler = async() => {
    e.preventDefault();

    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("brand", brand)

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + '/api/product/add', formData)
      console.log(response.data);
      
    } catch (error) {
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler}
     className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <p className="mb-4 font-semibold">Додайте зображення (від 1 до 4)</p>

        {/* Сітка зображень */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 sm:grid-cols-1">
          {/* Зображення 1 */}
          <div className="flex flex-col items-center justify-center">
            <label 
              htmlFor="image1"
              className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-amber-400 rounded-xl cursor-pointer hover:bg-amber-50 transition-colors duration-200"
            >
              <div className="text-center p-4">
                <img 
                  className="w-16 h-16 mx-auto mb-3 opacity-70" 
                  src={!image1 ? assets.upload_file : URL.createObjectURL(image1)} 
                  alt="Upload icon" 
                />
                <p className="text-gray-500 mb-1">Натисніть для завантаження</p>
                <p className="text-xs text-gray-400">PNG, JPG або JPEG</p>
              </div>
              <input 
                onChange={(e)=>setImage1(e.target.files[0])}
                type="file" 
                id="image1" 
                className="hidden" 
              />
            </label>
          </div>

          {/* Зображення 2 */}
          <div className="flex flex-col items-center justify-center">
            <label 
              htmlFor="image2"
              className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-amber-400 rounded-xl cursor-pointer hover:bg-amber-50 transition-colors duration-200"
            >
              <div className="text-center p-4">
                <img 
                  className="w-16 h-16 mx-auto mb-3 opacity-70" 
                  src={!image2 ? assets.upload_file : URL.createObjectURL(image2)} 
                  alt="Upload icon" 
                />
                <p className="text-gray-500 mb-1">Натисніть для завантаження</p>
                <p className="text-xs text-gray-400">PNG, JPG або JPEG</p>
              </div>
              <input 
                onChange={(e)=>setImage2(e.target.files[0])}
                type="file" 
                id="image2" 
                className="hidden" 
              />
            </label>
          </div>

          {/* Зображення 3 */}
          <div className="flex flex-col items-center justify-center">
            <label 
              htmlFor="image3"
              className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-amber-400 rounded-xl cursor-pointer hover:bg-amber-50 transition-colors duration-200"
            >
              <div className="text-center p-4">
                <img 
                  className="w-16 h-16 mx-auto mb-3 opacity-70" 
                  src={!image3 ? assets.upload_file : URL.createObjectURL(image3)}
                  alt="Upload icon" 
                />
                <p className="text-gray-500 mb-1">Натисніть для завантаження</p>
                <p className="text-xs text-gray-400">PNG, JPG або JPEG</p>
              </div>
              <input 
                onChange={(e)=>setImage3(e.target.files[0])}
                type="file" 
                id="image3" 
                className="hidden" 
              />
            </label>
          </div>

          {/* Зображення 4 */}
          <div className="flex flex-col items-center justify-center">
            <label 
              htmlFor="image4"
              className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-amber-400 rounded-xl cursor-pointer hover:bg-amber-50 transition-colors duration-200"
            >
              <div className="text-center p-4">
                <img 
                  className="w-16 h-16 mx-auto mb-3 opacity-70" 
                  src={!image4 ? assets.upload_file : URL.createObjectURL(image4)}
                  alt="Upload icon" 
                />
                <p className="text-gray-500 mb-1">Натисніть для завантаження</p>
                <p className="text-xs text-gray-400">PNG, JPG або JPEG</p>
              </div>
              <input 
                onChange={(e)=>setImage4(e.target.files[0])}
                type="file" 
                id="image4" 
                className="hidden" 
              />
            </label>
          </div>
        </div>

        <div className="space-y-6 mt-8">
          {/* Назва продукту */}
          <div>
            <label className="block mb-2 font-semibold">Назва продукту</label>
            <input
              className="w-full max-w-[720px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              type="text"
              placeholder="Введіть назву"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Опис продукту */}
          <div>
            <label className="block mb-2 font-semibold">Опис продукту</label>
            <textarea
              className="w-full max-w-[720px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[100px]"
              placeholder="Детальний опис продукту"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Категорія */}
            <div>
              <label className="block mb-2 font-semibold">Категорія</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Оберіть категорію</option>
                <option value="cats">Котам</option>
                <option value="dogs">Собакам</option>
                <option value="rodents">Гризунам</option>
                <option value="birds">Пташкам</option>
              </select>
            </div>

            {/* Підкатегорія */}
            <div>
              <label className="block mb-2 font-semibold">Підкатегорія</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="">Оберіть підкатегорію</option>
                <option value="food">Їжа</option>
                <option value="health">Здоров'я</option>
                <option value="bed">Ліжко</option>
                <option value="leash">Повідок</option>
              </select>
            </div>

            {/* Бренд */}
            <div>
              <label className="block mb-2 font-semibold">Бренд</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="">Оберіть бренд</option>
                <option value="royal-canin">Royal Canin</option>
                <option value="whiskas">Whiskas</option>
                <option value="purina">Purina</option>
                <option value="hills">Hill's</option>
              </select>
            </div>

            {/* Ціна */}
            <div>
              <label className="block mb-2 font-semibold">Ціна (₴)</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                type="number"
                placeholder="120"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-md transition-colors duration-200"
      >
        Додати продукт
      </button>
    </form>
  )
}

export default Add