import { useContext } from "react"
import { AppContext } from "../Context/Context"
import Card from "@mui/material/Card"
import { CardContent, CardMedia, Typography } from "@mui/material";

const Cart = () => {

  const {cartItems}= useContext(AppContext);

  console.log('cartItemssssssss', cartItems)
  return (
    <div>
      {cartItems.map((product) => (
        <Card key={product.id} style={{marginTop: '100px', marginBottom:'10px', width: '500px'}}>

          <CardMedia 
            component="img"
            alt={product.name}
            height="140"
            image={product.image}
          />
            <CardContent>
              <Typography>{product.id}</Typography>
              <Typography>{product.name}</Typography>
              <Typography>{product.price}</Typography>
            </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Cart
