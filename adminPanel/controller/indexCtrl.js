const adminModel = require('../model/adminModel')
const bcrypt = require('bcrypt')
const mailMessage = require('../config/middleware/mailMessage')

module.exports.login = async(req , res)=>{
  try{
    if(req.cookies.admin==undefined || req.cookies.admin._id == undefined){
      return res.render('login')
    }
    else{
      return res.redirect('/admin')
    }
    
  }catch(err){
    console.log(err);
    return res.redirect('/')
    
  }
}

module.exports.loginUser = async(req,res)=>{
  try{
    const admin = await adminModel.findOne({email : req.body.email})
    if(admin){
      if(admin.email == req.body.email && await bcrypt.compare(req.body.password, admin.password)){
        console.log("match !");
        res.cookie('admin',admin)
        return res.redirect('/admin')
      }
      else{
        console.log("Invalid Credentials !!");
        return res.redirect('/')
      }
    }
    else{
      console.log("no admin")
      return res.redirect('/')
    }
  }
  catch(err){
    console.log(err);
    return res.redirect('/')
    
  }
  
}

module.exports.logoutUser = async(req,res) => {
  res.clearCookie('admin')
  return res.redirect('/')
}

module.exports.forgotPassword = async(req,res)=>{
  console.log("Forgot Password");
  return res.render('forgotPassword')
  
}

module.exports.sendMailWithOTP = async(req,res)=>{
  
  try{
    let OTP = Math.floor(Math.random()*1000)

  let msg = {
    from : "sanjanadholariya926@gmail.com",
    to : "khanparautsav@gmail.com",
    subject : "Demo",
    html : `<p>Hello...!!</p>
    <p>Your One Time Password Is ${OTP}.</p>`
  }
  await mailMessage.sendEmail(msg)
  console.log("Send Mail With OTP !")
  console.log(req.body.email);


  
  }catch(err){
    console.log(err);
    return res.redirect('/')
    
  }
}