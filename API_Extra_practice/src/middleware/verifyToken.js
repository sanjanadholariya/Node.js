const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel');

const verifyToken = async(req , res , next) => {
    try {
        const authorization = req.headers.authorization;
        if(!authorization){
            return res.json({message : "unauthorized user"})
        }
        else{
            // console.log(authorization)
            const token = authorization.split(" ")[1]
            const {userId} = jwt.verify(token,'testing')
            console.log(userId)

            const user = userModel.findById(userId);
            req.user = user
            next();
        }
    } catch (error) {
        console.log(error)
        return res.json({message : "unauthorized user"})
    }
}

module.exports = verifyToken;