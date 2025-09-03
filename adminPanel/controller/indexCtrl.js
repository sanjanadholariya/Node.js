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
    console.log(req.body);
    return res.redirect('/admin')
  }
  catch(err){
    console.log(err);
    return res.redirect('/')
    
  }
  
}