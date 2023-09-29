// // import React, { useState } from 'react';
// // import AppBar from '@mui/material/AppBar';
// // import Toolbar from '@mui/material/Toolbar';
// // import Typography from '@mui/material/Typography';
// // import IconButton from '@mui/material/IconButton';
// // import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// // import FavoriteIcon from '@mui/icons-material/Favorite';
// // import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// // import MenuIcon from '@mui/icons-material/Menu';
// // import Drawer from '@mui/material/Drawer';
// // import List from '@mui/material/List';
// // import ListItem from '@mui/material/ListItem';
// // import ListItemText from '@mui/material/ListItemText';
// // import CloseIcon from '@mui/icons-material/Close';
// // import { Link, useParams } from 'react-router-dom';
// // import { useQuery, gql } from '@apollo/client';

// // interface Category {
// //     id: number;
// //     title: string;
// //   }

// // const CATEGORIES= gql`query MyQuery {
// //     categories {
// //       title
// //       id
// //     }
// //   }`

// // function Navbar() {
// //     const {categoryTitle} = useParams();
// //     const [drawer, setDrawer] = useState(false)
// //     const { loading, error, data } = useQuery<{ categories: Category[] }>(CATEGORIES, {
// //         variables: {
// //             title: categoryTitle
// //         }
// //     });
// //     console.log("category",data)


// //     const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
// //         if (
// //             ((event as React.KeyboardEvent).key === 'Tab' ||
// //                 (event as React.KeyboardEvent).key === 'Shift')
// //         ) {
// //             return;
// //         }

// //         setDrawer(open);
// //     };


// //     return (
// //         <div>
// //             <AppBar position="static" sx={{ width: "100%" }}>
// //                 <Toolbar>
// //                     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
// //                     </Typography>
// //                     <IconButton color="inherit">
// //                         <AccountCircleIcon />
// //                     </IconButton>
// //                     <IconButton color="inherit">
// //                         <FavoriteIcon />
// //                     </IconButton>
// //                     <IconButton color="inherit">
// //                         <ShoppingCartIcon />
// //                     </IconButton>
// //                     <IconButton color="inherit" onClick={toggleDrawer(true)}
// //                         edge="start">
// //                         <MenuIcon />
// //                     </IconButton>
// //                 </Toolbar>
// //             </AppBar>
// //             <Drawer anchor="right" open={drawer} onClose={toggleDrawer(false)}>
// //                 <div
// //                     role="presentation"
// //                     onClick={toggleDrawer(false)}
// //                     onKeyDown={toggleDrawer(false)}
// //                 >
// //                      <IconButton color="inherit" onClick={toggleDrawer(false)}
// //                         edge="start">
// //                         <CloseIcon />
// //                     </IconButton>
// //                     <List sx={{ width: '350px' }}>
// //             {data?.categories.map((item) => (
// //               <ListItem button key={item.id} component={Link} to={`/category/${item.title.toLocaleLowerCase()}`} >
// //                 <ListItemText primary={item.title} />
// //               </ListItem>
// //             ))}
// //           </List>
// //                 </div>
// //             </Drawer>
// //         </div>
// //     );
// // }

// // export default Navbar;


//test
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

  const { loading, error, data } = useQuery<{ categories: Category[] }>(CATEGORIES, {
    variables: {
      title: categoryTitle,
    },
  });

  const { loading: subcategoriesLoading, error: subcategoriesError, data: subcategoriesData } =
    useQuery<{ subcategory_categories_view: Subcategory[] }>(SUBCATEGORY, {
      variables: {
        title: hoveredCategory || '', // Use the hovered category to fetch subcategories
      },
      skip: !hoveredCategory, // Skip the query if there's no hovered category
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
      <AppBar position="static" sx={{ width: '100%' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
          <IconButton color="inherit">
            <FavoriteIcon />
          </IconButton>
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
          <IconButton color="inherit" onClick={toggleDrawer(true)} edge="start">
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
          <IconButton color="inherit" onClick={toggleDrawer(false)} edge="start">
            <CloseIcon />
          </IconButton>
          <List sx={{ width: '350px'}}>
            {data?.categories.map((category) => (
              <div
                key={category.id}
                onMouseEnter={() => handleCategoryMouseEnter(category.title)}
                onMouseLeave={handleCategoryMouseLeave}
              >
                <ListItem
                  button
                  key={category.id}
                  component={Link}
                  to={`/category/${category.title.toLowerCase()}`}
                
                  
                >
                  <ListItemText primary={category.title} sx={{ color: 'red'}} />
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
                        <ListItemText primary={subcategory.subcategory_name} />
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


// import React, { useState } from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import MenuIcon from '@mui/icons-material/Menu';
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import CloseIcon from '@mui/icons-material/Close';
// import { Link, useParams } from 'react-router-dom';
// import { useQuery, gql } from '@apollo/client';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Import the ExpandMoreIcon

// interface Category {
//   id: number;
//   title: string;
// }

// interface Subcategory {
//   subcategory_image_url: string;
//   subcategory_name: string;
//   category_id: number;
// }

// const CATEGORIES = gql`
//   query MyQuery {
//     categories {
//       title
//       id
//     }
//   }
// `;

// const SUBCATEGORY = gql`
//   query MyQuery($title: String!) {
//     subcategory_categories_view(where: { category_title: { _eq: $title } }) {
//       subcategory_image_url
//       subcategory_name
//       category_id
//     }
//   }
// `;

// function Navbar() {
//   const { categoryTitle } = useParams();
//   const [drawer, setDrawer] = useState(false);
//   const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

//   const { loading, error, data } = useQuery<{ categories: Category[] }>(CATEGORIES, {
//     variables: {
//       title: categoryTitle,
//     },
//   });

//   const { loading: subcategoriesLoading, error: subcategoriesError, data: subcategoriesData } =
//     useQuery<{ subcategory_categories_view: Subcategory[] }>(SUBCATEGORY, {
//       variables: {
//         title: hoveredCategory || '', // Use the hovered category to fetch subcategories
//       },
//       skip: !hoveredCategory, // Skip the query if there's no hovered category
//     });

//   const handleCategoryMouseEnter = (title: string) => {
//     setHoveredCategory(title);
//   };

//   const handleCategoryMouseLeave = () => {
//     setHoveredCategory(null);
//   };

//   const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
//     if (
//       ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
//     ) {
//       return;
//     }

//     setDrawer(open);
//   };

//   return (
//     <div>
//       <AppBar position="static" sx={{ width: '100%' }}>
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
//           <IconButton color="inherit">
//             <AccountCircleIcon />
//           </IconButton>
//           <IconButton color="inherit">
//             <FavoriteIcon />
//           </IconButton>
//           <IconButton color="inherit">
//             <ShoppingCartIcon />
//           </IconButton>
//           <IconButton color="inherit" onClick={toggleDrawer(true)} edge="start">
//             <MenuIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Drawer anchor="right" open={drawer} onClose={toggleDrawer(false)}>
//         <div
//           role="presentation"
//           onClick={toggleDrawer(false)}
//           onKeyDown={toggleDrawer(false)}
//         >
//           <IconButton color="inherit" onClick={toggleDrawer(false)} edge="start">
//             <CloseIcon />
//           </IconButton>
//           <List sx={{ width: '350px' }}>
//             {data?.categories.map((category) => (
//               <div key={category.id}>
//                 <ListItem
//                   button
//                   key={category.id}
//                   onClick={() => handleCategoryMouseEnter(category.title)} // Toggle subcategories on click
//                 >
//                   <ListItemText primary={category.title} />
//                   {hoveredCategory === category.title ? (
//                     <ExpandMoreIcon /> // Display the arrow down icon when category is clicked
//                   ) : null}
//                 </ListItem>
//                 {hoveredCategory === category.title && (
//                   <List
//                     sx={{
//                       display: 'block',
//                       '&:hover': {
//                         display: 'block',
//                       },
//                     }}
//                   >
//                     {subcategoriesData?.subcategory_categories_view.map((subcategory) => (
//                       <ListItem
//                         button
//                         key={subcategory.category_id}
//                         component={Link}
//                         to={`/category/${category.title.toLowerCase()}/${subcategory.subcategory_name.toLowerCase()}`}
//                       >
//                         <ListItemText primary={subcategory.subcategory_name} />
//                       </ListItem>
//                     ))}
//                   </List>
//                 )}
//               </div>
//             ))}
//           </List>
//         </div>
//       </Drawer>
//     </div>
//   );
// }

// export default Navbar;
