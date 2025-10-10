const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String
    },
    profile : {
        type : String
    },
    gender : {
        type : String,
        enum : ["Male","Female"]
    }
},{
    timestamps : true,
    versionKey : false
})

module.exports = mongoose.model('user',userSchema);