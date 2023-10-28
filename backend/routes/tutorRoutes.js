import express from 'express'
import { tutorAuth,logoutTutor,registerTutor,tutorForgotPassword,tutorResetPassword,
         tutorConfirmOtp,tutorOtpLoginVerifyEmail,tutorOtpLogin,tutorDetails,
         loadCourseData,addCourse,loadCourses,editCourse} from '../controllers/tutorController.js'
 import tutorauthcheck  from '../middleware/tutorMiddleware.js'
const tutorRouter=express.Router()


import multer from 'multer';
import path from 'path'
const storage = multer.diskStorage({
destination: (req, file, cb) => {
  cb(null, 'backend/public/images');
  
},
filename: (req, file, cb) => {
  console.log('fileName', file.originalname);
  cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
},
});

const upload = multer({ storage: storage });

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
tutorRouter.post('/addCourse',tutorauthcheck,upload.single('image'),addCourse)
tutorRouter.get('/loadCourses',tutorauthcheck,loadCourses)
tutorRouter.patch('/editCourse',upload.single('image'),editCourse)
export default  tutorRouter