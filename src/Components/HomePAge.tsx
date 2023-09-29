import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
const HomePAge = () => {
  return (
    <div>
      <Navbar />
      <div><Outlet /></div>
    </div>
  )
}

export default HomePAge
