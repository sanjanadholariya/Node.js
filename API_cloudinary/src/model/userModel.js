const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    unique: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female']
  },
  role: {
    type: String,
    enum: ['Admin', 'Manager', 'Employee']
  },
  profile: {
    type: String
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  public_id : {
    type : String
  }

}, {
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('user', userSchema);