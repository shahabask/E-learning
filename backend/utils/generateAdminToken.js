import Jwt from "jsonwebtoken";

const generateAdminToken =(res,adminId)=>{
 const token =Jwt.sign({adminId},1234,{expiresIn:'30d'})

//  res.cookie('adminJwt',token,{
//     httpOnly:true,
//     secure:process.env.NODE_ENV!=='development',
//     sameSite:'strict',
//     maxAge: 30*24*60*60*1000
//  })
 return token
}

export default generateAdminToken