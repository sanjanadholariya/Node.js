const adminModel = require('../model/adminModel')
const bcrypt = require('bcrypt')

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