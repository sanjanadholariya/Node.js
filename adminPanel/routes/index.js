const express = require('express')
const { login, loginUser, logoutUser, forgotPassword, sendMailWithOTP, checkOtpPage, verifyOtp, resetPassword } = require('../controller/indexCtrl')
const { route } = require('./adminRoutes')

const routes = express.Router()

routes.get('/',login)
routes.post('/loginUser',loginUser)
routes.use('/admin',require('./adminRoutes'))
routes.get('/logoutUser',logoutUser)
routes.get('/forgotPassword',forgotPassword)
routes.post('/sendMailWithOTP',sendMailWithOTP)
routes.get('/checkOtpPage',checkOtpPage)
routes.post('/verifyOtp',verifyOtp)
routes.get('/resetPassword',resetPassword)

module.exports = routes