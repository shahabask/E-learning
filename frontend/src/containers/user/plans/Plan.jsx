import React, { useEffect, useState } from 'react';
import './plan.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PlanCard({ headerText, backgroundColor, price, features,userInfo }) {

  const navigate=useNavigate()
  const urlSearchParams = new URLSearchParams(window.location.search);
  const categoryName = urlSearchParams.get('categoryName')
  const categoryCheck = () => {
    if (categoryName) {
      console.log('categoryName',categoryName)
      // Redirect to the checkout page if `categoryName` is present
      navigate('/checkout');
    } else {
      // Redirect to the category page if `categoryName` is not present
      navigate('/categoryPage');
    }
  }
  return (

    <div className="columns">
      <ul className="price">
        <li className="header" style={{ backgroundColor }}>{headerText}</li>
        <li className="grey">{price}</li>
        {features.map((feature, index) => (
          <li key={index}>
            <i className={`fa fa-${feature.icon}`} aria-hidden="true" style={{ color: feature.color, marginRight: '8px' }}></i>
            <span style={{ marginLeft: '8px' }}>{feature.text}</span>
          </li>
        ))}
        <li className="grey">{userInfo?<button onClick={categoryCheck}  className="button" >Subscribe</button>:<a href="/login" className="button">Sign In</a>}</li>
      </ul>
    </div>
  );
}

function PlanContainer() {

  const plans = [
    {
      headerText: 'Basic',
      backgroundColor: '#70df91',
      price: 'Free / 1 month',
      features: [
        { icon: 'check', color: '#1dff1d', text: 'Watch all lessons' },
        { icon: 'check', color: '#1dff1d', text: 'Practice workouts' },
        { icon: 'check', color: '#1dff1d', text: 'Live class access' },
        { icon: 'times', color: 'red', text: 'Life time access' },
      ],
    },
    {
      headerText: 'Medium',
      backgroundColor: '#84ff67',
      price: '₹ 999/ year',
      features: [
        { icon: 'check', color: '#1dff1d', text: 'Watch all lessons' },
        { icon: 'check', color: '#1dff1d', text: 'Practice workouts' },
        { icon: 'check', color: '#1dff1d', text: 'Live class access' },
        { icon: 'times', color: 'red', text: 'Life time access' },
      ],
    },
    {
      headerText: 'Premium',
      backgroundColor: '#d7ff74',
      price: '₹ 1999/ Unlimited',
      features: [
        { icon: 'check', color: '#1dff1d', text: 'Watch all lessons' },
        { icon: 'check', color: '#1dff1d', text: 'Practice workouts' },
        { icon: 'check', color: '#1dff1d', text: 'Live class access' },
        { icon: 'check', color: '#1dff1d', text: 'Life time access' },
      ],
    },
  ];
  

  const {userInfo}=useSelector((state)=>state.auth)
  useEffect(()=>{
     

  },[])
const   [selectedCategory,setSelectedCategory]=useState()

  return (
    <div className="plan-container">
      {plans.map((plan, index) => (
        <PlanCard key={index} {...plan} userInfo={userInfo} />
      ))}
    </div>
  );
}

export default PlanContainer;
