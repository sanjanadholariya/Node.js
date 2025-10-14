const express = require('express');
const { registerAdmin, loginAdmin, myProfile, editAdmin, deleteAdmin } = require('../controller/admin.controller');
const imageUpload = require('../middleware/imageUpload');
const verifyToken = require('../middleware/verifyToken');

const routes = express()

routes.post('/registerAdmin',imageUpload.single('profile'),registerAdmin)
routes.post('/loginAdmin',loginAdmin)
routes.get('/myProfile',verifyToken,myProfile)
routes.put('/editAdmin',verifyToken,imageUpload.single('profile'),editAdmin)
routes.delete('/deleteAdmin',imageUpload.single('profile'),deleteAdmin)


module.exports = routes;