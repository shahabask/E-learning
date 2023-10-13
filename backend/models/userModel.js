import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
      },
      secondName:{
        type:String,
        required:false
      },
      email: {
        type: String,
        required: true,
        unique: true,
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
      }
    },
   
    {
        timestamps: true,
      })

      userSchema.pre('save', async function(next){
        if(!this.isModified('password'))
        next()

        const salt= await bcrypt.genSalt(10)
        this.password=await bcrypt.hash(this.password,salt)
      })
        userSchema.methods.matchPassword =async function(enteredPassword){
          return await bcrypt.compare(enteredPassword,this.password)
        }
      const User = mongoose.model('User',userSchema)

      export default User