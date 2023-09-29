import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
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

`




const ProductDetails = () => {
  const { productId} = useParams();
  console.log('productttttt iddd', productId)
  const { data } = useQuery<{  produktet: ProductDetails[] }>(PRODUCT_DETAILS); // Destructure 'data'
  console.log('PRODUKTE', data);

  if (!data) {
    return <div>Loading...</div>;
  }

  const product = data.produktet.find((p) => p.id === parseInt(productId, 10));

  if (!product) {
    return <div>Product not found</div>;
  }
  
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
        <img src={product.image_url} alt={product.name} style={{ width: '200px', height: '200px', marginRight: '20px' }} />
        <div>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="h6">
            Price: {product.price}
          </Typography>
        </div>
      </Paper>
    </div>
    )
  }
  
  export default ProductDetails