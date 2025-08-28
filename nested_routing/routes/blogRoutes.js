const express = require('express');

const routes = express.Router();

const blogCtl = require('../controllers/blogCtl')

routes.get('/',blogCtl.blog)
routes.use('/blogComment',require('./commentRoutes'))


module.exports = routes