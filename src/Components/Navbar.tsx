import React, { useContext, useState } from 'react';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AppContext } from '../Context/Context';
import { Badge } from '@mui/material';

interface Category {
    id: number;
    title: string;
}

interface Subcategory {
    subcategory_image_url: string;
    subcategory_name: string;
    category_id: number;
}

const CATEGORIES = gql`
  query MyQuery {
    categories {
      title
      id
    }
  }
`;

const SUBCATEGORY = gql`
  query MyQuery($title: String!) {
    subcategory_categories_view(where: { category_title: { _eq: $title } }) {
      subcategory_image_url
      subcategory_name
      category_id
    }
  }
`;

function Navbar() {
    const { categoryTitle } = useParams();
    const [drawer, setDrawer] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

    const { cartItemCount, wishlistItemCount } = useContext(AppContext);

    const { data } = useQuery<{ categories: Category[] }>(CATEGORIES, {
        variables: {
            title: categoryTitle,
        },
    });

    const { data: subcategoriesData } =
        useQuery<{ subcategory_categories_view: Subcategory[] }>(SUBCATEGORY, {
            variables: {
                title: hoveredCategory || '',
            },
            skip: !hoveredCategory,
        });

    const handleCategoryMouseEnter = (title: string) => {
        setHoveredCategory(title);
    };

    const handleCategoryMouseLeave = () => {
        setHoveredCategory(null);
    };

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setDrawer(open);
    };

    return (
        <div>
            <AppBar position="fixed" sx={{ width: '100%' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                    <IconButton color="inherit" sx={{ marginRight: '8px' }} component={Link}
                        to={"/user-profile"}>
                        <AccountCircleIcon />
                    </IconButton>
                    <IconButton color="inherit" sx={{ marginRight: '8px' }}
                        component={Link}
                        to={"/wishlist"}>
                        <Badge badgeContent={wishlistItemCount} color="secondary">
                            <FavoriteIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit" sx={{ marginRight: '8px' }} component={Link}
                        to={"/cart"}>
                        <Badge badgeContent={cartItemCount} color='secondary'>
                            <ShoppingCartIcon />
                        </Badge>


                    </IconButton>
                    <IconButton color="inherit" onClick={toggleDrawer(true)} edge="start" sx={{
                        marginLeft: '10px',
                        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',

                    }}>
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
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: "20px", marginTop: "15px" }}>
                        <IconButton color="inherit" onClick={toggleDrawer(false)} edge="end" >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <List sx={{ width: '350px' }}>
                        {data?.categories.map((category) => (
                            <div
                                key={category.id}
                                onMouseEnter={() => handleCategoryMouseEnter(category.title)}
                                onMouseLeave={handleCategoryMouseLeave}
                            >
                                <ListItem

                                    key={category.id}

                                >
                                    <ListItemText
                                        primary={
                                            <Typography variant="h6" fontWeight="bold">
                                                {category.title.charAt(0).toUpperCase() + category.title.slice(1)}
                                            </Typography>
                                        }
                                    />
                                    {hoveredCategory === category.title ? (
                                        <ExpandMoreIcon />
                                    ) : null}
                                </ListItem>
                                {hoveredCategory === category.title && (
                                    <List
                                        sx={{
                                            display: 'block',
                                            '&:hover': {
                                                display: 'block',
                                            },
                                        }}
                                    >
                                        {subcategoriesData?.subcategory_categories_view.map((subcategory) => (
                                            <ListItem
                                                button
                                                key={subcategory.category_id}
                                                component={Link}
                                                to={`/category/${category.title.toLowerCase()}/${subcategory.subcategory_name.toLowerCase()}`}
                                            >
                                                <ListItemText primary={
                                                    <Typography variant="subtitle1">
                                                        {subcategory.subcategory_name.charAt(0).toUpperCase() + subcategory.subcategory_name.slice(1)}
                                                    </Typography>
                                                }
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </div>
                        ))}
                    </List>
                </div>
            </Drawer>
        </div>
    );
}

export default Navbar;
