const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const uploads = '../uploads/profile'

const adminSchema = mongoose.Schema({
    name : String,
    email : String ,
    password : String,
    about : String,
    city : String,
    gender : String,
    education : Array,
    profile : String
})

const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , path.join(__dirname , uploads))
    },
    filename : (req , file , cb) => {
        cb(null , file.fieldname+'-'+Date.now() )
    }
})


adminSchema.statics.profileImageUpload = multer({storage : storage}).single('profile');

const adminModel = mongoose.model('admin',adminSchema)

module.exports = adminModel;