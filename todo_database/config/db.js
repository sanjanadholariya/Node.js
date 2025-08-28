const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todoList');
                                          // databseName

const db = mongoose.connection;

db.once('open',(err)=>{
  if(err){
    console.log(err);
    
  }
  console.log("DB is connected...");
  
})

module.exports = db;