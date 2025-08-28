const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/budget')

const db = mongoose.connection;

db.once('open',(err)=>{
  err ? console.log(err) : console.log("DB is connected");
  
})

module.exports = db