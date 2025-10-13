const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path  = require('path');

module.exports.registerUser = async(req , res) =>{
    try {
        
        const existUser = await userModel.findOne({email : req.body.email})

        if(existUser){
            return res.json({message : "User Already Exist.."})
        }

        req.body.profile = `/uploads/${req.file.filename}`;
        req.body.password = await bcrypt.hash(req.body.password , 12)
        // console.log(req.body)
        await userModel.create(req.body)
        return res.json({message : "Register User Success",status : 200})
    } catch (error) {
        console.log(error);
        return res.json({message : "Internal Server Error",status : 501})
    }
}

module.exports.loginUser = async(req , res) => {
    try {
        console.log(req.body)
        const existUser = await userModel.findOne({email : req.body.email})
        if(!existUser){
            return res.json({message : "User Not Exist ! Register First..."})
        }
        const matchPass = await bcrypt.compare(req.body.password , existUser.password)
        if(matchPass){
            const token = jwt.sign({userId : existUser._id},'testing')
            console.log(token)
            return res.json({message : "Login User Success",data : token,status : 200})
        }else{
            return res.json({message : "Invalid Credential !"})
        }

    } catch (error) {
        console.log(error)
        return res.json({message : "Internal Server Error",status :  501})
    }
}

module.exports.profile = async(req , res) => {
    try {
        // console.log(req.user);
        const user = await userModel.findById(req.user._id).select('-password')
        console.log(user)
        return res.json({message : "User Profile Data",status : 200,data : user})
    } catch (error) {
        console.log(error)
        return res.json({message : "Internal Server Error",status : 501})
    }
}

module.exports.allUsers = async(req, res) => {
    try {
        const allUsers = await userModel.find().select('-password')
        return res.json({message : "success",status : 200 , data : allUsers})
    } catch (error) {
        console.log(error)
        return res.json({message : "Internal Server Error",status : 501})
    }
}

module.exports.deleteUser = async(req ,res) => {
    try {
        console.log(req.user)
        const single = req.user
        if(single){
            if(single.profile){
                const oldPath = `../${single.profile}`
                fs.unlinkSync(path.join(__dirname,oldPath))
                console.log("Profile Deleted")
            }
            await userModel.findByIdAndDelete(single._id)
        }else{
            return res.json({message : "User Does Not Exist !",status : 404})
        }
        return res.json({message : "Delete User Success",status : 200})
    } catch (error) {
        console.log(error)
        return res.json({message : "Internal Server Error",status : 501})
    }
}

module.exports.editUser = async(req , res) =>{
    try {
        const single = req.user;
        if(single){
            if(req.file){
                if(single.profile){
                    const oldPath = `..${single.profile}`
                    fs.unlinkSync(path.join(__dirname,oldPath))
                }
                req.body.profile = `/uploads/${req.file.filename}`
                await userModel.findByIdAndUpdate(single._id , req.body)
            }
            await userModel.findByIdAndUpdate(single._id , req.body)
            const editedUser = await userModel.findById(single._id)
            console.log(editedUser)
            return res.json({message : "User Update Success",status : 200 , data :  editedUser })
        }else{
            return res.json({message : "User Not Exist ",status : 404})
        }
    } catch (error) {
        console.log(error)
        return res.json({message : "Internal Server Error",status : 501})
    }
}