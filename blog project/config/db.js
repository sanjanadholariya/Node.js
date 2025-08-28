const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/blog')

const db = mongoose.connection;

db.once('open',(err)=>{
  if(err){
    console.log(err);
    return ;
    
  }
  console.log("DB os connected...");
  
})

module.exports = db;

