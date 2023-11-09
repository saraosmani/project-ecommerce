import React, { createContext, useEffect, useState } from 'react';
import ProductDetails from '../Components/ProductDetails';
import ProductCard from '../Components/ProductCard';

interface CartItem {
  id: number;
  image: string;
  name: string;
  price: string;
}

interface WishlistItem {
  id: number;
  image: string;
  name: string;
  price: string;
}

export const AppContext = createContext<{
  addToCart: (product: ProductDetails) => void;
  cartItems: CartItem[];
  cartItemCount: number;
  addToWishlist: (product: ProductCard) => void;
  wishlist: WishlistItem[];
  wishlistItemCount: number;
  removeProductFromWishlist: (product:WishlistItem) => void
  removeProductFromCart: (product:CartItem) => void
}>({
  addToCart: () => {},
  addToWishlist: ()=>{},
  removeProductFromWishlist: () => {},
  removeProductFromCart: () => {},
  cartItems: [],
  cartItemCount: 0,
  wishlist: [],
  wishlistItemCount: 0 ,
 
});

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [wishlistItemCount, setWishlistItemCount] = useState(0);

  const [wishlist, setWishlist] = useState<WishlistItem[]>([]); 

  console.log('Carttt itemss', cartItems)

  console.log('wishlist itemss', wishlist)

  //Add to cart function
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

  //Badge functionality
  const updateCartCount = () =>{
    const totalCount = cartItems.length;
    setCartItemCount(totalCount);
  }

  useEffect(()=>{
    updateCartCount()
  },[cartItems])

  const updateWishlistCount = () =>{
    const totalCount = wishlist.length;
    setWishlistItemCount(totalCount);
  }

  useEffect(()=>{
    updateWishlistCount()
  },[wishlist])

  //Add to wishlist function
  const addToWishlist = (product: ProductCard) => {
    setWishlist((prevWishlist) => {
      const productInWishlist = prevWishlist.find((item) => item.id === product.produktet_id);

      if (!productInWishlist) {
        const addedProducts = [
          ...prevWishlist,
          {
            id: product.produktet_id,
            name: product.produktet_name,
            price: product.produktet_price,
            image: product.produktet_image_url,
          },
        ];
        return addedProducts;
      }

      return prevWishlist;
    });
};

const removeProductFromWishlist= ( product: WishlistItem) => {
 const removeFromWishlist= wishlist.filter((item)=> item.id !== product.id)
 setWishlist(removeFromWishlist)
}

const removeProductFromCart= (product: CartItem) => {
   const removeFromCart= cartItems.filter((item)=> item.id !== product.id )
   setCartItems(removeFromCart)
}
  const contextValue = {
    addToCart,
    cartItems,
    cartItemCount,
    addToWishlist, 
    wishlist, 
    wishlistItemCount,
    removeProductFromWishlist,
    removeProductFromCart
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}


