import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import { useQuery, gql } from '@apollo/client';
import Grid from '@mui/material/Grid'; 
import { useParams, Link } from 'react-router-dom';
import { AppContext } from "../Context/Context";
import { useContext, useState } from 'react';
import '@fontsource/roboto/300.css';
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



const ProductCard = () => {
  const { subCategoryTitle, categoryTitle } = useParams();
  const { data } = useQuery<{ subcategory_produktet_view: ProductCard[] }>(PRODUCTS, {
    variables: {
      subCategoryTitle: subCategoryTitle,
      categoryTitle: categoryTitle,
    },
  });
  const { addToWishlist } = useContext(AppContext);

  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  const handleAddToWishlist = (product: ProductCard) => {
    if (product) {
      addToWishlist(product);
    
      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        [product.produktet_id]: true,
      }));
    }
  };

  return (
    <>
      <div>
        <Grid container spacing={5} style={{ marginTop: '10px', marginLeft: '10px' }}>
          {data?.subcategory_produktet_view.map((item) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={item.subcategory_id}>
              <Card sx={{ maxWidth: 345, height: '100%' }}>
                <CardMedia sx={{ height: 350 }}  image={item.produktet_image_url} title={item.produktet_image_url} />
                <CardContent sx={{height: 70}}>
                  <Typography gutterBottom sx={{fontFamily: "roboto"}}>
                    {item.produktet_name}
                  </Typography>
                  <Typography gutterBottom variant=	'body1' sx={{color: "grey"}}>
                    ${item.produktet_price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/category/${categoryTitle}/${subCategoryTitle}/${item.produktet_id}`}>
                    <Button size="small">Details</Button>
                  </Link>
                  <IconButton
                    color={favorites[item.produktet_id] ? 'error' : 'default'} // Check the favorite status
                    size="small"
                    onClick={() => handleAddToWishlist(item)}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default ProductCard;


