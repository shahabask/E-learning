import express from 'express'
import {authUser,registerUser,logoutUser,verifyEmail,confirmOtp,resetPassword,otpLoginVerifyEmail,otpLogin} from '../controllers/userController.js'
import { protect } from '../middleware/userMiddleware.js'

const router=express.Router()

router.post('/auth',authUser)
router.post('/register',registerUser)
router.post('/logout',logoutUser)
router.put('/forgotPassword',verifyEmail)
router.post('/verifyOtp',confirmOtp)
router.post('/resetPassword',resetPassword)
router.post('/otpLoginVerifyEmail',otpLoginVerifyEmail)
router.post('/otpLogin',otpLogin)
export default  router