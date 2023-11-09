import { Grid, Card, CardActionArea, CardMedia , Typography} from '@mui/material';
import { Link} from 'react-router-dom';
import AllProducts from './AllProducts';

const HomepageContent = () => {

  return (
    <>
    <Grid container spacing={0}>
      <Grid item xs={6}>
        <Link to="/women">
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Woman"
                height="100%"
                image="https://static.pullandbear.net/2/cms/assets/uploads/destacado2Desktop_1.jpg?imwidth=2000&impolicy=pullandbear-itxmediumhigh&imformat=chrome&ts=20231109072325"
                style={{ objectFit: 'cover' }}
              />
               <Typography
                variant="h5"
                component="div"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#fff',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                Women Collection
              </Typography>
            </CardActionArea>
          </Card>
        </Link>
      </Grid>

      <Grid item xs={6}>
        <Link to="/men">
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Boy"
                height="100%"
                image="https://static.pullandbear.net/2/cms/assets/uploads/destacado1H_1.jpg?imwidth=2000&impolicy=pullandbear-itxmediumhigh&imformat=chrome&ts=20231109072325"
                style={{ objectFit: 'cover' }}
              />
              <Typography
                variant="h5"
                component="div"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#fff',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                Men Collection
              </Typography>
            </CardActionArea>
          </Card>
        </Link>
      </Grid>
    </Grid>
      <Typography  variant="h4" sx={{display: "flex", justifyContent: "center", alignItems: "center", mt: "25px"}}>
      View all products
    </Typography>
    <AllProducts/>
    </>
  );
}

export default HomepageContent;
