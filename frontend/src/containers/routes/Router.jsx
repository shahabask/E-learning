import {Route,Routes} from 'react-router-dom'
import Home from '../user/Home.jsx'
import UserLogin from '../user/authentication/UserLogin.jsx'
import Signup from '../user/authentication/Signup.jsx'
import TutorLogin from '../tutor/authentication/TutorLogin.jsx'

import TutorDashboard from '../tutor/TutorDashboard.jsx'
import AdminLogin from '../admin/authentication/AdminLogin.jsx'
import AdminDashboard from '../admin/AdminDashboard.jsx'
import LoginScreens from '../../components/user/LoginScreens.jsx'
import TutorSignup from '../tutor/authentication/TutorSignup.jsx'
import AdminLoginScreens from '../../components/admin/adminLoginScreens.jsx'
import AdminPrivateRoute from '../../components/admin/AdminPrivateRoute.jsx'
import TutorPrivateRoute from '../../components/tutor/TutorPrivateRoute.jsx'
import TutorLoginScreens from '../../components/tutor/TutorLoginScreens.jsx'
// import ResetPassword from '../user/authentication/ResetPassword.jsx'
import VerifyOtp from '../user/authentication/VerifyOtp.jsx'
import ForgotPassword from '../user/authentication/ForgotPassword.jsx'
import ResetPassword from '../user/authentication/ResetPassword.jsx'
import TutorForgotPassword from '../tutor/authentication/TutorForgotPassword.jsx'
import TutorVerifyOtp from '../tutor/authentication/TutorVerifyOtp.jsx'
import TutorPasswordReset from '../tutor/authentication/TutorPasswordReset.jsx'
import AdminForgotPassword from '../admin/authentication/AdminForgotPassword.jsx'
import AdminVerifyOtp from '../admin/authentication/AdminVerifyOtp.jsx'
import AdminPasswordReset from '../admin/authentication/AdminPasswordReset.jsx'
import OtpLoginEmail from '../user/authentication/OtpLoginEmail.jsx'
import OtpLogin from '../user/authentication/OtpLogin.jsx'
import UserManagement from '../admin/UserManagement.jsx'
import TutorManagement from '../admin/TutorManagement.jsx'
import ErrorPage from '../../components/ErrorPage.jsx'
import Footer from '../user/home/Footer.jsx'
import CategoryManagement from '../admin/CategoryManagement.jsx'
import CourseManagement from '../admin/CourseManagement.jsx'
import CourseManagementTutor from '../tutor/CourseManagementTutor.jsx'
import TutorProfile from '../tutor/profile/TutorProfile.jsx'
import CourseCategoryPage from '../user/courses/CourseCategoryPage.jsx'
import UserPrivateRoute from '../../components/user/UserPrivateRoute.jsx'
import Profile from '../user/profile/Profile.jsx'
import PlanContainer from '../user/plans/Plan.jsx'


function Router() {
  return (

    <Routes>

   <Route path='/' exact  element={<LoginScreens/>}>
   <Route path='' index  element={<Home/>}/>
   <Route path='/courses'  element={<CourseCategoryPage/>}/>
   <Route path='/profile' element={<Profile/>}/>
   <Route path='/plans' element={<PlanContainer/>}/>
         <Route path='/login' element={<UserLogin/>}/>  
         <Route path='/register' element={<Signup/>}/>
         <Route path='/forgotPassword' element={<ForgotPassword/>}/>
         <Route path='/verifyOtp' element={<VerifyOtp/>}/>
         <Route path='/resetPassword' element={<ResetPassword/>}/>
         <Route path='/otpLoginEmail' element={<OtpLoginEmail/>}/>
         <Route path='/otpLogin' element={<OtpLogin/>}/>
   </Route>


    {/* <Route path='/' exact element={<UserPrivateRoute/>}>

    </Route> */}

   
   <Route path='/admin/login' exact element={<AdminLoginScreens/>}>
   <Route path='' element={<AdminLogin/>}/>
   {/* <Route path='forgotPassword' element={<AdminForgotPassword/>}/>
   <Route path='verifyOtp' element={<AdminVerifyOtp/>}/>
   <Route path='resetPassword' element={<AdminPasswordReset/>}/>
   <Route path='otpLoginEmail' element={<OtpLoginEmail/>}/>
         <Route path='otpLogin' element={<OtpLogin/>}/> */}
   </Route>

   <Route path='/admin' exact element={<AdminPrivateRoute/>}>
   <Route path='' index element={<AdminDashboard/>}/>
   <Route path='userManagement' element={<UserManagement/>}/>
   <Route path='tutorManagement' element={<TutorManagement/>}/>
   <Route path='categoryManagement' element={<CategoryManagement/>}/>
   <Route path='courseManagement' element={<CourseManagement/>}/>
  {/* <Route path='logout' /> */}
   </Route>


   <Route path="/tutor/login" element={<TutorLoginScreens />}>
  <Route index element={<TutorLogin />} />
  <Route path="forgotPassword" element={<TutorForgotPassword/>} />
  <Route path="verifyOtp" element={<TutorVerifyOtp/>}/>
  <Route path="resetPassword" element={<TutorPasswordReset/>}/>

  <Route path="register" element={<TutorSignup />} />
  <Route path='otpLoginEmail' element={<OtpLoginEmail/>}/>
         <Route path='otpLogin' element={<OtpLogin/>}/>
  
</Route>





   <Route path='/tutor' exact element={<TutorPrivateRoute/>}>
   <Route path='dashboard' exact element={<TutorDashboard/>}/>
   <Route path='profile' element={<TutorProfile/>}/>  
   <Route path='courseManagement'  element={<CourseManagementTutor/>}/>
     
   </Route>
   <Route path="*" element={<ErrorPage/>} />
    </Routes>
   
  )
}

export default Router