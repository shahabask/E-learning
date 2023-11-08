import React, { useEffect, useState } from 'react';
import './plan.css'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import {loadStripe} from '@stripe/stripe-js';

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
            {benifits.map((feature, index) => (
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

function PlanContainer() {

  // const plans = [
  //   {
  //     headerText: 'Basic',
  //     backgroundColor: '#70df91',
  //     price: 'Free / 1 month',
  //     features: [
  //       { icon: 'check', color: '#1dff1d', text: 'Watch all lessons' },
  //       { icon: 'check', color: '#1dff1d', text: 'Practice workouts' },
  //       { icon: 'check', color: '#1dff1d', text: 'Live class access' },
  //       { icon: 'times', color: 'red', text: 'Life time access' },
  //     ],
  //   },
  //   {
  //     headerText: 'Medium',
  //     backgroundColor: '#84ff67',
  //     price: '₹ 999/ year',
  //     features: [
  //       { icon: 'check', color: '#1dff1d', text: 'Watch all lessons' },
  //       { icon: 'check', color: '#1dff1d', text: 'Practice workouts' },
  //       { icon: 'check', color: '#1dff1d', text: 'Live class access' },
  //       { icon: 'times', color: 'red', text: 'Life time access' },
  //     ],
  //   },
  //   {
  //     headerText: 'Premium',
  //     backgroundColor: '#d7ff74',
  //     price: '₹ 1999/ Unlimited',
  //     features: [
  //       { icon: 'check', color: '#1dff1d', text: 'Watch all lessons' },
  //       { icon: 'check', color: '#1dff1d', text: 'Practice workouts' },
  //       { icon: 'check', color: '#1dff1d', text: 'Live class access' },
  //       { icon: 'check', color: '#1dff1d', text: 'Life time access' },
  //     ],
  //   },
  // ];
  
const [subscription,setSubscription]=useState([])
const [isSubscriptionActive,setSubscriptionActive]=useState(false)
const [endDate,setEndDate]=useState(null)
  const {userInfo}=useSelector((state)=>state.auth)
  useEffect(()=>{
     
    fetchPlans()

  },[])
 const [plans,setPlans]=useState([])
  const fetchPlans=async()=>{
  const response =await axiosInstance.get('/loadPlans')
   setPlans([...response.data.plans])
     setSubscription([response.data.subscription[0]])
 
     const endDateISO = Date.parse(response.data.subscription[0].subscription.endDate);
     const endDate = new Date(endDateISO);

     // Format endDate as "day/month/year"
     const formattedEndDate = endDate.toLocaleDateString('en-GB');
     setEndDate(formattedEndDate)
     if(endDate> Date.now()){
        setSubscriptionActive(true)
        
     }
     
  }
 

  return (
    
    <div className="plan-container">
    {isSubscriptionActive ?  (
      <div className="plan-container">
      {isSubscriptionActive ? (
        <div className="flex justify-center items-center h-full">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="text-center mb-4">
              <p className="text-4xl text-green-600 font-semibold mb-4">Successfully Purchased</p>
              <p className="text-2xl text-gray-600">
                Your Subscription Details
              </p>
            </div>
            <ul className="list-disc pl-6 text-lg text-gray-700">
              {subscription[0]?.benifits?.map((benefit, index) => (
                <li key={index} className="mb-2">{benefit}</li>
              ))}
            </ul>
            <p className="text-gray-600 mt-4">
              Purchased Mode: <span className="font-semibold text-green-600">{subscription[0].mode}</span>
            </p>
            <p className="text-gray-600">
              End Date: <span className="font-semibold text-green-600">{endDate}</span>
            </p>
            <Link to='/courses' style={{textDecoration:'none'}} className="px-4 py-2 bg-pink-300 text-white rounded-md hover:bg-indigo-700">
           Go to Watch Video
         </Link>
          </div>
        </div>
      ) : (
        plans.map((plan, index) => (
          <PlanCard key={index} {...plan} userInfo={userInfo} />
        ))
      )}
    </div>
    
      
    ):
    (
      plans.map((plan, index) => (
        <PlanCard key={index} {...plan} userInfo={userInfo} />
      ))
    )}
  </div>
  );
}

export default PlanContainer;
