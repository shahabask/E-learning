import asyncHandler from 'express-async-handler';
import Tutor from '../models/tutorModel.js';
import generateTutorToken from '../utils/generateTutorToken.js';
import sendresetmail from '../utils/nodeMailer.js';
import jwt from 'jsonwebtoken'
import Category from '../models/categoryModel.js';
import Course from '../models/courseModel.js';
const tutorAuth=asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    const tutor=await Tutor.findOne({email:email})
    
    if(tutor&& (await tutor.matchPassword(password))){
      if(!tutor.isBlocked){
       const tutorToken=await generateTutorToken(res,tutor._id)
        res.status(201).json({
         tutorToken
        })
      }else{
        res.status(400).json(`access denied`)
      }
    }else{
        res.status(400).json('Invalid email or password')
        // throw new Error('invalid username or password')
    } 
 
})


const registerTutor=asyncHandler(async(req,res)=>{

    const {userName,email,password}=req.body
    console.log('working')
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
     const token=await   generateTutorToken(res,tutor._id)

        res.status(201).json({
         token:token
        })
    }else{
        res.status(400).json('invalid tutor data')
        console.log('not working')
        throw new Error('invalid tutor data')
    }

})

const tutorDetails = asyncHandler(async (req, res) => {
  const token = req.query.token;
  try {

    const user= await jwt.verify(token, process.env.JWT_SECRET);

    const isBlocked = await Tutor.findOne({ _id: user.tutorId }).select('isBlocked');
    
    if (isBlocked) {
      res.status(200).json({ isBlocked: true });
    } else {
      res.status(200).json({ isBlocked: false });
    }
  } catch (err) {
    console.error('Error in processing the request:', err);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
});

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

   const tutorOtpLoginVerifyEmail=asyncHandler(async(req,res)=>{
    const {email}=req.body
    const user=await Tutor.findOne({email})
    const token1 = Math.floor(100000 + Math.random() * 900000).toString();
    if(user){
      user.otp = token1;
      await user.save();
        sendresetmail(user.userName, email, user.otp);
        res.status(200).json('succesfull')
    }else{
      res.status(400).json('Invalid Email')
    }
   })

   const tutorOtpLogin=asyncHandler(async(req,res)=>{
    const {state,otp}=req.body
    const user=await Tutor.findOne({email:state})
    if(user.otp==otp){
        
        res.status(201).json({
          _id:user._id,
          userName:user.userName,
          email:user.email
      })
    }else{
      res.status(400).json('Incorrect Otp')
    }
   })
const loadCourseData=asyncHandler(async(req,res)=>{
const tutorSpecifications= req.user.specification
tutorSpecifications.push('ui designing')

 if(tutorSpecifications.length==0){
    res.status(400).json('update profile')
 }else{
const category=await  Category.aggregate([
    {
      $match: {
        subCategories: {
          $in:tutorSpecifications
        }
      }
    },
    {
      $project: {
        categoryName: 1,
        active: 1,
        
        subCategories: {
          $filter: {
            input: "$subCategories",
            as: "subCategory",
            cond: {
              $in: ["$$subCategory", tutorSpecifications]
            }
          }
        }
      }
    }])
 
    res.status(200).json([...category])
 }
 res.status(200).json('success')
  
})
 
const addCourse=asyncHandler(async(req,res)=>{
  const {course,category,subCategory,description}=req.body
  const imagePath = req.file.path
   const categoryDetails=await Category.findOne({categoryName:category})
 console.log('are you sure')
   const categoryId=categoryDetails._id
   
   const tutorId=req.user._id
   
   const createCourse=await Course.create(
    {
         course:course,
         category:categoryId,
         tutor:tutorId,
         subCategory:subCategory,
         description:description,
         image:imagePath
    }
   )
   if(createCourse){
    res.status(200).json('course successfully created')
   }else{
    res.status(400).json(`couldn't create course`)
   }

})


const loadCourses=asyncHandler(async(req,res)=>{
  const tutorId=req.user._id
  const myCourses=await Course.aggregate([{$match:{tutor:tutorId}},
    {
      $lookup: {
        from: 'categories', // The name of the Category collection
        localField: 'category',
        foreignField: '_id',
        as: 'categoryInfo',
      },
    },
    {
      $unwind: '$categoryInfo', // Unwind the categoryInfo array
    },
    {
      $project: {
        _id: 1, // Include the Course _id if needed
        course:1,
        subCategory: 1, 
        videos: 1,
        description:1,
        image:1,
        'categoryInfo.categoryName': 1,
      },
    },
    {
      $group: {
        _id: '$_id', // Group by Course _id
        categoryName: { $first: '$categoryInfo.categoryName' }, // Group the categoryInfo back into an array
        course: { $first: '$course' },
        description: { $first: '$description' },
        subCategory: { $first: '$subCategory' },
        image:{$first:'$image'},
        videos: { $first: '$videos' },
      },
    },])

    // console.log('myCourses',myCourses)
    if(myCourses.length>0){
      res.status(200).json(myCourses)
    }else{
      res.status(200).json('no course found')
    }
})

const editCourse=asyncHandler(async(req,res)=>{
  const {id,course,description,image}=req.body
  let imagePath = req?.file?.path
  imagePath=imagePath?imagePath: `backend\\public\\images\\${image}`
 
  
  const updateCourse=await Course.updateOne({_id:id},{course:course,description:description,image:imagePath})
  if(updateCourse){
    res.status(200).json('edited successfully')
  }else{
    console.log('cant do that ')
    res.status(500).json(`couldn't update`)
  }
})
export {tutorAuth,registerTutor,logoutTutor,tutorForgotPassword,tutorResetPassword,
        tutorConfirmOtp,tutorOtpLoginVerifyEmail,tutorOtpLogin,tutorDetails,
        loadCourseData,addCourse,loadCourses,editCourse}

