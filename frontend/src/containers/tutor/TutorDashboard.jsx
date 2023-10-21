import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


function TutorDashboard() {


  const navigate=useNavigate()
  const {tutorInfo}=useSelector((state)=>state.tutorAuth)
  useEffect(()=>{
    console.log('u',tutorInfo)
    if(!tutorInfo){
      navigate('/tutor')
    }
  },[navigate,tutorInfo])
  return (
    <div>TutorDashboard</div>
  )
}

export default TutorDashboard