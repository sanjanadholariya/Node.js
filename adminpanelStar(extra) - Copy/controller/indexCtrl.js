const { json } = require('express');
const adminModel = require('../models/adminModel')

module.exports.login = async(req , res ) => {
    try{
        return res.render('login')
    }catch(err){
        console.log(err);
        return res.redirect('/')
        
    }
}

module.exports.loginAdmin = async(req,res)=>{
    try{
        console.log(req.body);
        const admin = await adminModel.findOne({admin : req.body.email})
        console.log(admin);
        
        res.cookie("admin",JSON.stringify(admin))
    }catch(err){
        console.log(err);
        return res.redirect('/')
        
    }
}