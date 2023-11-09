import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useQuery, gql } from '@apollo/client';
import Grid from '@mui/material/Grid'; 
import '@fontsource/roboto/300.css';

interface AllProducts {
    description: string;
    id: number;
    image_url: string;
    name: string;
    price: number;
}

const ALL_PRODUCTS = gql`
query AllProducts {
    produktet {
      description
      id
      image_url
      name
      price
    }
  }

`;



const AllProducts = () => {
//   const { subCategoryTitle, categoryTitle } = useParams();
  const { data } = useQuery<{ produktet: AllProducts[] }>(ALL_PRODUCTS);


  console.log("data",data)
  return (
    <>
      <div>
        <Grid container spacing={5} style={{ marginTop: '4px', marginLeft: '10px' }}>
          {data?.produktet.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Card sx={{ maxWidth: 320, height: '100%' }}>
                <CardMedia sx={{ height: 300 }}  image={item.image_url} title={item.name} />
                <CardContent  sx={{ height: 80 }}>
                  <Typography gutterBottom  sx={{fontFamily: "roboto"}}>
                    {item.name}
                  </Typography>
                  <Typography gutterBottom variant=	'body1' sx={{color: "grey"}}>
                   $ {item.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default AllProducts;

