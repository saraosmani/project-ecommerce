import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import { useQuery, gql } from '@apollo/client';
import Grid from '@mui/material/Grid'; 
import { useParams, Link } from 'react-router-dom';
import { AppContext } from "../Context/Context";
import { useContext } from 'react';

interface ProductCard {
  subcategory_name: string;
  produktet_name: string;
  produktet_image_url: string;
  produktet_price: string;
  subcategory_id: number;
  category_title: string;
  produktet_id: number;
}

const PRODUCTS = gql`

query MyQuery($subCategoryTitle: String!, $categoryTitle: String!) {
  subcategory_produktet_view(where: {category_title: {_eq: $categoryTitle}, subcategory_name: {_eq: $subCategoryTitle}}) {
    produktet_name
    produktet_image_url
    produktet_description
    produktet_id
    produktet_price
  }
}

`;



const ProductCard = ()=> {
  const {subCategoryTitle, categoryTitle}= useParams();

  const { data } = useQuery<{  subcategory_produktet_view: ProductCard[] }>(PRODUCTS, {
    variables: {
      subCategoryTitle: subCategoryTitle, 
      categoryTitle: categoryTitle
    }
  }); 
  const { addToWishlist } = useContext(AppContext);
  console.log('PRODUKTE', data);

  const handleAddToWishlist = (product: ProductCard) =>{

    if(product) {
      addToWishlist(product);
    }
    
  }
 

  return (
    <>
      <div>
        <Grid container spacing={2} style={{marginTop: '10px', marginLeft: '10px'}}> {/* Create a Grid container */}
          {data?.subcategory_produktet_view.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.subcategory_id}> {/* Specify grid item size for different screen sizes */}
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                sx={{ height: 300 }}
                  image={item.produktet_image_url}
                  title={item.produktet_image_url}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {item.produktet_name}
                  </Typography>
                  <Typography gutterBottom variant="h6">
                    {item.produktet_price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/category/${categoryTitle}/${subCategoryTitle}/${item.produktet_id}`}>
                    <Button size="small">Details</Button>
                  </Link>
                  
                  <IconButton color="primary" size="small" onClick={()=> handleAddToWishlist(item)}>
                    <FavoriteBorderIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default ProductCard;