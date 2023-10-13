
import Navbar from "../components/Navbar/Navbar"
import AdminSidebar from "../components/Sidebar/adminSidebar"
import TutorSidebar from "../components/Sidebar/tutorSidebar"
import Router from "../containers/routes/Router"
import { useLocation } from "react-router-dom"


function Layout() {

  const location=useLocation()
  const tutor=location.pathname.startsWith("/tutor")
  const admin=location.pathname.startsWith("/admin")
  return (
<>
 {tutor?(<TutorSidebar/>):admin?(<AdminSidebar/>):(<Navbar/>)}
<Router/>

</>
  )
}

export default Layout