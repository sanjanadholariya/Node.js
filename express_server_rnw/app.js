const express = require('express');
const app = express();
const port = 3000;

app.set('view engine','ejs');

app.get('/',(req , res)=>{
  return res.render('index')
})

app.get('/about',(req, res)=>{
  return res.render('about')
})

app.listen(port , ()=>{
  console.log(`server is running on port http://localhost:${port}`);
  
})