
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import Navbar from './Navbar';
import { useQuery, gql } from '@apollo/client';
import Grid from '@mui/material/Grid'; // Import Grid component
import { useParams } from 'react-router-dom';

interface Products {
  subcategory_name: string;
  produktet_name: string;
  produktet_image_url: string;
  produktet_price: string;
  subcategory_id: number;
}

const PRODUCTS = gql`
query MyQuery($subCategoryTitle: String!) {
  subcategory_produktet_view(where: {subcategory_name: {_eq: $subCategoryTitle}}) {
    produktet_name
    produktet_image_url
    produktet_price
    subcategory_id
  }
}

`;



export default function ProductCard() {
  const {subCategoryTitle}= useParams()
  const { data } = useQuery<{  subcategory_produktet_view: Products[] }>(PRODUCTS, {
    variables: {
      subCategoryTitle: subCategoryTitle
    }
  }); // Destructure 'data'
  console.log('PRODUKTE', data);

  return (
    <>
      <div>
        <Navbar />
      </div>
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
                  <Button size="small">Details</Button>
                  <IconButton color="primary" size="small">
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
