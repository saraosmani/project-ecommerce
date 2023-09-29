import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import SignIn from './Components/SignIn'
import ProductCard from './Components/ProductCard'
import ProductDetails from './Components/ProductDetails'
import SubcategoryPage from './Components/SubcategoryPage/SubcategoryPage'
// import Navbar from './Components/Navbar'
import HomepageContent from "./HomepageContent"
import HomePage from './Components/HomePAge'
import Cart from './Components/Cart'
import Wishlist from './Components/WIshlist'
import UserProfile from './Components/UserProfile'
function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}>
        <Route index element={<HomepageContent />}/>
        <Route path="category" element={<ProductCard />}/>
        <Route path='category/:categoryTitle' element={<SubcategoryPage/>}/>
        <Route path='category/:categoryTitle/:subCategoryTitle' element={<ProductCard/>}/>
        <Route path='category/:categoryTitle/:subCategoryTitle/:productId' element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/user-profile' element={<UserProfile/>}/>
        </Route>
        {/* <Route path='/' element={<SignIn/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
