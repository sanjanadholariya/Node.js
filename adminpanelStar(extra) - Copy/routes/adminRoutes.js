const express = require('express')

const routes = express.Router()

const adminCtrl = require('../controller/adminCtrl')

const adminModel = require('../models/adminModel')

routes.get('/',adminCtrl.dashboard)
routes.get('/addForm',adminCtrl.addForm)
routes.post('/addFormData',adminModel.uploadImage,adminCtrl.addFormData)
routes.get('/table',adminCtrl.table)
routes.get('/delete/:id',adminModel.uploadImage,adminCtrl.delete)
routes.get('/edit/:id',adminCtrl.edit)
routes.post('/editAdminData/:id',adminModel.uploadImage,adminCtrl.editAdminData)
routes.get('/viewSingle/:id',adminCtrl.viewSingle)

module.exports = routes