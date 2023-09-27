import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './Components/SignIn'
import ProductCard from './Components/ProductCard'
import ProductDetails from './Components/ProductDetails'
import SubcategoryPage from './Components/SubcategoryPage'


function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductCard/>}/>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/product-details' element={<ProductDetails/>}/>
        <Route path='/category/:categoryTitle' element={<SubcategoryPage/>}>
          {/* <Route path='/:subCategoryTitle' element={<ProductCard/>}></Route> */}
        </Route>
        <Route path='/category/:categoryTitle/:subCategoryTitle' element={<ProductCard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
