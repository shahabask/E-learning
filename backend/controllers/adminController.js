import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModel'
import generateAdminToken from '../utils/generateAdminToken'

const adminAuth=asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    const admin=await Admin.findOne({email:email})

    if(admin&& (await admin.matchPassword(password))){
        generateAdminToken(res,admin._id)
        res.status(201).json({
            _id:admin._id,
            email:admin.email
        })
    }else{
        res.status(400).json('Invalid email or password')
        // throw new Error('invalid username or password')
    } 
})

const adminLogout=asyncHandler(async(req,res)=>{
    res.cookie('adminJwt','',{
        httpOnly:true,
        expires:new Date(0)
      })
      res.status(200).json({message:'Admin Logged Out'})
})


export {adminLogout,adminAuth}