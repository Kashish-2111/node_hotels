 const jwt = require('jsonwebtoken')

 const jwtAuthMiddleware = (req,res,next)=>{
 //first check request headers has authorization or not 
 const authorization = req.headers.authorization;
 if(!authorization) return res.status(401).send({message:"Token not found"})
 
  
    //extract jwt token from request header
   const token =  req.headers.authorization.split(' ')[1]; //here split is used as ghe token formed is always in the form bearer space token so to split it
if(!token) return res.status(401).json({error:'Unauthorized'})

try{
//verify the JWT token
const decoded=jwt.verify(token,process.env.JWT_SECRET);

//attach user information to the request object
   
req.user=decoded;   //yha user ke alawa kuch bhi likh skte hh encodeddata userdata ya kuchbhi bs iska kaam hh req ke sath key add krdete hh payload attach krne ke liye 
   next();
}catch(err){
console.log(err);
res.status(401).json({error:'Invalid Token'})
}
}


//Function to generate jwt token

const generateToken = (userData)=>{
     //Generate a new JWT token using user data 

     return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30000});
}

module.exports = {jwtAuthMiddleware,generateToken};