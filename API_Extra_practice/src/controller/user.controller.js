const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.userRegister = async(req , res) =>{
    try {
    //    console.log(req.file.filename)
       req.body.profile = req.file.filename
       req.body.password = await bcrypt.hash(req.body.password , 10)
       console.log(req.body)

       const existUser = await userModel.findOne({email : req.body.email})

       if(existUser){
        return res.json({message : "Already Registered User"})
       }

       await userModel.create(req.body)

        return res.json({message : "User Register Success",status : 200})
    } catch (error) {
        console.log(error)
        return res.json({message : "Internal Server Error"})
    }
}

module.exports.loginUser = async(req , res) => {
    try {
        const single = await userModel.findOne({email : req.body.email})

        if(single){
            const matchPass = await bcrypt.compare(req.body.password , single.password)
            if(matchPass){
                let token = jwt.sign({userId : single._id},'testing')
                console.log(token)
                return res.json({message : "Login Success",status : 200, data : token})
            }else{
                return res.json({message : "Invalid Credentials"})
            }
        }else{
            return res.json({message : "User Not Register"})
        }
    } catch (error) {
        console.log(error)
        return res.json({message : "Internal Server Error",status : 501})
    }
}

module.exports.allUsers = async(req , res) => {
    try {
        const allUsers = await userModel.find().select('-password')
        return res.json({message : "success",status : 200,data : allUsers})
    } catch (error) {
        console.log(error)
        return res.json({message : "Internal Server Error",status : 501})
    }
}