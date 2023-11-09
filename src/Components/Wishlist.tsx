import { useContext } from "react"
// import AppProvider from "../Context/Context"
import { AppContext } from "../Context/Context";
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
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
    <Grid container spacing={4} style={{ marginTop: '10px', marginLeft: "55px" }}>
      {wishlist.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={6}>
          <Card  sx={{ display: 'flex', maxWidth:"500px", maxHeight:"350px"}}>
            <CardMedia
              component="img"
              alt={product.name}
              sx={{width: "250px" , height:"50%"}}  
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
  )
}

export default Wishlist
