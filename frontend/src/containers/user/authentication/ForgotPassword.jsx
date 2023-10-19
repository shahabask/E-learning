

import { useState } from 'react'
import { useForgotPasswordMutation } from '../../../slices/userSlice/userApiSlices'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function ForgotPassword() {
    const [email,setEmail]=useState('')
     
 
    let [forgotPassword]=useForgotPasswordMutation()

    const navigate=useNavigate()

    const forgotSubmitHandler=async(e)=>{
      e.preventDefault()
      
      
      try {
        const res=await forgotPassword({email}).unwrap()
        console.log(res)
        navigate('/verifyOtp',{state:email})
      } catch (error) {
        toast.error(error?.data||error.error)
      }
    }

    // const validate=(email)=>{

    //     const error={}
    //     const regex= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    //   if(!email)  {
    //     error.email='Email is required'
    //    }else if(!regex.test(email)){
    //      error.email='This is an invalid email'
    //    }
    //    return error
    // }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="login-form">
        <div className="w-96 rounded-lg shadow-lg p-6 " >
          <h1 className="text-3xl font-semibold text-black mb-4 text-center" >
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

export default ForgotPassword