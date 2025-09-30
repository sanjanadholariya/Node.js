const express = require('express');
const { route } = require('./adminRoutes');
const {  addExtraCategoryPage, addExtraCategory, viewExtraCategoryPage, deleteExtraCategory, editExtraCategoryPage, editExtraCategory, extraSubCategoryDropdown } = require('../controller/extracategoryCtrl');

const routes = express.Router()

routes.get('/addExtraCategoryPage',addExtraCategoryPage)
routes.post('/addExtraCategory',addExtraCategory)
routes.get('/subcategory',extraSubCategoryDropdown)
routes.get('/viewExtraCategoryPage',viewExtraCategoryPage)
routes.get('/deleteExtraCategory/:id',deleteExtraCategory)
routes.get('/editExtraCategoryPage/:id',editExtraCategoryPage)
routes.post('/editExtraCategory/:id',editExtraCategory)

module.exports = routes;