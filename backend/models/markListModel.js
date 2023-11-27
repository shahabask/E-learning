

import mongoose from "mongoose";
const markListSchema = mongoose.Schema({
    studentId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    quiz:[
        {quizId:{type:mongoose.Schema.Types.ObjectId,
            ref: 'Quizze' },
        
       percentage:{
        type:Number,
       } }
    ],
   assignment:[
    {assignmentId:{type:mongoose.Schema.Types.ObjectId,
     ref:'Assignment'
    },
    MarkScored:{
      type:Number,
    }},
    
   ]

})

const MarkList = mongoose.model('MarkList',markListSchema)

export default MarkList;