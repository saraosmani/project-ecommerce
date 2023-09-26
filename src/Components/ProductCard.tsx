import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import Navbar from './Navbar';

export default function MediaCard() {
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div>
                <Card sx={{ maxWidth: 345, marginTop: "15px" }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="green iguana"
                    />
                    <CardContent >
                        <Typography gutterBottom variant="h5">
                            Lizard
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Details</Button>
                        <IconButton color="primary" size="small" >
                            <FavoriteBorderIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        </>
    );
}