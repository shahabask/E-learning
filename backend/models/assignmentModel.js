
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const assignmentSchema = mongoose.Schema({ 
   name:{
    typeof:String,
   },
   constraints:[
    
   ],
   endingDate:{
    typeof:Date
   },
   status:{
      typeof:String,
      default:'started'
   }
})

const Assignments = mongoose.model('Assignment',assignmentSchema)

export default Assignments;