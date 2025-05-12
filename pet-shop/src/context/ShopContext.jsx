import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const currency = '₴';
  const delivery_fee = 10;

  const backendUrl = "http://localhost:4000";
  const [products, setProducts] = useState([]);

  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const [cartItems, setCartItems] = useState({ items: [] });

  const navigate = useNavigate();

  const addToCart = async (itemId) => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const product = products.find(p => p._id === itemId);
      if (!product) {
        toast.error("Товар не знайдено");
        return;
      }

      const res = await axios.post(`${backendUrl}/api/cart/add`, { itemId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.data.success) {
        setCartItems(res.data.cartData);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Помилка сервера");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/api/cart/update`, 
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setCartItems(res.data.cartData);
      await fetchCart(); // Оновити стан кошика
    } catch (error) {
      console.error("Помилка оновлення кількості:", error);
      toast.error("Не вдалося оновити кількість");
    }
  };

  const getCartCount = () => {
    if (!cartItems?.items) return 0;
    return cartItems.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartAmount = () => {
    // console.log('cartItems:', cartItems);
    // console.log('products:', products);
    
    if (!cartItems?.items || !Array.isArray(cartItems.items) || !products) {
      return 0;
    }

  return cartItems.items.reduce((total, item) => {
    // Шукаємо продукт в загальному списку або використовуємо попульований з кошика
    const product = products.find(p => p._id === item.product?._id) || item.product;
    
    if (!product || !product.price) {
      console.warn('Не знайдено ціну для продукту:', product);
      return total;
    }
    
    return total + (product.price * item.quantity);
    }, 0);
  };

  const getProductsData = async () => {
    try {
      const url = `${backendUrl}/api/product/list`;
      const response = await axios.get(url);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Деталі помилки:", error);
      toast.error("Помилка при отриманні товарів");
    }
  };

  const getUsercart = async (token) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {},
        {headers:{token}}
      )

      if(response.data.success){
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.error("Деталі помилки:", error);
      toast.error("Помилка при отриманні товарів");
    }
  }

  useEffect(() => {
    getProductsData();
  }, []);

  const fetchCart = useCallback(async () => {
    if (!token) {
      setCartItems({ items: [] });
      return;
    }

    try {
      const res = await axios.get(`${backendUrl}/api/cart/get`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const cartData = res.data.cartData || { items: [] };
      if (!Array.isArray(cartData.items)) {
        cartData.items = [];
      }

      setCartItems(cartData);
    } catch (error) {
      console.error("Помилка завантаження кошика:", error);
      setCartItems({ items: [] });
    }
  }, [token]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await getProductsData();
        await fetchCart(); // Використовуємо уніфіковану функцію
      } catch (error) {
        console.error("Помилка ініціалізації:", error);
      }
    };
    
    loadInitialData();
  }, [fetchCart]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
      setCartItems({ items: [] });
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    backendUrl,
    search, setSearch,
    showSearch, setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    fetchCart,
    navigate,
    token, 
    setToken: (newToken) => {
      setToken(newToken);
      // Оновлюємо кошик при зміні токена
      if (newToken) {
        fetchCart();
      } else {
        setCartItems({ items: [] });
      }
    },
    getUsercart
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
