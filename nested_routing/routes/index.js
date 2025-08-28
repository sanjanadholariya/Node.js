const express = require('express')

const routes = express.Router();

routes.use('/blog',require('./blogRoutes'))

module.exports = routes;