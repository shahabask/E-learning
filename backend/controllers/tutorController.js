import asyncHandler from 'express-async-handler';
import Tutor from '../models/tutorModel.js';
import generateTutorToken from '../utils/generateTutorToken.js';
import sendresetmail from '../utils/nodeMailer.js';

const tutorAuth=asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    const tutor=await Tutor.findOne({email:email})
    
    if(tutor&& (await tutor.matchPassword(password))){
        generateTutorToken(res,tutor._id)
        res.status(201).json({
            _id:tutor._id,
            userName:tutor.userName,
            email:tutor.email
        })
    }else{
        res.status(400).json('Invalid email or password')
        // throw new Error('invalid username or password')
    } 
})


const registerTutor=asyncHandler(async(req,res)=>{

    const {userName,email,password}=req.body
    const tutorExists= await Tutor.findOne({email:email})
    if(tutorExists){
        res.status(400).json('tutor already exists')
        // throw new Error('tutor already exists')
    }

    const tutor=await Tutor.create({
        userName:userName,
        email:email,
        password:password
    })
 
    if(tutor){
        generateTutorToken(res,tutor._id)
        res.status(201).json({
            _id:tutor._id,
            userName:tutor.userName,
            email:tutor.email
        })
    }else{
        res.status(400)
        throw new Error('invalid tutor data')
    }

})

const logoutTutor=asyncHandler(async(req,res)=>{
    res.cookie('tutorJwt','',{
        httpOnly:true,
        expires:new Date(0)
      })
      res.status(200).json({message:'Tutor Logged Out'})
})

const tutorForgotPassword=asyncHandler(async(req,res)=>{
    const { email } = req.body;

    const user = await Tutor.findOne({ email });
    const token1 = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = new Date(Date.now() + 1 * 120 * 1000);
    if (user) {
      user.otp = token1;
      user.otpExpiration = otpExpiration;
      await user.save();
      sendresetmail(user.userName, email, user.otp);
      console.log('successfull')
      res.status(200).json({message:"its working"});
    } else {
      res.status(400).json({message:"User not found"});
    }
})



const tutorConfirmOtp=asyncHandler(async(req,res)=>{
    const {state,otp}=req.body
   
    const user=await Tutor.findOne({email:state})
     if(user.otp==otp){
       res.status(200).json('Successfull')
     }else{
       res.status(400).json("Incorrect otp");
     }
   })

   const tutorResetPassword =asyncHandler(async(req,res)=>{
    const {state,password}=req.body
    
    const user=await Tutor.findOne({email:state})
    if(user){
      user.password=password
     await user.save()
     res.status(200).json('success')
    }
   })
export {tutorAuth,registerTutor,logoutTutor,tutorForgotPassword,tutorResetPassword,tutorConfirmOtp}

