

import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import axiosInstance from '../../utils/axios'
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';

function PlanCard({ subscriptionMode, duration, price, benifits,userInfo,backgroundColor }) {
   
    const makePayment=async(subscriptionMode)=>{
      const stripe=await loadStripe('pk_test_51O9tFFSDsPPMBnLnKyvyumurLHFVUHzGUpmbkXp9jHCv0VgSXfHSUHhHuigLLml4DL18sxaWg3GhJNPsb7yaeQ3S00Z3qxkuvG');
  
      const response=await axiosInstance.post('/create-checkout',{subscriptionMode})
      
      const session=response.data.id
      
      const result= stripe.redirectToCheckout({
        sessionId:session
      })
    }
    return (
      <div className="columns" style={{ height: '500px' }}>
        <ul className="price">
          <li className="header" style={{ backgroundColor }}>
            {subscriptionMode}
          </li>
          <li className="grey text-purple" style={{color:'purple',fontFamily:'sans-serif',fontSize:'30',fontWeight:'bolder'}}>₹ {price}</li>
          <li style={{ maxHeight: '235px', overflow: 'auto' }}>
            <ul>
              {benifits?.map((feature, index) => (
                <li key={index}>
                  <span style={{ marginLeft: '8px' }}>{feature}</span>
                </li>
              ))}
            </ul>
          </li>
          <li className="grey">
            {userInfo ? (
              <button className="button" onClick={()=>makePayment(subscriptionMode)}>Subscribe</button>
            ) : (
              <a href="/login" className="button">
                Sign In
              </a>
            )}
          </li>
        </ul>
      </div>
    );
    
  }

function UpgradePlan() {

  const {currentPlan}=useParams()
    const [plans,setPlans]=useState([])
    const {userInfo}=useSelector((state)=>state.auth)
    useEffect(()=>{
       
      fetchPlans()
  
    },[])
   
    const fetchPlans=async()=>{
        const response =await axiosInstance.get(`/loadUpgradePlan/${currentPlan}`)
         setPlans([...response.data.plans])
       
           
        }
  return (
    <div className="plan-container" style={{ backgroundColor: 'rgba(224, 176, 255, 0.2)'}}>
<div className="plan-container">
({
        plans.map((plan, index) => (
          <PlanCard key={index} {...plan} userInfo={userInfo} />
        ))
    })
    </div>
    </div>
  )
}

export default UpgradePlan