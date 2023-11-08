import { useContext } from "react"
// import AppProvider from "../Context/Context"
import { AppContext } from "../Context/Context";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

const Wishlist = () => {

  const { wishlist } = useContext(AppContext);

  console.log('wishlist ne komponent', wishlist)
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
          </CardContent>
            
          </Card>
        </Grid>
      ))}
     </Grid>
    </div>
  )
}

export default Wishlist
