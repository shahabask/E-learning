import express from 'express'
import { tutorAuth,logoutTutor,registerTutor,tutorForgotPassword,tutorResetPassword,
         tutorConfirmOtp,tutorOtpLoginVerifyEmail,tutorOtpLogin,tutorDetails,
         loadCourseData,addCourse,loadCourses} from '../controllers/tutorController.js'
 import tutorauthcheck  from '../middleware/tutorMiddleware.js'
const tutorRouter=express.Router()

tutorRouter.post('/login',tutorAuth)
tutorRouter.post('/register',registerTutor)
tutorRouter.get('/tutorDetails',tutorDetails)
tutorRouter.post('/logout',logoutTutor)
tutorRouter.put('/forgotPassword',tutorForgotPassword)
tutorRouter.post('/verifyOtp',tutorConfirmOtp)
tutorRouter.put('/resetPassword',tutorResetPassword)
tutorRouter.post('/otpLoginVerifyEmail',tutorOtpLoginVerifyEmail)
tutorRouter.post('/otpLogin',tutorOtpLogin)
tutorRouter.get('/courseData',tutorauthcheck,loadCourseData)
tutorRouter.post('/addCourse',tutorauthcheck,addCourse)
tutorRouter.get('//loadCourses',tutorauthcheck,loadCourses)
export default  tutorRouter