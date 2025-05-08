import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const currency = '₴';
    const delivery_fee = 10;

    const backendUrl = "http://localhost:4000";
    if (!backendUrl) {
        console.error("Помилка: VITE_BACKEND_URL не визначено у .env файлі");
        toast.error("Помилка конфігурації сервера");
      } else {
        console.log("Бекенд URL:", backendUrl); 
      }
    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({}); 
    const navigate = useNavigate();

    const addToCart = (itemId, size) => {

        setCartItems(prevItems => {
            const newItems = {...prevItems};
            
            if(newItems[itemId]) {
                if(newItems[itemId][size]) {
                    newItems[itemId][size] += 1;
                } else {
                    newItems[itemId][size] = 1;
                }
            } else {
                newItems[itemId] = {[size]: 1};
            }
            
            return newItems;
        });
    }

    const getCartCount = () => {
        return Object.values(cartItems).reduce((total, sizes) => {
          return total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0);
        }, 0);
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        
        cartData[itemId][size] = quantity;

        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const productId in cartItems) {
          for (const size in cartItems[productId]) {
            const quantity = cartItems[productId][size];
            if (quantity > 0) {
              const product = products.find(p => p._id === productId);
              if (product) {
                totalAmount += product.price * quantity;
              }
            }
          }
        }
        return totalAmount;
      };

    // GET PRODUCTS FROM BACKEND ===============
    const getProductsData = async () => {
        try {
          const url = `${backendUrl}/api/product/list`;
          console.log("Повний URL запиту:", url);
          
          const response = await axios.get(url);
          console.log("Відповідь сервера:", response);
          
          if (response.data.success) {
            setProducts(response.data.products);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.error("Деталі помилки:", {
            message: error.message,
            response: error.response,
            config: error.config
          });
          toast.error("Помилка при отриманні товарів");
        }
    }

    useEffect(() => {
        getProductsData();
    }, []);

    const value = {
        products, 
        currency, 
        delivery_fee,

        backendUrl,

        search, 
        setSearch, 
        showSearch, 
        setShowSearch,
        cartItems, 
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;