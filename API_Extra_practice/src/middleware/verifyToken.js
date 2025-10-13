const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')

const verifyToken = async(req , res , next) => {
    try {
        // console.log(req.headers.authorization)
        const authorization = req.headers.authorization;

        if(authorization){
            const token = authorization.split(" ")[1]
            // console.log(token);
            const {userId} = jwt.verify(token , 'testing');
            // console.log(userId);
            const user = await userModel.findById(userId)
            req.user = user;
            next();
        }else{
            return res.json({message : "Unauthorized User"})
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = verifyToken;