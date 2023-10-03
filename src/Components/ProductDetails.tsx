// import { useQuery, gql } from '@apollo/client';
// import { useParams } from 'react-router-dom';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';

//  interface ProductDetails {

//   id: number;
//   image_url: string;
//   name: string;
//   description: string;
//   price: string;

//  }

 

// const PRODUCT_DETAILS = gql`

// query MyQuery {
//     produktet {
//       id
//       image_url
//       name
//       description
//       price

//     }
//  }
// `

 
// const ProductDetails = () => {

//   const { productId} = useParams();
//   console.log('productttttt iddd', productId)
//   const { data } = useQuery<{  produktet: ProductDetails[] }>(PRODUCT_DETAILS); // Destructure 'data'
//   console.log('PRODUKTE', data);

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   const product = data.produktet.find((p) => p.id === parseInt(productId, 10));

//   if (!product) {
//     return <div>Product not found</div>;
//   }


//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <Paper style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
//         <img src={product.image_url} alt={product.name} style={{ width: '200px', height: '200px', marginRight: '20px' }} />
//         <div>
//           <Typography variant="h4" gutterBottom>
//             {product.name}
//           </Typography>

//           <Typography variant="body1" paragraph>
//             {product.description}
//           </Typography>

//           <Typography variant="h6">
//             Price: {product.price}
//           </Typography>
//         </div>
//       </Paper>
//     </div>
//     )
//   }
//   export default ProductDetails


//test
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; 

interface ProductDetails {
  id: number;
  image_url: string;
  name: string;
  description: string;
  price: string;
}

const PRODUCT_DETAILS = gql`
  query MyQuery {
    produktet {
      id
      image_url
      name
      description
      price
    }
  }
`;

const ProductDetails = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1); 
  console.log('productttttt iddd', productId);
  const { data } = useQuery<{ produktet: ProductDetails[] }>(PRODUCT_DETAILS);

  if (!data) {
    return <div>Loading...</div>;
  }

  const product = data.produktet.find((p) => p.id === parseInt(productId, 10));

  if (!product) {
    return <div>Product not found</div>;
  }

 
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () =>{
    console.log('addedd to cart')
  }

  return (
    <Box
      display="flex"
      flexDirection="column" 
      justifyContent="center"
      alignItems="center"
      height="500px"
      width="900px"
      marginTop="20px"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="20px"
        height="500px"
        width="900px"
      >
        <img
          src={product.image_url}
          alt={product.name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            marginRight: '20px',
          }}
        />
        <Box>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" sx={{ color: 'gray', fontWeight: 'bold' }}>
            ${product.price}
          </Typography>
          <Typography variant="body1" paragraph sx={{ marginTop: '20px' }}>
            {product.description}
          </Typography>
          <div>
            <Button variant="outlined" onClick={decreaseQuantity}>
              -
            </Button>
            <span style={{ margin: '0 10px' }}>{quantity}</span>
            <Button variant="outlined" onClick={increaseQuantity}>
              +
            </Button>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={addToCart}
            style={{ marginTop: '20px' }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
