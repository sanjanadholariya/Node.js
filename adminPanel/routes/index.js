const express = require('express')
const { login, loginUser, logoutUser } = require('../controller/indexCtrl')
const { route } = require('./adminRoutes')

const routes = express.Router()

routes.get('/',login)
routes.post('/loginUser',loginUser)
routes.use('/admin',require('./adminRoutes'))
routes.get('/logoutUser',logoutUser)

module.exports = routes