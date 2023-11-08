import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import tutorRoutes from './routes/tutorRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import Stripe from 'stripe'

const stripe = new Stripe('sk_test_51O9tFFSDsPPMBnLnMdMtou8UwIWhDpQJl3hXgNqJCjBwaWNDXXkDcnCvRUuvGJegH2TKKMthVMz9fNNvBasBLXGi00Bg41xYtX');
const app = express()


dotenv.config()
app.use(cors())
connectDB()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('backend/public'));
const port = 5000


app.use('/api',userRoutes)
app.use('/api/tutor',tutorRoutes)
app.use('/api/admin',adminRoutes)
// app.get('/',(req,res)=>{
//     res.send('server is running')
// })


app.listen(port,()=>{console.log('server is running')})