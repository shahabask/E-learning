

import React, { useEffect, useState } from 'react'
import LiveCard from '../../../components/tutor/cards/LiveCard';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../utils/tutorAxios';
import { toast } from 'react-toastify';

function LiveHistory() {


   const [isLiveDeleted,setLiveDelete]=useState(false)
  
   const [liveDetails,setLiveDetails]=useState([])
  
  
   
   

  
    useEffect(()=>{
      fetchLivesData()
    },[isLiveDeleted])
   
    const fetchLivesData=async()=>{
      try{
        const status='Ended'
        const response=await axiosInstance.get(`/loadLiveDetails/${status}`)
          setLiveDetails(response.data.lives)
          
          
      }catch(error){
        console.log(error)
      }
    }
  
    const handleDeleteCard=()=>{
      setLiveDelete(!isLiveDeleted)
    }
    return (
      <div style={{ height: "100vh", backgroundColor: 'rgba(224, 176, 255, 0.2)'}}>
      <div className='container'style={{paddingTop:'2rem'}}>
        {/* Header Row */}
        <div className='row '>
          <div className='col'>
          <div className='header d-flex justify-content-between align-items-center'>
              <div>
                <Link to='' style={{textDecoration:'none'}}>History</Link>
              </div>
            
            </div>
          </div>
        </div>
  
        {/* Cards Row */}
        {liveDetails.length==0? <div className='text-center pt-20 mt-10'> <h1 style={{fontSize:'30px',color:'purple'}}>No history found</h1></div> :  <div className='row mt-3'>
       { liveDetails?.map((live)=>{
            return(
              <div className='col py-4' key={live._id} >
             <LiveCard liveDetails={live} handleDelete={handleDeleteCard}/>
            </div>
            )
          })}
          {/* <div className='col'></div> */}
      
        </div>} 
      </div>
     
      </div>
    )
  }

export default LiveHistory