
import mongoose from "mongoose";
const courseSchema = mongoose.Schema({
      course: {
        type: String,
        required: true,
        unique: true,
      },
      category:{
          type:mongoose.Schema.Types.ObjectId,
           ref: 'Category' 
      },
   //   active:{
   //      type:Boolean,
   //      default:true
   //   },
     tutor:{
        type:mongoose.Schema.Types.ObjectId,
           ref: 'Tutor' 
     },
     videos:{
        type:Array,
        default:[]
     },
     
     

   
    })


    const Course = mongoose.model('Course',courseSchema)

    export default Course