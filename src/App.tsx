import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import SignIn from './Components/SignIn'
import ProductCard from './Components/ProductCard'
import ProductDetails from './Components/ProductDetails'
import SubcategoryPage from './Components/SubcategoryPage/SubcategoryPage'
// import Navbar from './Components/Navbar'
import Bigu from "./Bigu"
import HomePAge from './Components/HomePAge'
function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePAge/>}>
        <Route index element={<Bigu />}/>
        <Route path="category" element={<ProductCard />}/>
        <Route path='category/:categoryTitle' element={<SubcategoryPage/>}/>
        <Route path='category/:categoryTitle/:subCategoryTitle' element={<ProductCard/>}/>
        <Route path='category/:categoryTitle/:subCategoryTitle/:productId' element={<ProductDetails/>}/>
        </Route>
        {/* <Route path='/' element={<SignIn/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
