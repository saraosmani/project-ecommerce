import { useQuery, gql } from '@apollo/client';
import { Card,  CardMedia,  } from '@mui/material';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import "../SubcategoryPage/SubcategoryPage.css"

interface Subcategory {
  category_id: number;
  category_title: string;
  subcategory_image_url: string;
  subcategory_name: string;
  } 

const SUBCATEGORY= gql`
query MyQuery($title: String!) {
  subcategory_categories_view(where: {category_title: {_eq: $title}}) {
    subcategory_image_url
    subcategory_name
    category_id
  }
}
  `

const SubcategoryPage = () => {
    const { categoryTitle } = useParams();

    
    const data=useQuery<{ subcategory_categories_view: Subcategory[] }>(SUBCATEGORY, {
      variables: {
        title: categoryTitle
      }
    }
      )

    console.log("subcategory",data)
    
  return (
    <div className="card-container">
      {data?.data?.subcategory_categories_view.map((item) => (
        <Link to={`/category/${categoryTitle}/${item.subcategory_name}`} key={item.category_id}>
          <Card className="card">
            <div className="card-image">
              <CardMedia
                sx={{ height: 300 }}
                image={item.subcategory_image_url}
                title={item.subcategory_image_url}
              />
              <div className="card-overlay">{item.subcategory_name}</div>
            </div>
           
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default SubcategoryPage


