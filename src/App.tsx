import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './Components/SignIn'
import ProductCard from './Components/ProductCard'
import ProductDetails from './Components/ProductDetails'


function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>}></Route>
        <Route path='/products' element={<ProductCard/>}/>
        <Route path='/product-details' element={<ProductDetails/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
