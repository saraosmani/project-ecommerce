import { useContext } from "react"
// import AppProvider from "../Context/Context"
import { AppContext } from "../Context/Context";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Button } from "@mui/material";
interface WishlistItem {
  id: number;
  image: string;
  name: string;
  price: string;
}

const Wishlist = () => {

  const { wishlist,removeProductFromWishlist } = useContext(AppContext);
  console.log('wishlist ne komponent', wishlist)
 
  const handleDelete = (product:  WishlistItem) => {
    removeProductFromWishlist(product)
    console.log("ss",wishlist)
  }
  return (
    <div>
     <Grid container spacing={2}>
      {wishlist.map((product)=>(
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardMedia
              component="img"
              alt={product.name}
              height="140"
              image={product.image}
              style={{objectFit: "contain", width: "100%", height: "140px"}}
            />
          <CardContent>
            <Typography variant="h6">{product.name}</Typography>
            <Typography>ID: {product.id}</Typography>
            <Typography>Price: {product.price}</Typography>
            <Button onClick={() => handleDelete(product)}> Remove</Button>
          </CardContent>
            
          </Card>
        </Grid>
      ))}
     </Grid>
    </div>
  )
}

export default Wishlist
