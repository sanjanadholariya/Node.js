const mongoose = require('mongoose');
const uploads = '/uploads'

const multer = require('multer')

const path = require('path')

const crudSchema = mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  gender : {
    type : String,
    required : true
  },
  hobby : {
    type : Array,
    required : true
  },
  city : {
    type : String,
    required : true
  },
  about : {
    type : String,
    required : true
  },
  profile :{
    type : String,
    required:true
  }
})

const storage = multer.diskStorage({
  destination : (req,file,cb) => {
    cb(null,path.join(__dirname,".." + uploads))
  },
  filename : (req,file,cb) => {
    cb(null,file.fieldname+'-'+Date.now())
  }
})

crudSchema.statics.imageUpload = multer({storage:storage}).single('profile')

const crud = mongoose.model('crud',crudSchema);

module.exports = crud