import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';
import sendresetmail from '../utils/nodeMailer.js';
const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    const user=await User.findOne({email:email})

    if(user&& (await user.matchPassword(password))){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            firstName:user.firstName,
            email:user.email
        })
    }else{
        res.status(400).json('Invalid email or password')
        // throw new Error('invalid username or password')
    } 

  
})

const registerUser=asyncHandler(async(req,res)=>{
    const {firstName,secondName,email,password}=req.body
    const userExists= await User.findOne({email:email})
    if(userExists){
        res.status(400).json('user already exists')
        // throw new Error('user already exists')
    }

    const user=await User.create({
        firstName:firstName,
        secondName:secondName,
        email:email,
        password:password
    })

    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(400)
        throw new Error('invalid user data')
    }

})

const logoutUser=asyncHandler(async(req,res)=>{
      res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
      })
      res.status(200).json({message:'User Logged Out'})
})
const verifyEmail=asyncHandler(async(req,res)=>{
    const { email } = req.body;
    console.log(email)
    const user = await User.findOne({ email });
    const token1 = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = new Date(Date.now() + 1 * 120 * 1000);
    if (user) {
      user.otp = token1;
      user.otpExpiration = otpExpiration;
      await user.save();
      sendresetmail(user.firstName, email, user.otp);
      res.status(200).json("its working");
    } else {
      res.status(400).json("User not found");
    }
})

const confirmOtp=asyncHandler(async(req,res)=>{
 const {state,otp}=req.body
 const user=await User.findOne({email:state})
  if(user.otp==otp){
    res.status(200).json('Successfull')
  }else{
    res.status(400).json("Incorrect otp");
  }
})

const resetPassword=asyncHandler(async(req,res)=>{
  const {state,password}=req.body
  console.log(state,'pass',password)
  const user=await User.findOne({email:state})
  if(user){
    user.password=password
   await user.save()
   res.status(200).json('success')
  }
 })
 const otpLoginVerifyEmail=asyncHandler(async(req,res)=>{
  const {email}=req.body
  const user=await User.findOne({email})
  const token1 = Math.floor(100000 + Math.random() * 900000).toString();
  if(user){
    user.otp = token1;
    await user.save();
      sendresetmail(user.firstName, email, user.otp);
      res.status(200).json('succesfull')
  }else{
    res.status(400).json('Invalid Email')
  }
 })

 const otpLogin=asyncHandler(async(req,res)=>{
  const {state,otp}=req.body
  const user=await User.findOne({email:state})
  if(user.otp==otp){
      
      res.status(201).json({
        _id:user._id,
        firstName:user.firstName,
        email:user.email
    })
  }else{
    res.status(400).json('Incorrect Otp')
  }
 })

export {authUser,registerUser,logoutUser,verifyEmail,confirmOtp,resetPassword,otpLoginVerifyEmail,otpLogin}