const crudModel = require('../model/crudModel')
const fs = require('fs')
const path = require('path')

module.exports.add = (req,res)=>{
  return res.render('crud')
}

module.exports.addData = (req,res)=>{
  console.log(req.body);
  console.log(req.file);
  if(req.file){
    req.body.profile = '/uploads/'+ req.file.filename;
      }  
  crudModel.create(req.body)
  res.redirect('/viewData')
  
}

module.exports.viewData = async(req,res)=>{
const allData =await crudModel.find()
  // console.log(allData);
  return res.render('view_Data',{
    allData
  }) 
}

module.exports.deleteData = async(req,res)=>{
  const data = await crudModel.findById(req.query.id)
  if(data.profile){
    fs.unlinkSync(path.join(__dirname,'..'+ data.profile))
  }
  // console.log(req.query.id);
  await crudModel.findByIdAndDelete(req.query.id)
  res.redirect('/viewData')
  
}

module.exports.editData = async(req,res)=>{
  // console.log(req.params.id);
  let single = await crudModel.findById(req.params.id)
  // console.log(single);
  
  return res.render('edit',{
    single
  })
  
}

module.exports.editObject = async(req,res)=>{

  const data = await crudModel.findById(req.params.id)
  // console.log(data);
  
  if(req.file){
    if(data.profile){
      let oldPath = path.join(__dirname,'..' + data.profile)
      // console.log(oldPath);
      fs.unlinkSync(oldPath)
      
      // fs.unlinkSync()
      
    }
    req.body.profile = '/uploads/' + req.file.filename;
  }
  else{
    req.body.profile =  data.profile
  }

  await crudModel.findByIdAndUpdate(req.params.id,req.body)
  return res.redirect('/viewData')
}