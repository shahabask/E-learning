
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const quizSchema = mongoose.Schema({
    name:{
        type:String
    },
    questions:[{
        question:{  type:mongoose.Schema.Types.ObjectId,
            ref: 'QuestionBank' }
    }] ,
    date:{
        type:Date,
    },
   time:{
    type:Number
   },
   subCategory:{
    type:String,
   },
   expired:{
    type:Boolean,
    default:false
   },
   
})





const Quizzes = mongoose.model('Quizz',quizSchema)

export default Quizzes;