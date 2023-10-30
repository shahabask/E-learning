import jwt from "jsonwebtoken";
import Tutor from "../models/tutorModel.js";
const secret = process.env.JWT_SECRET;


const tutorauthcheck =  async (req, res, next) => {
    
  const token = req.headers.authorization;
  console.log('token',token)
  if (token) {
    console.log('working')
    try {
      // Remove the "Bearer " prefix from the token (if present)
      const tokenWithoutBearer = token.replace("Bearer ", "");
      
      const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
      

      // Fetch user details and attach to the request
      req.user = await Tutor.findById(decoded.tutorId).select('-password');
      // console.log('not working',req.user)
      console.log('is it working no2',decoded)
      next();
    } catch (error) {
      console.log(error,'are you here');
      res.status(401).json(error)
      
    }
  } else {
    res.status(401).json('error')
    console.log('error occured')
  }
};

export default tutorauthcheck;