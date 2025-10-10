const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.registerUser = async(req , res) =>{
    try{
        // console.log(req.body);
        // console.log(req.file);
        const existUser = await userModel.findOne({email : req.body.email})

        if(existUser){
            return res.json({message : "User already exist !"})
        }else{
            if(req.file){
                req.body.profile = `/uploads/${req.file.filename}`
            }
            else{
                req.body.profile = "";
            }
            req.body.password = await bcrypt.hash(req.body.password,10);
            await userModel.create(req.body)
            // console.log(req.body)
            return res.json({message : "register User success",status : 200 })
        }
        
        
    }catch(err){
        console.log(err);
        return res.json({message:"Internal Server Error",status : 501})
    }
}

module.exports.loginUser = async(req,res) => {
    try{    
        // console.log(req.body)
        const existUser = await userModel.findOne({email : req.body.email})
        if(!existUser){
            return res.json({message : "User does not exist ! Register First."})
        }else{
            const passMatch = await bcrypt.compare(req.body.password , existUser.password)
            if(passMatch){
                let token = jwt.sign({userId : existUser._id},'testing',)
                return res.json({message : "login User success",status : 200,data : token})
            }else{
                return res.json({message : "Invalid Credential !"})
            }
        }
    }catch(err){
        console.log(err)
        return res.json({message:"Internal Server Error",status : 501})
    }
}

module.exports.allUser = async(req , res) => {
    try{
        const allUser = await userModel.find().select('-password')
        return res.json({message : "success" , status : 200 , data : allUser})
    }catch(err){
        console.log(err) 
        return res.json({message : "Internal Server Error" , status : 501})
    }
}