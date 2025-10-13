const express = require('express');
const { userRegister, loginUser } = require('../controller/user.controller');
const imageUpload = require('../middleware/imageUpload');

const routes = express.Router();

routes.post('/registerUser',imageUpload.single('profile'),userRegister)
routes.post('/loginUser',loginUser)

routes.use('/users',require('./user.routes'))

module.exports = routes;