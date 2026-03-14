const jwt = require("jsonwebtoken")

module.exports = (roles)=>{

 return (req,res,next)=>{

  try{

   const authHeader = req.headers.authorization

   if(!authHeader){
    return res.status(401).json({error:"No token provided"})
   }

   const token = authHeader.split(" ")[1]

   const decoded = jwt.verify(token,process.env.JWT_SECRET)

   if(roles && !roles.includes(decoded.role)){
    return res.status(403).json({error:"Access denied"})
   }

   req.user = decoded

   next()

  }catch(err){
   return res.status(401).json({error:"Invalid token"})
  }

 }

}