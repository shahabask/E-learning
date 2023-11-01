import express from 'express'
import { adminAuth,adminLogout,adminForgotPassword,adminConfirmOtp,adminResetPassword,
  adminOtpLoginVerifyEmail,adminOtpLogin} from '../controllers/adminController.js'
  import { loadUsers,loadTutors,blockUser,blockTutor,loadCategory ,addCategory,addCourse,validateCourse
  ,loadCourses,blockCourse,editCategory,blockCategory } from '../controllers/adminMangementController.js'
  import adminauthcheck from '../middleware/adminMiddleware.js'
  const adminRouter=express.Router()
  
  import multer from 'multer';
  import path from 'path'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/public/images');
    console.log('image is here')
  },
  filename: (req, file, cb) => {
    console.log('fileName', file.originalname);
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });




adminRouter.post('/login',adminAuth)
adminRouter.post('/logout',adminLogout)
adminRouter.put('/forgotPassword',adminForgotPassword)
adminRouter.post('/verifyOtp',adminConfirmOtp)
adminRouter.put('/resetPassword',adminResetPassword)
adminRouter.post('/otpLoginVerifyEmail',adminOtpLoginVerifyEmail)
adminRouter.post('/otpLogin',adminOtpLogin)
adminRouter.get('/loadUsers',loadUsers)
adminRouter.get('/loadTutors',loadTutors)
adminRouter.put('/blockUnblockUser',blockUser)
adminRouter.put('/blockUnblockTutor',blockTutor)
adminRouter.get('/loadCategory',loadCategory)
adminRouter.get('/loadCourses',loadCourses)
adminRouter.post('/addCourse',addCourse)
adminRouter.patch('/blockUnblockCourse',blockCourse)
adminRouter.post('/validateCourse',validateCourse)
adminRouter.post('/addCategory',upload.single('image') ,addCategory);    
adminRouter.post('/editCategory',upload.single('image'),editCategory)
adminRouter.patch('/blockUnblockCategory',blockCategory)

export default  adminRouter
