import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import sendresetmail from "../utils/nodeMailer.js";
import Course from "../models/courseModel.js";
import Category from "../models/categoryModel.js";
import mongoose from "mongoose";
import Plan from "../models/plansModel.js";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51O9tFFSDsPPMBnLnMdMtou8UwIWhDpQJl3hXgNqJCjBwaWNDXXkDcnCvRUuvGJegH2TKKMthVMz9fNNvBasBLXGi00Bg41xYtX"
);

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    if (!user.isBlocked) {
      const token = await generateToken(res, user._id);

      res.status(201).json({
        token: token,
      });
    } else {
      res.status(400).json(`access denied`);
    }
  } else {
    res.status(400).json("Invalid email or password");
    // throw new Error('invalid username or password')
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, secondName, email, password } = req.body;
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400).json("user already exists");
    // throw new Error('user already exists')
  }

  const user = await User.create({
    firstName: firstName,
    secondName: secondName,
    email: email,
    password: password,
  });

  if (user) {
    const token = await generateToken(res, user._id);
    res.status(201).json({
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged Out" });
});
const verifyEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

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
});

const confirmOtp = asyncHandler(async (req, res) => {
  const { state, otp } = req.body;
  const user = await User.findOne({ email: state });
  if (user.otp == otp) {
    res.status(200).json("Successfull");
  } else {
    res.status(400).json("Incorrect otp");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { state, password } = req.body;
  
  const user = await User.findOne({ email: state });
  if (user) {
    user.password = password;
    await user.save();
    res.status(200).json("success");
  }
});
const otpLoginVerifyEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const token1 = Math.floor(100000 + Math.random() * 900000).toString();
  if (user) {
    user.otp = token1;
    await user.save();
    sendresetmail(user.firstName, email, user.otp);
    res.status(200).json("succesfull");
  } else {
    res.status(400).json("Invalid Email");
  }
});

const otpLogin = asyncHandler(async (req, res) => {
  const { state, otp } = req.body;
  const user = await User.findOne({ email: state });
  if (user.otp == otp) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
    });
  } else {
    res.status(400).json("Incorrect Otp");
  }
});

const courseCategoryListing = asyncHandler(async (req, res) => {
  const courses = await Course.aggregate([
    { $match: { isActive: true } },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryData",
      },
    },
    {
      $unwind: "$categoryData",
    },
    {
      $lookup: {
        from: "tutors",
        localField: "tutor",
        foreignField: "_id",
        as: "tutorData",
      },
    },
    { $unwind: "$tutorData" },
    {
      $project: {
        _id: 1,
        course: 1,
        subCategory: 1,
        videos: 1,
        image: 1,
        description: 1,
        "categoryData._id": 1,
        "categoryData.categoryName": 1,
        "categoryData.image": 1,
        "categoryData.subCategories": 1,
        "categoryData.active": 1,
        "tutorData.userName": 1,
        "tutorData.imagePath": 1,
      },
    },
    {
      $group: {
        _id: "$_id",
        categoryId: { $first: "$categoryData._id" },
        categoryName: { $first: "$categoryData.categoryName" }, // Group the categoryInfo back into an array
        categoryImage: { $first: "$categoryData.image" },
        subCategories: { $push: "$categoryData.subCategories" },
        categoryActive: { $first: "$categoryData.active" },
        tutor: { $first: "$tutorData.userName" },
        tutorImage: { $first: "$tutorData.imagePath" },

        course: { $first: "$course" },
        subCategory: { $first: "$subCategory" },
        videos: { $first: "$videos" },
        image: { $first: "$image" },
        description: { $first: "$description" },
      },
    },
  ]);
  const categories = await Category.find({});
  // const cateogries=await Category.aggregate({$match:{active:true}},{
  //   $lookup:{from:}
  // })

  if (courses) {
    res.status(200).json({ courses, categories });
  } else {
    res.status(500).json(`can't get the courses`);
  }
});

const loadCategoryDetails = asyncHandler(async (req, res) => {
  const categoryId = req.params.categoryId;

  let categoryData = await Category.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(categoryId),
      },
    },
    {
      $lookup: {
        from: "courses", // Use the correct collection name here
        localField: "_id",
        foreignField: "category",
        as: "courseData",
      },
    },
    {
      $unwind: "$courseData",
    },
    {
      $project: {
        _id: 1,
        categoryName: 1,
        subCategories: 1,
        active: 1,
        image: 1,
        "courseData._id": 1,
        "courseData.course": 1,
        "courseData.subCategory": 1,
        "courseData.videos": 1,
        "courseData.image": 1,
        "courseData.description": 1,
      },
    },
    {
      $group: {
        _id: "$courseData._id",
        categoryName: { $first: "$categoryName" },
        image: { $first: "$image" },
        subCategories: { $first: "$subCategories" },
        active: { $first: "$active" },
        courseId: { $first: "$courseData._id" },
        course: { $first: "$courseData.course" },
        subCategory: { $first: "$courseData.subCategory" },
        courseVideos: { $first: "$courseData.videos" },
        courseImage: { $first: "$courseData.image" },
        courseDescription: { $first: "$courseData.description" },
      },
    },
  ]);

  if (categoryData.length == 0) {
    categoryData = await Category.findOne({ _id: categoryId });
    categoryData = [categoryData];
  }

  if (categoryData) {
    res.status(200).json(categoryData);
  } else {
    res.status(500).json(`can't get data`);
  }
});

const loadProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  const myProfile = req.user;
  if (myProfile) {
    res.status(200).json({ myProfile });
  } else {
    res.status(500).json(`can't get the user`);
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { firstName, secondName, phone, image } = req.body;
  let imagePath = req?.file?.path;
  imagePath = imagePath ? imagePath : `backend\\public\\images\\${image}`;

  const updateUser = await User.updateOne(
    { _id: userId },
    { firstName, secondName, phone, image: imagePath }
  );
  if (updateUser) {
    res.status(200).send("updated");
  }
});

const courseDetails = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;
  const courseDetails = await Course.findOne({ _id: courseId });
  const plan = req.user.subscription;
  if (courseDetails) {
    res.status(200).json({ courseDetails, plan });
  } else {
    res.status(500).json(`can't get the details`);
  }
});

const loadPlans = asyncHandler(async (req, res) => {
  const plans = await Plan.find({});

  const subscription = await User.aggregate([
    { $match: { _id: req.user._id } },

    {
      $lookup: {
        from: "plans",
        localField: "subscription.mode",
        foreignField: "_id",
        as: "planData",
      },
    },
    { $unwind: "$planData" },
    {
      $project: {
        _id: 1,
        subscription: 1,
        "planData.subscriptionMode": 1,
        "planData.benifits": 1,
      },
    },
    {
      $group: {
        _id: "$_id",
        subscription: { $first: "$subscription" },
        mode: { $first: "$planData.subscriptionMode" },
        benifits: { $first: "$planData.benifits" },
      },
    },
  ]);
 
  if (plans) {
    res.status(200).json({ plans, subscription });
  } else {
    res.status(400).json(`can't find the plans`);
  }
});
const checkout = asyncHandler(async (req, res) => {
  const { subscriptionMode } = req.body;
  const plan = await Plan.findOne({ subscriptionMode: subscriptionMode });
 

  const lineItem = (plan) => {
    return [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: plan.subscriptionMode,
          },
          unit_amount: plan.price * 100,
        },
        quantity: 1, // You can adjust the quantity as needed.
      },
    ];
  };

  const userId = req.user._id;
  const mode = plan.subscriptionMode;
  const lineItems = lineItem(plan);
  const date = new Date();
  const dateTimestamp = date.getTime(); // Get the timestamp of the date
  const successUrl = `http://localhost:3000/success/${userId}/${mode}/${dateTimestamp}`;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: successUrl,
    cancel_url: "http://localhost:3000/cancel",
  });

  res.status(200).json({ id: session.id });
  // res.status(200).json(userId)
});

const confirmPayment = asyncHandler(async (req, res) => {

  const { userId, mode, date } = req.body;
  const plan = await Plan.findOne({ subscriptionMode: mode });

  // Calculate the endDate based on the plan type
  const startDateTimestamp = new Date().getTime(); // Replace this with your actual start date timestamp
  // Replace with the actual plan type
  
  let endDate;

  if (mode === "basic" || mode === "Basic") {
    // Add 1 month in milliseconds to the start date timestamp
    endDate = startDateTimestamp + 30 * 24 * 60 * 60 * 1000;
  } else if (mode === "medium" || mode === "Medium") {
    // Add 1 year in milliseconds to the start date timestamp
    endDate = startDateTimestamp + 365 * 24 * 60 * 60 * 1000;
  } else {
    // Premium plan, no additional end time
    endDate = startDateTimestamp + 100 * 365 * 24 * 60 * 60 * 1000;
  }



  const id = plan._id;
  const user = await User.findByIdAndUpdate(userId, {
    $set: { subscription: { mode: id, startDate: date, endDate: endDate } },
  });
  if (user) {
    res.status(200).json("success");
  }
});

const loadSubsriptionDetails = asyncHandler(async (req, res) => {
  const plan = req.user.subscription;
  if (plan) {
    res.status(200).json({ plan });
  }
});
export {
  authUser,
  registerUser,
  logoutUser,
  verifyEmail,
  confirmOtp,
  resetPassword,
  otpLoginVerifyEmail,
  otpLogin,
  courseCategoryListing,
  loadCategoryDetails,
  loadProfile,
  updateProfile,
  courseDetails,
  loadPlans,
  checkout,
  confirmPayment,
  loadSubsriptionDetails,
};
