import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div style={{marginTop:"4%"}}><Outlet /></div>
    </div>
  )
}

export default HomePage
