const mongoose = require('mongoose')

const quizSchema = mongoose.Schema({
  question : {
    type : String,
    required : true
  },
  option1 : {
    type : String,
    required : true
  },
  option2 : {
    type : String,
    required : true
  },
  option3 : {
    type : String,
    required : true
  },
  option4 : {
    type : String,
    required : true
  },
  ans : {
    type : String,
    required : true
  },
  check : {
    type : Boolean,

  },
  options : {
    type : Array,
    required : true
  }
})

const quiz = mongoose.model('quiz',quizSchema)

module.exports = quiz;