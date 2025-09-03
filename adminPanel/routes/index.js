const express = require('express')
const { login, loginUser } = require('../controller/indexCtrl')

const routes = express.Router()

routes.get('/',login)
routes.post('/loginUser',loginUser)
routes.use('/admin',require('./adminRoutes'))

module.exports = routes