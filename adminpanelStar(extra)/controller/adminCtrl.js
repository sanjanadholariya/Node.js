const adminModel = require('../models/adminModel')
const moment = require('moment')
const bcrypt = require('bcrypt')
const path = require('path')
const fs = require('fs')

module.exports.dashboard = async (req , res ) => {
  try{
    return res.render('dashboard')
  }catch(err) {
    console.log(err);
    return res.redirect('/admin')
    
  }
}

module.exports.addForm = async(req,res) => {
  try{
    return res.render('addForm')
  }catch(err){
    console.log(err);
    return res.redirect('/admin')
    
  }
}

module.exports.addFormData = async(req,res)=>{
  console.log(req.body);

  req.body.password = await bcrypt.hash(req.body.password, 10);
  req.body.start_date = moment().format('MM Do YYYY, h:mm:ss a')
  req.body.update_date = moment().format('MM Do YYYY, h:mm:ss a')
  req.body.profile = req.file.filename

  await adminModel.create(req.body)

  return res.redirect('/admin/table')


  
}

module.exports.table = async(req,res)=>{
  try{
    const data = await adminModel.find()
    return res.render('table',{
      data
    })
  }
  catch(err){
    console.log(err);
    return res.redirect('/admin')
    
  }
}

module.exports.delete = async(req,res) => {
  try{
    const single = await adminModel.findById(req.params.id)
    console.log(single);

    if(single.profile){
      const oldpath = path.join(__dirname,'../uploads/',single.profile)
      fs.unlinkSync(oldpath)
    }
    await adminModel.findByIdAndDelete(req.params.id)
    return res.redirect('/admin/table')
    
  }catch(err){
    console.log(err);
    return res.redirect('/admin/table')
    
  }
}

module.exports.edit = async(req,res) => {
  try{

    const single = await adminModel.findById(req.params.id)
    console.log(single);
    
    return res.render('editAdmin',{
      single
    })
  }catch(err){
    console.log(err);
    return res.redirect('/admin/tale')
    
  }
}

module.exports.editAdminData = async(req,res) => {
  try{
    const single = await adminModel.findById(req.params.id)
    if(req.body){
      if(req.file){
        if(single.profile){
          const oldpath = path.join(__dirname,"../uploads/",single.profile)
          fs.unlinkSync(oldpath)
        }
        req.body.profile = req.file.filename
      }
      await adminModel.findByIdAndUpdate(req.params.id , req.body)
    }else{
      console.log("No Data Found !! Something Went Wrong...!!");
      return res.redirect('/admin/table')
    }
    return res.redirect('/admin/table')
  }catch(err){
    console.log(err);
    return res.redirect('/admin/table')
    
  }
}