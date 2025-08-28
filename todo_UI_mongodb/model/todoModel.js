const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  type : {
    type : String,
    required : true
  },
  status : {
    type : String,
    required : true
  },
  date : {
    type : Date,
    required : true
  }
})

const todo = mongoose.model('todo',todoSchema)

module.exports = todo