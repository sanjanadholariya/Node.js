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
        const admin = await adminModel.findOne({email : req.body.email})
        console.log(admin);
        
        res.cookie('adminData',admin);
        

    }catch(err){
        console.log(err);
        return res.redirect('/')
        
    }
}