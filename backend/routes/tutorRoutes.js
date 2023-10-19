import express from 'express'
import { tutorAuth,logoutTutor,registerTutor,tutorForgotPassword,tutorResetPassword,tutorConfirmOtp,tutorOtpLoginVerifyEmail,tutorOtpLogin,tutorDetails} from '../controllers/tutorController.js'
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

export default  tutorRouter