
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
     subCategory:{
      type:String,
      required:true
     },
     videos:
      {
         title:{
            type:String,
            default:'this is title'
         },
         description:{
            type:String,
            default:'this is descrition'
         },
         videoUrl:{
            type:String,
            default:null
         }
      }
     ,
     description:{
      type:String,
      required:true
     },
     isActive:{
      type:Boolean,
      default:true
     },
     image:{
      type:String,
      default:null
     }

   
    })


    const Course = mongoose.model('Course',courseSchema)

    export default Course