const express = require('express')
const Path = require('path')

const port  = 8002;

const app = express()

const db = require('./config/db')

const todoModel = require('./model/todoModel')

app.use(express.urlencoded())

app.set('view engine' , 'ejs')
app.use(express.static(Path.join(__dirname,'public')))



app.get('/',async(req,res)=>{
  let allTodo = await todoModel.find()
  console.log(allTodo);
  
  return res.render('show',{
    allTodo
  })
})
app.get('/add',(req,res)=>{
  return res.render('add');
})
app.post('/addTodo',(req,res)=>{
  // console.log(req.body);
  todoModel.create(req.body)
  return res.redirect('/')
  
})



app.listen(port , (err) => {
  err ? console.log(err): console.log(`server is running on http://localhost:${port}`);
  ;
  
})

