const express = require('express')
const { login, loginAdmin, forgotPasswordPage, sendMailOTP, checkOTPpage, checkOTP, resetPasswordPage, resetPassword } = require('../controller/indexCtrl')
const { route } = require('./adminRoutes')

const routes = express.Router()

routes.use('/admin',require('./adminRoutes'))
routes.get('/',login)
routes.post('/loginAdmin',loginAdmin)
routes.get('/forgotPasswordPage',forgotPasswordPage)
routes.post('/sendMailOTP',sendMailOTP)
routes.get('/checkOTPpage',checkOTPpage)
routes.post('/checkOTP',checkOTP)
routes.get('/resetPasswordPage',resetPasswordPage)
routes.post('/resetPassword',resetPassword)

module.exports = routes