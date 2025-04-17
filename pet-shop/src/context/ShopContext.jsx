import { createContext, useEffect, useState } from "react";
import { products } from '../assets/assets';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const currency = '₴';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({}); // Виправлено setCartItem → setCartItems
    const navigate = useNavigate();

    const addToCart = (itemId, size) => {
        // if(!size) {
        //     toast.error('Select Product Size');
        //     return
        // }

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

    const value = {
        products, 
        currency, 
        delivery_fee,
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