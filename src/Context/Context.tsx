import React, { createContext, useEffect, useState } from 'react';
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
  const [cartItemCount, setCartItemCount] = useState(0)

  console.log('Carttt itemss', cartItems)

  const addToCart = (product: ProductDetails) => {
    setCartItems((prevCartItems)=> {
      const productInCart = prevCartItems.find((item)=> item.id === product.id);
    
      if (!productInCart) {
        const addedProducts = [
          ...prevCartItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image_url,
          },
        ];
        return addedProducts;
      }

      return prevCartItems;
    })

  }

  const updateCartCount = () =>{
    const totalCount = cartItems.reduce((count, item)=> count + 1, 0);
    setCartItemCount(totalCount);
  }

  useEffect(()=>{
    updateCartCount()
  },[cartItems])

  const contextValue = {
    addToCart,
    cartItems,
    cartItemCount
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}


