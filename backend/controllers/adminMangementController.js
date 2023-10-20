import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js"
import Tutor from "../models/tutorModel.js"
import Category from '../models/categoryModel.js'

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

     const loadCategory=asyncHandler(async(req,res)=>{
             const category=await Category.find({})
             if(category){
res.status(200).json({category})
             }else{
             res.status(400).json('no category found')
             }
     })

     const addCategory=asyncHandler(async(req,res)=>{
      const { categoryName } = req.body; // Assuming categoryName is sent as part of the form data
      

          const checkIdentical=await Category.findOne({categoryName:categoryName})
          if(!checkIdentical){

            const category=await Category.create({categoryName:categoryName})
            if(!category) {
                 res.status(400).json(`category can't be inserted`)
            }else{
                res.status(200).json('category added successfully')
            }
          }else{
            res.status(400).json('category already exist')
          }
     })
   export {adminLoadUsers,adminLoadTutors,blockUnblockUser,blockUnblockTutor,loadCategory,addCategory}