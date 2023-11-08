import { useEffect, useState } from "react";
import axiosInstance from '../../utils/axios.js'

import EditUser from "./EditUser.jsx";
export default function Profile() {
  const [userData,setUserData]=useState()
   const [showForm, setShowForm] = useState(false);
   const [subcategories,setSubcategories]=useState('')
  useEffect(()=>{
  fetchUser()
 
  },[])
  const fetchUser=async()=>{
   try {
     const response=await axiosInstance.get('/loadProfile')
   setUserData(response.data.myProfile)


   } catch (error) {
     console.log('error',error.response||error.error)
   }
   
  }
   const handleEditClick = () => {
     setShowForm((prevShowForm) => !prevShowForm);
   };


   const imagePath = userData?.image
  const modifiedImagePath = imagePath
   ? `http://localhost:5000/${imagePath.replace(/\\/g, '/').replace(/^backend\/public\//, '')}`
   : '';
   console.log('img',modifiedImagePath)
   return (
     <div style={{ height: "100vh", backgroundColor: "	#fcdad1" }}>
       <div className="container ">
         <div className="row gutters row-with-padding">
           <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
             <div className="card h-100">
               <div className="card-body">
                 <div className="account-settings">
                   <div className="user-profile">
                     <div className="user-avatar  with-border">
                       <img
                         src={modifiedImagePath}
                         alt="Maxwell Admin"
                       />
                     </div>
                     <h5 className="user-name">{userData?.firstName} {userData?.secondName}</h5>
                     {/* <h6 className="user-email">{userData?.secondName}</h6> */}
                   </div>
                   <div className="centered-container">
                     <div className="row-container">
                       <div className="colum" onClick={handleEditClick}>
                         <i className="fas fa-edit " style={{color:"blue"}}></i>
                         <span className="icon"style={{marginLeft:"10px"}}>Edit</span>
                       </div>
                        {/* <div className="colum">
                        <i className="fas fa-certificate"style={{color:"gold"}}></i> 
                       <span className="icon"style={{marginLeft:"10px"}}>
                        Badge
                       </span>
                       </div>
                       <div className="colum">
                       <i className="fas fa-eye"></i>
                       <span className="icon"style={{marginLeft:"10px"}}>
                          Views
                       </span>
                       </div>
                       <div className="colum">
                       <i className="fas fa-users"></i> 
                       <span className="icon" style={{ paddingLeft: "10px" }}>
                         Followers
                       </span>
                       </div> */}
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           {showForm ? <EditUser userData={userData}  />:( <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
       <div className="bg-white shadow-md p-4 rounded-lg">
         <h1 className="text-3xl font-bold mb-4">{userData?.userName}</h1>
         <p className="text-gray-600 text-sm mb-2">
           {userData?.address?.city}, {userData?.address?.state}, {userData?.address?.country}
         </p>
         <p className="text-gray-600 text-sm mb-2">{userData?.degree}</p>
         <div className="mb-4">
           <p className="text-gray-700 font-semibold">Skills:{userData?.specification?.map((item, index) => (
   <span key={index}>
     {item}
     {index !== userData?.specification.length - 1 ? ', ' : ''}
   </span>
 ))}</p>
           <ul className="list-disc list-inside">
             {userData?.skills?.map((skill, index) => (
               <li key={index}>{skill}</li>
             ))}
           </ul>
         </div>
         <div className="mb-4">
           <p className="text-gray-700 font-semibold">About Me:</p>
           <p className="text-gray-600">{userData?.description}</p>
         </div>
       </div>
     </div>
   )}
         </div>
       </div>
     </div>
   );
 }