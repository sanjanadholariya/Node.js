const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')

const verifyToken = async(req , res , next) => {
    // console.log(req.headers.authorization)
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.json({message : "Authorization is missing !"})
    }
    let token = authorization.split(" ")[1];
    // console.log(token);
    let {userId} = jwt.verify(token , 'testing');
    const user = await userModel.findById(userId)
    // console.log(user)

    req.user = user;

    next();
}

module.exports = verifyToken;