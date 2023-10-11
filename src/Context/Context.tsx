// import React, { createContext, useState } from 'react';

// interface CartItem {
//   id: number;
//   image: string;
//   name: string;
//   price: string;
// }

// export const AppContext = createContext<{
//   addToCart: (productId: number) => void;
//   cartItems: CartItem[];
// }>({
//   addToCart: () => {},
//   cartItems: [],
// });

// export default function AppProvider({ children }: { children: React.ReactNode }) {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   // const addToCart = (productId: number) => {
//   //   const addedProducts = [...cartItems];

//   //   const product = addedProducts.find((p) => p.id === productId);
//   //   console.log("add to cart func",product);

//   //   if (product) {
//   //     addedProducts.push({
//   //       id: productId,
//   //       image: product.image,
//   //       name: product.name,
//   //     });
//   //   }

//   //   console.log('')
//   //   setCartItems([...cartItems, product]);
//   // };

//     // const addToCart = (productId: number) => {

//     //   const addedProducts = [...cartItems];

//     //   const product = addedProducts.find((p) => p.id === productId);
//     //   console.log("add to cart func",product);

      
//     //     const newCartItem = {
//     //       id: productId,
//     //       name: product.name,
//     //     };
//     //   console.log('new item added', newCartItem)
//     //   setCartItems([...cartItems, newCartItem]);
//     //   };

//     const addToCart = (product) => {

//       const addedProducts = [...cartItems];

//       addedProducts.push({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         image: product.image
      
//       });
    

//       setCartItems([...addedProducts]);

//       console.log('added products statee', addedProducts)
//     };



//       const contextValue = {
//         addToCart,
//         cartItems,
//       };

//   return (
//     <AppContext.Provider value={contextValue}>
//       {children}
//     </AppContext.Provider>
//   );
// }


////////////////////////////////
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

  // const addToCart = (productId: number) => {
  //   const addedProducts = [...cartItems];

  //   const product = addedProducts.find((p) => p.id === productId);
  //   console.log("add to cart func",product);

  //   if (product) {
  //     addedProducts.push({
  //       id: productId,
  //       image: product.image,
  //       name: product.name,
  //     });
  //   }

  //   console.log('')
  //   setCartItems([...cartItems, product]);
  // };

    // const addToCart = (productId: number) => {

    //   const addedProducts = [...cartItems];

    //   const product = addedProducts.find((p) => p.id === productId);
    //   console.log("add to cart func",product);

      
    //     const newCartItem = {
    //       id: productId,
    //       name: product.name,
    //     };
    //   console.log('new item added', newCartItem)
    //   setCartItems([...cartItems, newCartItem]);
    //   };

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


