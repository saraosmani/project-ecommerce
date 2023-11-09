import { useContext } from "react";
import { AppContext } from "../Context/Context";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
interface CartItem {
  id: number;
  image: string;
  name: string;
  price: string;
}


const Cart = () => {
  const { cartItems, removeProductFromCart } = useContext(AppContext);

  const handleDelete = (product: CartItem) => {
    removeProductFromCart(product)
  }

  return (
    <Grid container spacing={4} style={{ marginTop: '10px', marginLeft: "55px" }}>
      {cartItems.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={6}>
          <Card sx={{ display: 'flex', maxWidth:"500px", maxHeight:"350px"}}>
            <CardMedia
              component="img"
              alt={product.name}
              sx={{width: "250px" , height:"80%"}}
              image={product.image}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' , justifyContent:"center"}}>
            <CardContent >
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2" sx={{color:"grey"}}>Price: {product.price}</Typography>
            </CardContent>
            <Box ml="10px">
              <Button onClick={() => handleDelete(product)}>Remove</Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cart;

