import { createContext, useEffect, useState } from "react";
import { products } from '../assets/assets';
import { toast } from "react-toastify";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const currency = '₴';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({}); // Виправлено setCartItem → setCartItems

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
        getCartCount
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;