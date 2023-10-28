import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js"
import Tutor from "../models/tutorModel.js"
import Category from '../models/categoryModel.js'
import Course from '../models/courseModel.js'

const adminLoadUsers=asyncHandler(async(req,res)=>{
    
    const users=await User.find({},'email firstName secondName _id isBlocked subscription')
  
     if(users){
      res.status(201).json({users})
  
     }
   })
  
   const adminLoadTutors=asyncHandler(async(req,res)=>{

    const tutors=await Tutor.find({},'email userName _id isBlocked specification')
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
      const imagePath = req.file.path
      
      console.log('its backend image',imagePath)
          const checkIdentical=await Category.findOne({categoryName:categoryName})
          if(!checkIdentical){
        
            const category=await Category.create({categoryName:categoryName,
              subCategories:subCategories,image:imagePath})
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

    

      const validateCourse=asyncHandler(async(req,res)=>{
        const { course } = req.body;

   
if (matches) {
 
  res.status(200).json('category found')
} else {
  res.status(200).json('not category found')
}
     })

      const loadCourses=  asyncHandler(async(req,res)=>{
        // const courses=await Course.find({})
        const courses=await Course.aggregate([{$lookup:{
           from: 'categories', // The name of the Category collection
        localField: 'category',
        foreignField: '_id',
        as: 'categoryInfo'}},
        {$unwind:'$categoryInfo'},
        {$lookup:{
          from: 'tutors', // The name of the Category collection
       localField: 'tutor',
       foreignField: '_id',
       as: 'tutorInfo'}},
       {$unwind:'$tutorInfo'},
        {
          $project:{
            _id:1,
            course:1,
            subCategory:1,
            videos:1,
            isActive:1,
            'categoryInfo.categoryName': 1,
            'tutorInfo.userName':1,
          }
        },
        {
          $group:{
            _id:"$_id",
            categoryName: { $first: '$categoryInfo.categoryName' }, // Group the categoryInfo back into an array
        course: { $first: '$course' },
        subCategory: { $first: '$subCategory' },
        videos: { $first: '$videos' },
        isActive:{$first: '$isActive' },
        tutor:{$first: '$tutorInfo.userName' },
        
          }
        }

      ])

        if(courses){
            res.status(200).json({courses})
        }else{
           res.status(200).json('no course found')
        }
      
      })


      const blockUnblockCourse=asyncHandler(async(req,res)=>{
        const {courseId,isActive}=req.body
        const blockUnblockCourse=await Course.findOneAndUpdate({_id:courseId},{isActive:isActive})

        if(blockUnblockCourse){
          res.status(200).json('successfull')
        }else{
          res.status(400).json(`can't update`)
        }
      })

      const editCategory=asyncHandler(async(req,res)=>{
        const {_id,categoryName,subCategories,image}=req.body
        let imagePath = req?.file?.path
        imagePath=imagePath?imagePath: `backend\\public\\images\\${image}` 
        const category=await Category.updateOne({_id:_id},{categoryName:categoryName,subCategories:subCategories,image:imagePath})
        if(category){
          res.status(200).json('edited successfully')
        }else{
          res.status(500).json('server error')
        }
      })

      const blockUnblockCategory=asyncHandler(async(req,res)=>{
        const {categoryId,isBlocked}=req.body 
        console.log(isBlocked,'checking')
        const category=await Category.updateOne({_id:categoryId},{active:isBlocked})
        if(category){
          res.status(200).json('successfull')
        }else{
          res.status(500).json('server error')
        }
      })
   export {adminLoadUsers,adminLoadTutors,blockUnblockUser,blockUnblockTutor,
    loadCategory,addCategory,addCourse,validateCourse,loadCourses,blockUnblockCourse,editCategory,
    blockUnblockCategory}
    
