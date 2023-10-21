import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { axiosInstance } from "../../containers/utils/tutorAxios"


function TutorPrivateRoute() {
  
 
    
    const {tutorInfo}=useSelector((state)=>state.tutorAuth)
    
    const fetchData=async(tutorInfo)=>{
        const tutor=await axiosInstance.get('/tutorDetails',{ params: {
          token: tutorInfo.token
       
        },
      }
    
      )
      const isBlocked=tutor.data.isBlocked
      return isBlocked
    }
    if(tutorInfo){
      useEffect(()=>{
        
      if(tutorInfo){
        fetchData(tutorInfo)
      }
      },[])
      
    }
    
  return tutorInfo? <Outlet/> : <Navigate to='/tutor' replace/>
}

export default TutorPrivateRoute