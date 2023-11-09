// ProductCard.jsx
import React, { useContext, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Card, CardActions, CardContent, CardMedia, IconButton, Button, Typography, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../Context/Context';
import ReusableProductCard from './ReusableProductCard';

interface ProductCardProps {
  subCategoryTitle: string;
  categoryTitle: string;
}

interface ProductCard {
  subcategory_name: string;
  produktet_name: string;
  produktet_image_url: string;
  produktet_price: string;
  subcategory_id: number;
  category_title: string;
  produktet_id: number;
}

const PRODUCTS = gql`
  query MyQuery($subCategoryTitle: String!, $categoryTitle: String!) {
    subcategory_produktet_view(where: { category_title: { _eq: $categoryTitle }, subcategory_name: { _eq: $subCategoryTitle } }) {
      produktet_name
      produktet_image_url
      produktet_description
      produktet_id
      produktet_price
    }
  }
`;

const ProductCard: React.FC<ProductCardProps> = ({ subCategoryTitle, categoryTitle }) => {
  const { data } = useQuery<{ subcategory_produktet_view: ProductCard[] }>(PRODUCTS, {
    variables: {
      subCategoryTitle: subCategoryTitle,
      categoryTitle: categoryTitle,
    },
  });
  const { addToWishlist } = useContext(AppContext);

  return (
    <div>
      <Grid container spacing={5} style={{ marginTop: '10px', marginLeft: '10px' }}>
        {data?.subcategory_produktet_view.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.subcategory_id}>
            <ReusableProductCard product={item} categoryTitle={categoryTitle} subCategoryTitle={subCategoryTitle} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductCard;
