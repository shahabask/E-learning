import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const tutorSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
      },
      
      email: {
        type: String,
        required: true,
        unique: true,
      },
      
      specification:{
        type:Array,
        default:[]
      },
      details:{
        type:String,
        required:false
      },
      currentCourses:{
        type:Array,
        default:[]
      },
      password: {
        type: String,
        required: true,
      },
      imagePath:{
        type:String,
        default:''  
      },
      otp:{
        type:Number,
        default:null
      },
      isBlocked:{
        type:Boolean,
        default:false
      },

    },
   
    {
        timestamps: true,
      })

      tutorSchema.pre('save', async function(next){
        if(!this.isModified('password'))
        next()

        const salt= await bcrypt.genSalt(10)
        this.password=await bcrypt.hash(this.password,salt)
      })
        tutorSchema.methods.matchPassword =async function(enteredPassword){
          return await bcrypt.compare(enteredPassword,this.password)
        }
      const Tutor = mongoose.model('Tutor',tutorSchema)

      export default Tutor