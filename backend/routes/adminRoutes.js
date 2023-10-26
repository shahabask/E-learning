import express from 'express'
import { adminAuth,adminLogout,adminForgotPassword,adminConfirmOtp,adminResetPassword,
  adminOtpLoginVerifyEmail,adminOtpLogin} from '../controllers/adminController.js'
  import {adminLoadUsers,adminLoadTutors,blockUnblockUser,blockUnblockTutor,loadCategory ,addCategory,addCourse,validateCourse
  ,loadCourses,blockUnblockCourse,editCategory,blockUnblockCategory } from '../controllers/adminMangementController.js'
  import adminauthcheck from '../middleware/adminMiddleware.js'
  const adminRouter=express.Router()
  
  import multer from 'multer';
  import path from 'path'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Middleware: Destination invoked')
    const absolutePath = path.join(__dirname, '../../public/images'); // Create an absolute path
    console.log('absolutePath',absolutePath)
    cb(null, absolutePath);
  },
  filename: (req, file, cb) => {
    console.log('fileName', file.originalname);
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

adminRouter.post('/addCategory', addCategory);


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
adminRouter.get('/loadCourses',loadCourses)
adminRouter.post('/addCourse',addCourse)
adminRouter.patch('/blockUnblockCourse',blockUnblockCourse)
adminRouter.post('/validateCourse',validateCourse)
adminRouter.post('/editCategory',editCategory)
adminRouter.patch('/blockUnblockCategory',blockUnblockCategory)
export default  adminRouter
