const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');

module.exports.registerUser = async(req , res) =>{
    try {
     
        req.body.profile = req.file.filename;
        req.body.password = await bcrypt.hash(req.body.password , 12)
        // console.log(req.body)
        await userModel.create(req.body)
        return res.json({message : "Register User Success",status : 200})
    } catch (error) {
        console.log(error);
        return res.json({message : "Internal Server Error",status : 501})
    }
}