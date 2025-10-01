const express = require('express')
const productModel = require('../model/productModel')
const routes = express.Router()
const { addProductPage, addProduct, viewProductPage, viewSingleProductPage } = require('../controller/productCtrl');
const passport = require('passport');

routes.get('/addProductPage',addProductPage)
routes.post('/addProduct',productModel.productImageUpload,addProduct)
routes.get('/viewProductPage',productModel.productImageUpload,viewProductPage)
routes.get('/viewSingleProductPage/:id',productModel.productImageUpload,viewSingleProductPage)

module.exports = routes;