import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"


function TutorPrivateRoute() {
    const {tutorInfo}=useSelector((state)=>state.tutorAuth)
  return tutorInfo? <Outlet/> : <Navigate to='/tutor' replace/>
}

export default TutorPrivateRoute