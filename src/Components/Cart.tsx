import { useContext } from "react";
import { AppContext } from "../Context/Context";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
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
    <Grid container spacing={2}>
      {cartItems.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardMedia
              component="img"
              alt={product.name}
              height="140"
              image={product.image}
              style={{ objectFit: "contain", width: "100%", height: "140px" }}
            />
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography>ID: {product.id}</Typography>
              <Typography>Price: {product.price}</Typography>
              <Button onClick={() => handleDelete(product)}>Remove</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cart;

