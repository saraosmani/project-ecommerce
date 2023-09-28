import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { Card, CardContent, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

interface Subcategory {
    id: number;
    name: string;
  } 

const SUBCATEGORY= gql`
query MyQuery {
    subcategories {
      id
      name
    }
  }
  `

const SubcategoryPage = () => {
    const { categoryTitle, subCategoryTitle } = useParams();

    const data=useQuery<{ subcategories: Subcategory[] }>(SUBCATEGORY)
    console.log("subcategory",data)
  return (
    <div>
        
        {data?.data?.subcategories.map((item) => (
            <Link to={`/category/${categoryTitle}/${item.name}`} key={item.id}>
          <Card key={item.id} style={{ margin: '10px', width: '300px' }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {item.name}
              </Typography>
             
            </CardContent>
          </Card>
          </Link>
        ))}
      </div>
  )
}

export default SubcategoryPage
