const express = require('express')

const routes = express.Router();

const subcategoryModel = require('../model/subcategoryModel');
const { addSubCategoryPage, addSubcategory } = require('../controller/subcategoryCtrl');

routes.get('/addSubCategoryPage',addSubCategoryPage)
routes.post('/addSubcategory',addSubcategory)

module.exports = routes;