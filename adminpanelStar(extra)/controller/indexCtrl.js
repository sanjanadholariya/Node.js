const { json } = require("express");
const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const sendMailMiddleware = require('../config/middleware/sendMailMiddleware')

module.exports.login = async (req, res) => {
  try {
    if (
      req.cookies.adminData == undefined ||
      req.cookies.adminData._id == undefined
    ) {
      return res.render("login");
    } else {
      return res.redirect("/admin");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

module.exports.loginAdmin = async (req, res) => {
  try {
    console.log(req.body);
    const admin = await adminModel.findOne({ email: req.body.email });
    console.log(admin);

    if (admin) {
      if (
        admin.email == req.body.email &&
        (await bcrypt.compare(req.body.password, admin.password))
      ) {
        res.cookie("adminData", admin);
        return res.redirect("/admin");
      } else {
        console.log("Invalid Credential !! ");
        return res.redirect("/");
      }
    } else {
      console.log("There Is No Admin By This Email...");
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

// urvishaginoya2212@gmail.com

module.exports.forgotPasswordPage = async (req, res) => {
  try {
    if (
      req.cookies.adminData == undefined ||
      req.cookies.adminData._id == undefined
    ) {
      return res.render("forgotPasswordPage");
    } else {
      return res.redirect("/admin");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

module.exports.checkOTPpage = async(req,res) => {
    try{
        if(req.cookies.adminData == undefined || req.cookies.adminData == undefined){
            return res.render('checkOTPpage')
        }else{
            return res.redirect('/admin')
        }
    }catch(err){
        console.log(err);
        return res.redirect('/admin')
        
    }
}

module.exports.sendMailOTP = async (req, res) => {
  try {

    console.log(req.body.email);
    
    let otp = Math.floor(Math.random()*100000)
    if (
      req.cookies.adminData == undefined ||
      req.cookies.adminData._id == undefined
    ) {
      let msg = {
        from: 'sanjanadholariya926@gmail.com',
        to: "hemipatel301@gmail.com",
        subject: "Hello ✔",
        text: "Hello world?", // plain‑text body
        html: `<b>Hello world?</b> <p>Your OTP is ${otp}</p>`, // HTML body
      }

      await sendMailMiddleware.sendEmail(msg)
      res.cookie("otp",otp)
      res.cookie("email",req.body.email)
      return res.redirect('/checkOTPpage')
      
    } else {
      return res.redirect("/forgotPasswordPage");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.checkOTP = async(req,res) => {
    try{
        
            console.log(req.body.otp);
            if(req.body.otp == req.cookies.otp){
                res.clearCookie('otp')
            }
            
        
    }catch(err){
        console.log(err);
        return res.redirect('/admin')
        
    }
}