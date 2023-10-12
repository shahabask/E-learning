import { useState } from "react";
import {useNavigate ,useLocation } from 'react-router-dom';
import { useTutorVerifyOtpMutation } from "../../../slices/tutorSlice/tutorApiSlice";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/tutorAxios";

function TutorVerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  const [otpVerify] = useTutorVerifyOtpMutation();
  // const [Forgot] = useForgotpasswordMutation();

  const verifyOTPHandler = async (e) => {
    e.preventDefault();
    try {
 
      const res = await axiosInstance.post(`/verifyOtp`,{state,otp})
       
      navigate("/tutor/resetPassword", { state: state });
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data||error.error);
    }
  };

  // const resendHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log()
  //     const res = await Forgot({ email:state }).unwrap();
  //     console.log(res);
  //     navigate("verifyOtp", { state: email });
  //   } catch (error) {
  //     toast.error(error.data);
  //   }
  // };

  return (
    <div className="flex justify-center items-center h-screen">

        <div className="w-96 bg-white rounded-lg shadow-lg p-6 ">
          <h1 className="text-3xl font-semibold mb-4 text-center">
            Verify OTP
          </h1>
          <form onSubmit={verifyOTPHandler}>
            <div className="mb-4">
              <div className="flex">
                <label htmlFor="OTP" className="block text-gray-700 mt-2 mr-2">
                  Otp
                </label>
                <input
                  type="text"
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 mr-2"
                />
                {/* <button className='text-blue'>Resend</button> */}
                <button className="text-blue-500 mt-2" >
                  Resend
                </button>
              </div>
            </div>

            <button
  type="submit"
  style={{ backgroundColor: '#ffc0cb', color: 'dark-black', border: 'none', borderRadius: '0.25rem', padding: '0.625rem 1.25rem',  marginTop: '1rem', transition: 'background-color 0.3s ease', }}
  className="btn-send-otp"
>
              Verify OTP
            </button>
          </form>
        </div>
      </div>

  );
}

export default TutorVerifyOtp