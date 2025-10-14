const jwt = require('jsonwebtoken')
const userModel = require('../model/usersModel')

const verifyToken = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (authorization) {
      // console.log(authorization)
      const token = authorization.split(" ")[1]
      // console.log(token)
      let {userId} = jwt.verify(token , 'testing');
      // console.log(userId)
      const user = await userModel.findById(userId).select('-password')
      req.user = user
      next();
    } else {
      return res.json({ message: "Unauthorized User" })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = verifyToken;