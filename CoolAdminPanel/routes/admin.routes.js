const express = require('express');
const adminModel = require('../model/adminModel')
const { Dashboard, addAdminPage, viewAdminPage, addAdmin, deleteAdmin, editAdminPage, editAdmin } = require('../controller/adminCtrl');

const routes = express.Router();

routes.get('/',Dashboard)
routes.get('/addAdminPage',addAdminPage)
routes.post('/addAdmin',adminModel.profileImageUpload , addAdmin)
routes.get('/viewAdminPage',adminModel.profileImageUpload,viewAdminPage)
routes.get('/deleteAdmin/:id',adminModel.profileImageUpload,deleteAdmin)
routes.get('/editAdminPage/:id',editAdminPage)
routes.post('/editAdmin/:id',adminModel.profileImageUpload,editAdmin)

module.exports = routes;