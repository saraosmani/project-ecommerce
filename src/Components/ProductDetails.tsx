import { useContext, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; 
import { AppContext } from '../Context/Context';


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

  const { data } = useQuery<{ produktet: ProductDetails[] }>(PRODUCT_DETAILS);

  const { addToCart, removeProduct } =useContext(AppContext)

  if (!data) {
    return <div>Loading...</div>;
  }

  const product = data.produktet.find((p) => p.id === parseInt(productId));

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


  const handleButtonClick = (product: ProductDetails) => {

    if(product){
      addToCart(product);
    }

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
            onClick={() => handleButtonClick(product)}
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


