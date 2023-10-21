
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const categorySchema = mongoose.Schema({
      categoryName: {
        type: String,
        required: true,
        unique: true,
      },
      
     active:{
        type:Boolean,
        default:true
     },
    //  image: {
    //   type: String,
    // },
    })


    const Category = mongoose.model('Category',categorySchema)

    export default Category