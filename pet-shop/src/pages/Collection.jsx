import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import ProductItem from '../components/ProductItem'
import { useSearchParams } from 'react-router-dom'

const Collection = ({ defaultCategory }) => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [showAllSections, setShowAllSections] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  

  const safeDecodeArray = (param) => {
    try {
      return param ? decodeURIComponent(param).split(',') : [];
    } catch {
      return [];
    }
  };
  
  // Стани для фільтрів
  const [category, setCategory] = useState(() => {
    const urlCategory = searchParams.get('category');
    return urlCategory ? [urlCategory] : (defaultCategory ? [defaultCategory] : []);
  });
  const [subCategory, setSubCategory] = useState(() => {
    const urlSubCategory = searchParams.get('subcategory');
    return urlSubCategory ? urlSubCategory.split(',') : [];
  });
  const [brand, setBrand] = useState(() => {
    const urlBrand = searchParams.get('brand');
    return urlBrand ? urlBrand.split(',') : [];
  });
  const [priceRange, setPriceRange] = useState(() => ({
    min: searchParams.get('min_price') || '',
    max: searchParams.get('max_price') || ''
  }));
  const [sortType, setSortType] = useState(searchParams.get('sort') || 'relevant');

  // Категорії для фільтрів
  const categories = ['cats', 'dogs', 'rodents', 'birds'];
  const subCatTranslations = {
    'dry_food': 'Сухий корм',
    'conserve': 'Консерви',
    'health': 'Здоров\'я'
  };
  const subCategories = ['dry_food', 'conserve', 'health'];
  const brands = ['purina', 'royal_canin', 'hills'];

  // Головний ефект для фільтрації та сортування
  useEffect(() => {
    let filtered = products || [];
    
    // Пошук
    if (showSearch && search) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Фільтри
    if (category.length > 0) {
      filtered = filtered.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter(item => {
        // Перевіряємо як масив так і рядок
        const itemSubCats = Array.isArray(item.subCategory) 
          ? item.subCategory 
          : [item.subCategory];
        return itemSubCats.some(sc => subCategory.includes(sc));
      });
    }

    if (brand.length > 0) {
      filtered = filtered.filter(item => brand.includes(item.brand));
    }

    // Фільтр ціни
    if (priceRange.min !== '' || priceRange.max !== '') {
      filtered = filtered.filter(item => {
        const price = item.price;
        return (
          (priceRange.min === '' || price >= priceRange.min) &&
          (priceRange.max === '' || price <= priceRange.max)
        );
      });
    }

    // Сортування
    let sorted = [...filtered];
    switch(sortType) {
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default: // "relevant" - оригінальний порядок
        break;
    }

    setFilterProducts(sorted);
  }, [products, search, showSearch, category, subCategory, brand, priceRange, sortType]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (category.length > 0) {
      params.set('category', category.join(','));
    }
    if (subCategory.length > 0) {
      params.set('subcategory', subCategory.join(','));
    }
    if (brand.length > 0) {
      params.set('brand', brand.join(','));
    }
    if (priceRange.min) {
      params.set('min_price', priceRange.min);
    }
    if (priceRange.max) {
      params.set('max_price', priceRange.max);
    }
    if (sortType !== 'relevant') {
      params.set('sort', sortType);
    }

    setSearchParams(params);
  }, [category, subCategory, brand, priceRange, sortType, setSearchParams]);

  // Функції для фільтрації
  const toggleFilter = (filterType, value) => {
    const setters = {
      category: setCategory,
      subCategory: setSubCategory,
      brand: setBrand
    };
    setters[filterType](prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: value === '' ? '' : Number(value)
    }));
  };

  // BODY
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Фільтри */}
      <div className='form-container flex flex-col gap-2 sm:gap-4 md:gap-6'>
        <div className='min-w-60'>
          {/* Кнопка фільтрів для малих екранві */}
          <div 
            onClick={() => setShowFilter(!showFilter)} 
            className='my-2 text-xl flex items-center cursor-pointer gap-2 sm:cursor-default'
          >
            Фільтри
            <img 
              className={`h-4 pl-2 sm:hidden ${showFilter ? 'rotate-90' : ''}`} 
              src={assets.angle_right} 
              alt="toggle filters" 
            />
          </div>
          
          {/* Фільтр брендів */}
          <div className={`form-filter ${showFilter ? '' : 'hidden'} sm:block mb-6`}>
            <p className='pb-3 font-medium'>Бренд</p>
            <div className='flex flex-col gap-2 text-sm text-gray-700'>
              {brands.map(brandItem => (
                <label key={brandItem} className='flex items-center gap-2 capitalize'>
                <input 
                  type="checkbox" 
                  value={brandItem}
                  checked={brand.includes(brandItem)}
                  onChange={() => toggleFilter('brand', brandItem)}
                  className='w-4 h-4'
                />
                {brandItem
                  .split('_') // Разделяем строку по "_"
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Делаем первую букву заглавной
                  .join(' ')} {/* Объединяем слова с пробелами */}
              </label>
              ))}
            </div>
          </div>

          {/* Фільтр категорій */}
          <div className={`form-filter ${showFilter ? '' : 'hidden'} sm:block mb-6`}>
            <p className='pb-3 font-medium'>Категорія</p>
            <div className='flex flex-col gap-2 text-sm text-gray-700'>
              {categories.map(cat => (
                <label key={cat} className='flex items-center gap-2 capitalize'>
                  <input 
                    type="checkbox" 
                    value={cat}
                    checked={category.includes(cat)}
                    onChange={() => toggleFilter('category', cat)}
                    className='w-4 h-4'
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Усі розділи */}
          <div className={`form-filter ${showFilter ? '' : 'hidden'} sm:block`}>
            <div className='flex justify-between items-center pb-3'>
              <p className='font-medium'>Усі розділи</p>
              <button 
                onClick={() => setShowAllSections(!showAllSections)}
                className='all_subcat_butt'
              >
                {showAllSections ? 'Приховати' : 'Показати всі'}
              </button>
            </div>

            {/* Список підкатегорій з анімацією */}
            <div className={`flex flex-col gap-2 text-sm text-gray-700 transition-all duration-300 overflow-hidden ${
              showAllSections ? 'max-h-[1000px]' : 'max-h-[120px]'
            }`}>
              {subCategories.map(subCat => (
                <label key={subCat} className='flex items-center gap-2'>
                  <input 
                    type="checkbox" 
                    value={subCat}
                    checked={subCategory.includes(subCat)}
                    onChange={() => toggleFilter('subCategory', subCat)}
                    className='w-4 h-4'
                  />
                  {subCatTranslations[subCat] || subCat}
                </label>
              ))}
            </div>
          </div>

          {/* Фільтр ціни */}
          <div className={`form-filter ${showFilter ? '' : 'hidden'} sm:block mt-6`}>
            <p className='pb-3 font-medium'>Ціна</p>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-2'>
                <span>від</span>
                <input
                  type="number"
                  name="min"
                  value={priceRange.min}
                  onChange={handlePriceChange}
                  className='w-20 border rounded px-2 py-1 text-sm'
                  placeholder='Мін'
                  min="0"
                />
                <span>₴</span>
              </div>
              <div className='flex items-center gap-2'>
                <span>до</span>
                <input
                  type="number"
                  name="max"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                  className='w-20 border rounded px-2 py-1 text-sm'
                  placeholder='Макс'
                  min="0"
                />
                <span>₴</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <h1>Усі зоотовари ({filterProducts.length})</h1>
          <select 
            onChange={(e) => setSortType(e.target.value)}
            value={sortType}
            className='border-2 border-orange-200 rounded-xl text-sm px-2'>
            <option value="relevant">За замовчуванням</option>
            <option value="low-high">Від дешевих до дорогих</option>
            <option value="high-low">Від дорогих до дешевих</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem 
                key={item._id} 
                name={item.name} 
                _id={item._id} 
                price={item.price} 
                image={item.image}
              />
            ))
          ) : (
            <div className='col-span-full text-center py-10'>
              <p>Товари не знайдено. Спробуйте змінити параметри фільтрації.</p>
            </div>
          )}
        </div>
      </div>
    </div>
      
  );
};

export default Collection