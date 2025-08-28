const express = require('express')
const routes = express();
const crudController = require('../controller/crudController')
const crudModel = require('../model/crudModel')

routes.get('/',crudController.add)


routes.post('/addData',crudModel.imageUpload,crudController.addData)


routes.get('/viewData',crudController.viewData)


routes.get('/deleteData', crudController.deleteData)

routes.get('/editData/:id',crudController.editData)


routes.post('/editObject/:id',crudModel.imageUpload,crudController.editObject)

module.exports = routes;