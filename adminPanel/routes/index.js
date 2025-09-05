const express = require('express')
const { login, loginUser, logoutUser, forgotPassword, sendMailWithOTP } = require('../controller/indexCtrl')
const { route } = require('./adminRoutes')

const routes = express.Router()

routes.get('/',login)
routes.post('/loginUser',loginUser)
routes.use('/admin',require('./adminRoutes'))
routes.get('/logoutUser',logoutUser)
routes.get('/forgotPassword',forgotPassword)
routes.post('/sendMailWithOTP',sendMailWithOTP)

module.exports = routes