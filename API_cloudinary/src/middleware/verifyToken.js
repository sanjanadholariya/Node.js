const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')

const verifyToken = async(req , res , next) => {
  try {
      const authorization = req.headers.authorization;
      if(authorization){
        // console.log(authorization)
        const token = authorization.split(' ')[1]
        // console.log(token);
        const {userId} = jwt.verify(token , process.env.JWT_SECRET)
        // console.log(userId)
        const user = await userModel.findById(userId).select('-password')
        req.user = user;
        next();
      }else{
        return res.status(401).json({message : "Unauthorized User !"})
      }
  } catch (error) {
    console.log(error)
    return res.status(500).json({message : "Internal server Error !"})
  }
}

module.exports = verifyToken;