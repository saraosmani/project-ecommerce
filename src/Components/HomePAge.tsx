import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
const HomePAge = () => {
  return (
    <div>
      <Navbar />
      <div style={{marginTop:"4%"}}><Outlet /></div>
    </div>
  )
}

export default HomePAge
