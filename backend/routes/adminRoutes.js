import express from 'express'
import { adminAuth,adminLogout,adminForgotPassword,adminConfirmOtp,adminResetPassword,
    adminOtpLoginVerifyEmail,adminOtpLogin} from '../controllers/adminController.js'
    import {adminLoadUsers,adminLoadTutors,blockUnblockUser,blockUnblockTutor,loadCategory } from '../controllers/adminMangementController.js'

const adminRouter=express.Router()

adminRouter.post('/login',adminAuth)
adminRouter.post('/logout',adminLogout)
adminRouter.put('/forgotPassword',adminForgotPassword)
adminRouter.post('/verifyOtp',adminConfirmOtp)
adminRouter.put('/resetPassword',adminResetPassword)
adminRouter.post('/otpLoginVerifyEmail',adminOtpLoginVerifyEmail)
adminRouter.post('/otpLogin',adminOtpLogin)
adminRouter.get('/loadUsers',adminLoadUsers)
adminRouter.get('/loadTutors',adminLoadTutors)
adminRouter.put('/blockUnblockUser',blockUnblockUser)
adminRouter.put('/blockUnblockTutor',blockUnblockTutor)
adminRouter.get('/loadCategory',loadCategory)

export default  adminRouter
