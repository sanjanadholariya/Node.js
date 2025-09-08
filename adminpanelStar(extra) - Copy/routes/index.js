const express = require('express')
const { login, loginAdmin } = require('../controller/indexCtrl')

const routes = express.Router()

routes.use('/admin',require('./adminRoutes'))
routes.get('/',login)
routes.post('/loginAdmin',loginAdmin)

module.exports = routes