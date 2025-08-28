const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
  todo : {  // form input type name
    type : String,  // input type
    required : true  // if we want that user's empty field can not add in database then write "true"
  },
  type : {
    type : String,
    required : true
  }
})

const todo = mongoose.model('todo',todoSchema); 
                          // 'todo' = collection name in database = singular (must)
                          // 'todos' = appear in database collection = plural 

module.exports = todo;
