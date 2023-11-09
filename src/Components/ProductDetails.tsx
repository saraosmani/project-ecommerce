import { useContext, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AppContext } from '../Context/Context';
import { Card, CardContent, CardMedia, Stack } from '@mui/material';

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
  console.log("idddd", productId)
  const { data } = useQuery<{ produktet: ProductDetails[] }>(PRODUCT_DETAILS);
  const { addToCart } = useContext(AppContext)

  if (!data) {
    return <div>Loading...</div>;
  }

  const product = data.produktet.find((p) => p.id == parseInt(productId));

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
    if (product) {
      addToCart(product);
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center" // Set the minimum height to fill the viewport
    >
      <Card sx={{ display: 'flex', mt: "80px",boxShadow:"none" }} >


        <CardMedia
          component="img"
          alt={product.name}
          height="700"
          image={product.image_url}
          sx={{ width: "45%" }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", ml: "60px" }}>
          <CardContent>
            <Box mt="20px" sx={{mb:"50px"}}>
              <Typography variant="h4" gutterBottom sx={{ mb: "20px" }}>
                {product.name}
              </Typography>
              <Typography variant="body1" paragraph >
                {product.description}

              </Typography>
            </Box>
            <Typography variant="h6" sx={{ color: 'gray', fontWeight: 'bold', mb: "20px" }}>
              ${product.price}
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
          </CardContent>
        </Box>

      </Card>

    </Box>
  );
};

export default ProductDetails;
