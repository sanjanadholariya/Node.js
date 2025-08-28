const db = require('./config/db')

const express = require('express');

const app = express();

const port = 8001;

app.set('view engine','ejs');
app.use(express.urlencoded())

const todoModel = require('./model/todoModel') // todoModel -> todoSchema , todo (collection of database)

app.get('/',async(req,res)=>{
  const allTask =await todoModel.find()
  console.log(allTask);
  return res.render('todo',{
    allTask
  });
})

app.post('/addtask' , async(req,res)=>{
  console.log(req.body)
  await todoModel.create(req.body)  
  
  
  res.redirect('/')
})

app.get('/deleteTodo',async(req,res)=>{
  console.log(req.query.id);
  await todoModel.findByIdAndDelete(req.query.id)
  res.redirect('/')
  
})

app.listen(port , (err) => {
  if(err){
    console.log(err);
    
  }
  console.log("server is start");
})