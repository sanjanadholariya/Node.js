const express = require('express');
const { addAdmin, loginAdmin, deleteAdmin, editAdmin, changePassword } = require('../controller/admin.controller');
const routes = express.Router()

const {storage} = require('../middleware/storage')
const multer = require('multer');
const verifyToken = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');
const upload = multer({storage})

routes.post('/addAdmin',upload.single('profile'),addAdmin)
routes.post('/loginAdmin',loginAdmin)
routes.delete('/deleteAdmin/:id',deleteAdmin)  //  when we use path params then postman me params tab me id pass nahi krvani uske badle me delete admin ki jo url jaha pr likhte h us path me end me '/' krne k bad id likhni h usko path params bolte h

routes.put('/editAdmin/:id',verifyToken,verifyRole('Admin'),upload.single('profile'),editAdmin)
routes.post('/changePassword/:id',verifyToken,verifyRole('Admin'),changePassword)


module.exports = routes;