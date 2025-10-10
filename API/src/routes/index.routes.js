const express = require('express');
const imageUpload = require('../middleware/imageUpload');
const { registerUser, loginUser } = require('../controller/user.controller');

const routes = express.Router();

routes.post('/register',imageUpload.single('profile'),registerUser)
routes.post('/login',loginUser)

routes.use('/user',require('./user.routes'))

module.exports = routes;