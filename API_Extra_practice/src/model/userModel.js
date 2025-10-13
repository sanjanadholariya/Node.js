const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type : String
    },
    email :{
        type : String
    },
    password : {
        type : String
    },
    gender : {
        type : String,
        enum : ["Male","Female"]
    },
    profile : {
        type : String
    }
},{
    versionKey : false,
    timestamps  : true
}
)

module.exports = mongoose.model('user',userSchema);