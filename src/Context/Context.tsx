import React, { createContext, useState } from 'react';

// Define the CartItem type
interface CartItem {
  id: number;
  image: string;
  name: string;
  // Add other properties if needed
}

10
*---------------------*export const AppContext = createContext<{
  addToCart: (productId: number) => void;
  cartItems: CartItem[];
}>({
  addToCart: () => {},
  cartItems: [],
});

export default function AppProvider({ children }: { children: React.ReactNode }) {
  // Initialize cartItems as an empty array
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (productId: number) => {
    const addedProducts = [...cartItems];

    // Assuming you have a product variable here
    const product = addedProducts.find((p) => p.id === productId);
    console.log("prod",product)
    if (product) {
      addedProducts.push({
        id: productId,
        image: product.image,
        name: product.name,
      });
    }

    // Update the cartItems state
    setCartItems(addedProducts);
  };

  // Define the context value
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
