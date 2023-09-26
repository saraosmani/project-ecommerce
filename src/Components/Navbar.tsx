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
import { Link } from 'react-router-dom';

function Navbar() {
    const [drawer, setDrawer] = useState(false)

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setDrawer(open);
    };

    const menuItems = [
        { text: 'Women', link: '/women' },
        { text: 'Men', link: '/men' },

    ];
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
                    <List
                        sx={{ width: "350px" }}>
                        {menuItems.map((item) => (
                            <ListItem
                                button
                                key={item.text}
                                component={Link}
                                to={item.link}
                            >
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </div>
    );
}

export default Navbar;

