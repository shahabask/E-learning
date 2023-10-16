import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js"
import Tutor from "../models/tutorModel.js"

const adminLoadUsers=asyncHandler(async(req,res)=>{
    
    const users=await User.find({},'email firstName secondName _id isBlocked')
  
     if(users){
      res.status(201).json({users})
  
     }
   })
  
   const adminLoadTutors=asyncHandler(async(req,res)=>{

    const tutors=await Tutor.find({},'email userName _id isBlocked')
    if(tutors){
      res.status(201).json({tutors})
    }
   })

  const blockUnblockUser=asyncHandler(async(req,res)=>{ 
  
    
    const {userId,isBlocked}=req.body
    const user=await User.updateOne({_id:userId},{$set:{isBlocked:isBlocked}})
    })

    const blockUnblockTutor=asyncHandler(async(req,res)=>{  
        const {userId,isBlocked}=req.body
        const user=await Tutor.updateOne({_id:userId},{$set:{isBlocked:isBlocked}})
       
     })
   export {adminLoadUsers,adminLoadTutors,blockUnblockUser,blockUnblockTutor}