const express = require('express')

const routes = express.Router();

routes.use('/',require('./user.routes'))

module.exports = routes;