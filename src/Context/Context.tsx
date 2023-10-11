import React, { createContext, useState } from 'react';
import ProductDetails from '../Components/ProductDetails';

interface CartItem {
  id: number;
  image: string;
  name: string;
  price: string;
}

export const AppContext = createContext<{
  addToCart: (product: ProductDetails) => void;
  cartItems: CartItem[];
}>({
  addToCart: () => {},
  cartItems: [],
});

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: ProductDetails) => {
  const addedProducts = [...cartItems];

    addedProducts.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url
      
    });
    
    setCartItems([...addedProducts]);

      console.log('added products statee', addedProducts)
  };


  const contextValue = {
    addToCart,
    cartItems,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}


