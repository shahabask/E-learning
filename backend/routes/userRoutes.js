import express from 'express'
import {authUser,registerUser,logoutUser,verifyEmail,confirmOtp,resetPassword,otpLoginVerifyEmail,otpLogin,
    courseCategoryListing} from '../controllers/userController.js'
import  authcheck  from '../middleware/userMiddleware.js'


const router=express.Router()

router.post('/auth',authUser)
router.post('/register',registerUser)
router.post('/logout',logoutUser)
router.put('/forgotPassword',verifyEmail)
router.post('/verifyOtp',confirmOtp)
router.post('/resetPassword',resetPassword)
router.post('/otpLoginVerifyEmail',otpLoginVerifyEmail)
router.post('/otpLogin',otpLogin)
router.get('/courseCategoryList',courseCategoryListing)
export default  router