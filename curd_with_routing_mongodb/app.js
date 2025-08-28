const express = require('express');
const db = require('./config/db');

const app = express();

const fs = require('fs')

const port = 8001;

const path = require('path')

const crudModel = require('./model/crudModel');
const crud = require('./model/crudModel');

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.set('view engine','ejs')
app.use(express.urlencoded())


// app.get('/',(req,res)=>{
//   return res.render('crud')
// })

// app.post('/addData',crudModel.imageUpload,(req,res)=>{
//   console.log(req.body);
//   console.log(req.file);
//   if(req.file){
//     req.body.profile = '/uploads/'+ req.file.filename;
//       }  
//   crudModel.create(req.body)
//   res.redirect('/viewData')
  
// })

// app.get('/viewData',async(req,res)=>{
// const allData =await crudModel.find()
//   // console.log(allData);
//   return res.render('view_Data',{
//     allData
//   }) 
// })

// app.get('/deleteData',async(req,res)=>{
//   const data = await crudModel.findById(req.query.id)
//   if(data.profile){
//     fs.unlinkSync(path.join(__dirname,data.profile))
//   }
//   // console.log(req.query.id);
//   await crudModel.findByIdAndDelete(req.query.id)
//   res.redirect('/viewData')
  
// })

// app.get('/editData/:id',async(req,res)=>{
//   // console.log(req.params.id);
//   let single = await crudModel.findById(req.params.id)
//   // console.log(single);
  
//   return res.render('edit',{
//     single
//   })
  
// })

// app.post('/editObject/:id',crudModel.imageUpload,async(req,res)=>{

//   const data = await crudModel.findById(req.params.id)
//   // console.log(data);
  
//   if(req.file){
//     if(data.profile){
//       let oldPath = path.join(__dirname,data.profile)
//       // console.log(oldPath);
//       fs.unlinkSync(oldPath)
      
//       // fs.unlinkSync()
      
//     }
//     req.body.profile = '/uploads/' + req.file.filename;
//   }
//   else{
//     req.body.profile =  data.profile
//   }

//   await crudModel.findByIdAndUpdate(req.params.id,req.body)
//   return res.redirect('/viewData')
// })
app.use('/',require('./routes/index'))
app.listen(port,(err)=>{
  if(err){
    console.log(err);
    
  }
  console.log("server is running...");
  
})