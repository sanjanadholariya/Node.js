const express = require('express')

const routes = express.Router()

const adminCtrl = require('../controller/adminCtrl')

const adminModel = require('../model/adminModel')

routes.get('/',adminCtrl.admin)
routes.get('/view',adminCtrl.view)
routes.get('/addAdmin',adminCtrl.addAdmin)
routes.post('/addForm',adminModel.imageUpload,adminCtrl.addForm)
routes.get('/delete/:id',adminCtrl.delete)
routes.get('/edit/:id',adminCtrl.editAdmin)
routes.post('/edit/:id',adminModel.imageUpload,adminCtrl.edit)
routes.get('/viewSingle/:id',adminCtrl.viewSingle)
routes.get('/changePasswordPage', adminCtrl.changePasswordPage)
routes.post('/chnagePassword',adminCtrl.changePassword)
routes.get('/viewProfile',adminCtrl.viewProfile)

module.exports = routes