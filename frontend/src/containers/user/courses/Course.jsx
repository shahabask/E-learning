import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
function CourseCard({_id,image,course,description,categoryName}) {
  const modifiedImagePath = image
      ? `http://localhost:5000/${image.replace(/\\/g, '/').replace(/^backend\/public\//, '')}`
      : '';

      
      const [isSubscriptionActive,setSubscriptionActive]=useState(false)
      useEffect(()=>{
          fetchUserDetails()
      },[])

      const fetchUserDetails=async()=>{
        try{
         const response=await axiosInstance.get('/getUserDetails')
         
         const endDateISO = Date.parse(response.data.plan.endDate);
     const endDate = new Date(endDateISO);
       
   
     if(endDate> Date.now()){
        setSubscriptionActive(true)
        
     }
        }catch(error){
          console.log('error')
        }
      }
  return (
    <div className="w-60 h-80 bg-neutral-100 rounded-3xl text-black p-4 flex flex-col items-start justify-center gap-3 hover:bg-pink-200 hover:shadow-2xl hover:text-white hover:shadow-purple-200 transition-shadow mx-3 my-5">
  <div className="w-52 h-40 bg-sky-300 rounded-2xl overflow-hidden">
  <img className="w-full h-full object-cover" src={modifiedImagePath} alt="Course Image" />
</div>

  <div className="">
  <h5 className="fw-bolder">{course}</h5>
  <p>{description}</p>
  </div>
 {isSubscriptionActive?<Link style={{textDecoration:'none'}} to={`/playlist/${_id}`} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
       Watch Videos
   </Link>: <Link style={{textDecoration:'none'}} to={`/courseDetails/${_id}`} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
       View Details
   </Link>} 
</div>

  //   <div className="col mb-5">
  //   <div className="card h-100">
   
  //     <img className="card-img-top" src={modifiedImagePath} alt="..." style={{height:'200px'}}/>
  //     <div className="card-body p-4">
  //       <div className="text-center">
  //         <h5 className="fw-bolder">{course}</h5>
  //         <p>{description}</p>
  //       </div>
  //     </div>
  //     <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
  //       <div className="text-center">
  //       <Link style={{textDecoration:'none'}} to={`/plans`} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
  //     Subscribe Now
  //   </Link>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  
  
  )
}

export default CourseCard
