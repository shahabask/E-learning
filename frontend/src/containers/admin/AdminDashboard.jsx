import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function AdminDashboard() {
    const navigate=useNavigate()
  const adminInfo=useSelector((state)=>state.adminAuth)
  useEffect(()=>{
    console.log(adminInfo)
        if(adminInfo===null){
          navigate('/admin/login')
        }
  },[navigate,adminInfo])
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard