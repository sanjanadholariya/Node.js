const adminModel = require('../model/adminModel')

module.exports.login = async(req , res)=>{
  try{
    return res.render('login')
  }catch(err){
    console.log(err);
    return res.redirect('/')
    
  }
}

module.exports.loginUser = async(req,res)=>{
  try{
    const admin = await adminModel.findOne(req.body.email)
    console.log(admin);
    
    return res.redirect('/admin')
  }
  catch(err){
    console.log(err);
    return res.redirect('/')
    
  }
  
}