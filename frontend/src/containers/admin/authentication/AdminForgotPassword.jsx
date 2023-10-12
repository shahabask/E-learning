

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axiosInstance from '../../utils/adminAxios'
import { useNavigate } from 'react-router-dom'

function AdminForgotPassword() {
    const [email,setEmail]=useState('')

 


    const navigate=useNavigate()

    const forgotSubmitHandler=async(e)=>{
      e.preventDefault()
      
      
      try {
      
   
        const res=await axiosInstance.put(`/forgotPassword`,{email})
         
        navigate('/tutor/verifyOtp',{state:email})
      } catch (error) {
       
        toast.error(error?.response?.data?.message||error.error)
      }
    }



  return (
    <div className="flex justify-center items-center h-screen">
      <div className="login-form">
        <div className="w-96 bg-white rounded-lg shadow-lg p-6 ">
          <h1 className="text-3xl font-semibold text-black mb-4 text-center">
            Forgot Password
          </h1>
          <form onSubmit={forgotSubmitHandler}>
          <div className="mb-4">
            <label htmlFor="Email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            
          </div>
          <button
  type="submit"
  style={{ backgroundColor: '#ffc0cb', color: 'dark-black', border: 'none', borderRadius: '0.25rem', padding: '0.625rem 1.25rem',  marginTop: '1rem', transition: 'background-color 0.3s ease', }}
  className="btn-send-otp"
>
  Send OTP
</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminForgotPassword