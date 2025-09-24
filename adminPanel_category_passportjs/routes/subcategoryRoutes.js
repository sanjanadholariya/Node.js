const express = require('express')

const routes = express.Router();

const subcategoryModel = require('../model/subcategoryModel');
const { addSubCategoryPage } = require('../controller/subcategoryCtrl');

routes.get('/addSubCategoryPage',addSubCategoryPage)

module.exports = routes;