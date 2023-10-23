import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js"
import Tutor from "../models/tutorModel.js"
import Category from '../models/categoryModel.js'
import Course from '../models/courseModel.js'

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
      const { categoryName,subCategories } = req.body; // Assuming categoryName is sent as part of the form data
          
      console.log('its backend')
          const checkIdentical=await Category.findOne({categoryName:categoryName})
          if(!checkIdentical){
        
            const category=await Category.create({categoryName:categoryName,
              subCategories:subCategories})
            if(!category) {
                 res.status(400).json(`category can't be inserted`)
            }else{
                res.status(200).json('category added successfully')
            }
          }else{
            res.status(400).json('category already exist')
          }
     })
     const addCourse=asyncHandler(async(req,res)=>{


      })

      const courseAddData=asyncHandler(async(req,res)=>{
              const categories= await Category.find({active:true}).select('-active') 
            
              const tutors=await Tutor.find({})

              if(categories && tutors){
                res.status(200).json({categories,tutors})
              }

      })

      const validateCourse=asyncHandler(async(req,res)=>{
        const { course } = req.body;


//  

   
if (matches) {
 
  res.status(200).json('category found')
} else {
  res.status(200).json('not category found')
}
     
      

     
      
      })
   export {adminLoadUsers,adminLoadTutors,blockUnblockUser,blockUnblockTutor,loadCategory,addCategory,addCourse,courseAddData,validateCourse}
