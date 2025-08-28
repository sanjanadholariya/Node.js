const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  expense : {
    type : String,
    required : true
  }
})

const expense = mongoose.model('expense',expenseSchema)

module.exports = expense