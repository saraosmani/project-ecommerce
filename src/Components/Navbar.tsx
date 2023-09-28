import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

interface Category {
    id: number;
    title: string;
  }

const CATEGORIES= gql`query MyQuery {
    categories {
      title
      id
    }
  }`

function Navbar() {
    const {categoryTitle} = useParams();
    const [drawer, setDrawer] = useState(false)
    const { loading, error, data } = useQuery<{ categories: Category[] }>(CATEGORIES, {
        variables: {
            title: categoryTitle
        }
    });
    console.log("category",data)


    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setDrawer(open);
    };


    return (
        <div>
            <AppBar position="static" sx={{ width: "100%" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    </Typography>
                    <IconButton color="inherit">
                        <AccountCircleIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <ShoppingCartIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={toggleDrawer(true)}
                        edge="start">
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="right" open={drawer} onClose={toggleDrawer(false)}>
                <div
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                     <IconButton color="inherit" onClick={toggleDrawer(false)}
                        edge="start">
                        <CloseIcon />
                    </IconButton>
                    <List sx={{ width: '350px' }}>
            {data?.categories.map((item) => (
              <ListItem button key={item.id} component={Link} to={`/category/${item.title.toLocaleLowerCase()}`} >
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
                </div>
            </Drawer>
        </div>
    );
}

export default Navbar;

