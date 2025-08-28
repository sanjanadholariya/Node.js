const mongoose = require('mongoose')

const budgetSchema = mongoose.Schema({
  budget : {
    type : String,
    required : true
  }
})

const budget = mongoose.model('budget',budgetSchema)

module.exports = budget