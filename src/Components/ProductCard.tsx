
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

interface Products {
  id: number;
  name: string;
  price: string;
  description: string;
  image_url: string;
}

const PRODUCTS = gql`
  query MyQuery {
    produktet {
      description
      id
      image_url
      name
      price
    }
  }
`;



export default function ProductCard() {
  const { data } = useQuery<{ produktet: Products[] }>(PRODUCTS); // Destructure 'data'
  console.log('PRODUKTE', data);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Grid container spacing={2} style={{marginTop: '10px', marginLeft: '10px'}}> {/* Create a Grid container */}
          {data?.produktet.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}> {/* Specify grid item size for different screen sizes */}
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                sx={{ height: 300 }}
                  image={item.image_url}
                  title={item.image_url}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {item.name}
                  </Typography>
                  <Typography gutterBottom variant="h6">
                    {item.price}
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
