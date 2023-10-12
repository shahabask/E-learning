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
import TutorResetPassword from '../tutor/authentication/TutorForgotPassword.jsx'
import ForgotPassword from '../user/authentication/ForgotPassword.jsx'
import ResetPassword from '../user/authentication/ResetPassword.jsx'
import TutorForgotPassword from '../tutor/authentication/TutorForgotPassword.jsx'
import TutorVerifyOtp from '../tutor/authentication/TutorVerifyOtp.jsx'
import TutorPasswordReset from '../tutor/authentication/TutorPasswordReset.jsx'
import AdminForgotPassword from '../admin/authentication/AdminForgotPassword.jsx'
import AdminVerifyOtp from '../admin/authentication/AdminVerifyOtp.jsx'
import AdminPasswordReset from '../admin/authentication/AdminPasswordReset.jsx'


function Router() {
  return (

    <Routes>

   <Route path='/' exact  element={<LoginScreens/>}>
   <Route path='' index  element={<Home/>}/>
         <Route path='/login' element={<UserLogin/>}/>  
         <Route path='/register' element={<Signup/>}/>
         <Route path='/forgotPassword' element={<ForgotPassword/>}/>
         <Route path='/verifyOtp' element={<VerifyOtp/>}/>
         <Route path='/resetPassword' element={<ResetPassword/>}/>
         
   </Route>


   
   <Route path='/admin' exact element={<AdminLoginScreens/>}>
   <Route path='' element={<AdminLogin/>}/>
   <Route path='forgotPassword' element={<AdminForgotPassword/>}/>
   <Route path='verifyOtp' element={<AdminVerifyOtp/>}/>
   <Route path='resetPassword' element={<AdminPasswordReset/>}/>
   </Route>

   <Route path='/admin/home' exact element={<AdminPrivateRoute/>}>
   <Route path='' element={<AdminDashboard/>}/>
   </Route>


   <Route path="/tutor" element={<TutorLoginScreens />}>
  <Route index element={<TutorLogin />} />
  <Route path="dashboard" element={<TutorDashboard />} />
  <Route path="forgotPassword" element={<TutorForgotPassword/>} />
  <Route path="verifyOtp" element={<TutorVerifyOtp/>}/>
  <Route path="resetPassword" element={<TutorPasswordReset/>}/>

  <Route path="register" element={<TutorSignup />} />
  
  
</Route>



   <Route path='/tutor/home' exact element={<TutorPrivateRoute/>}>
   <Route path='' exact element={<TutorDashboard/>}/>
   </Route>
   
    </Routes>
   
  )
}

export default Router