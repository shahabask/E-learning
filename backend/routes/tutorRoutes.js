import express from 'express'
import { tutorAuth,logoutTutor,registerTutor,tutorForgotPassword,tutorResetPassword,
         tutorConfirmOtp,tutorOtpLoginVerifyEmail,tutorOtpLogin,tutorDetails,
         loadCourseData,addCourse,loadCourses,editCourse,profileData,updateProfile,addVideo,
         loadQuizDetails,loadQuestions,addQuestion,updateQuestion, addQuizzes,createLive,
         tutorLiveDetails,deleteLive,updateLiveStatus,loadAssignment,deleteAssignment} from '../controllers/tutorController.js'
 import tutorauthcheck  from '../middleware/tutorMiddleware.js'
const tutorRouter=express.Router()


import multer from 'multer';
import path from 'path'
import { loadLiveDetails } from '../controllers/userController.js';
const storage = multer.diskStorage({
destination: (req, file, cb) => {
  cb(null, 'backend/public/images');
  
},
filename: (req, file, cb) => {
 
  cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
},
});
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/public/videos');
    
  },
  
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
const videoUpload = multer({ storage: videoStorage });
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
tutorRouter.get('/loadProfile',tutorauthcheck,profileData)
tutorRouter.post('/updateTutorProfile',tutorauthcheck,upload.single('image'),updateProfile)
tutorRouter.patch('/addVideo',videoUpload.array('videoUrl'),addVideo)
tutorRouter.get('/loadQuizDetails',loadQuizDetails)
tutorRouter.post('/addQuiz',addQuizzes)
tutorRouter.get('/loadQuestion',loadQuestions)
tutorRouter.post('/addQuestion',addQuestion)
tutorRouter.put('/updateQuestion/:questionId',updateQuestion)
tutorRouter.post('/createLive',tutorauthcheck,createLive)
tutorRouter.get('/loadLiveDetails/:status',tutorauthcheck,tutorLiveDetails)
tutorRouter.delete('/deleteLive/:id',deleteLive)
tutorRouter.patch('/updateLiveStatus',updateLiveStatus)
tutorRouter.get('/loadAssignments/:status')
tutorRouter.delete('/deleteAssignment/:id',deleteAssignment)
export default  tutorRouter