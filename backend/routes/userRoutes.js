import express from 'express'
import {authUser,registerUser,logoutUser,verifyEmail,confirmOtp,resetPassword,otpLoginVerifyEmail,otpLogin,
    courseCategoryListing,loadCategoryDetails,loadProfile,updateProfile,courseDetails,loadPlans,loadUpgradePlan,checkout,
    confirmPayment,loadSubsriptionDetails,loadQuizzes,loadLiveDetails,loadQuizDetails,addQuizResult,
    loadMarkSheet } from '../controllers/userController.js'
import  authcheck  from '../middleware/userMiddleware.js'


import multer from 'multer';
import path from 'path'
const storage = multer.diskStorage({
destination: (req, file, cb) => {
  cb(null, 'backend/public/images');
  
},
filename: (req, file, cb) => {
 
  cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
},
});

const upload = multer({ storage: storage });

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
router.get('/categoryDetails/:categoryId',loadCategoryDetails)
router.get('/loadProfile',authcheck,loadProfile)
router.post('/updateProfile',authcheck,upload.single('image'),updateProfile)
router.get('/loadCourseDetails/:courseId',authcheck,courseDetails)
router.get('/loadPlans',authcheck,loadPlans)
router.get('/loadUpgradePlan/:currentPlan',authcheck,loadUpgradePlan)
router.post('/create-checkout',authcheck,checkout)
router.post('/confirmPayment',confirmPayment)
router.get('/getUserDetails',authcheck,loadSubsriptionDetails)
router.get('/loadQuizzes',authcheck,loadQuizzes)
router.get('/getLiveDetails',loadLiveDetails)
router.get('/quizDetails/:quizId',loadQuizDetails)
router.post('/addQuizResult',authcheck,addQuizResult)
router.get('/loadMarkSheet',authcheck,loadMarkSheet)

export default  router