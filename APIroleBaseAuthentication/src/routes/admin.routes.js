const express = require('express');
const { registerAdmin, loginAdmin, myProfile, editAdmin, deleteAdmin, allAdmin, addManager, allManager, editManager, deleteManager } = require('../controller/admin.controller');
const imageUpload = require('../middleware/imageUpload');
const verifyToken = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole')

const routes = express()

// admin related routes
routes.post('/registerAdmin',imageUpload.single('profile'),registerAdmin)
routes.post('/loginAdmin',loginAdmin)
routes.get('/myProfile',verifyToken,myProfile)
routes.put('/editAdmin',verifyToken,imageUpload.single('profile'),editAdmin)
routes.delete('/deleteAdmin',imageUpload.single('profile'),deleteAdmin)
routes.get('/allAdmin',verifyToken,allAdmin)

// manager's routes that manage by admins 

routes.post('/addManager',verifyToken ,verifyRole('Admin'),imageUpload.single('profile'), addManager)
routes.get('/allManager',verifyToken , verifyRole('Admin', 'Manager'),imageUpload.single('profile'),allManager)
routes.put('/editManager',verifyToken,verifyRole('Admin'),imageUpload.single('profile'),editManager)
routes.delete('/deleteManager',verifyToken , verifyRole('Admin'),imageUpload.single('profile'),deleteManager)



module.exports = routes;