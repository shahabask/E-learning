import express from 'express'
import {authUser,registerUser,logoutUser,verifyEmail,confirmOtp,resetPassword,otpLoginVerifyEmail,otpLogin,
    courseCategoryListing,loadCategoryDetails} from '../controllers/userController.js'
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
router.get('/categoryDetails/:categoryId',loadCategoryDetails)

router.post("/api/orders", async (req, res) => {
    try {
     
      const { cart } = req.body;
      const { jsonResponse, httpStatusCode } = await createOrder(cart);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to create order." });
    }
  });
   
  
  router.post("/api/orders/:orderID/capture", async (req, res) => {
    try {
      const { orderID } = req.params;
      const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to capture order." });
    }
  });
export default  router