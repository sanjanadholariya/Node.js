const express = require('express');
const { registerUser, loginUser } = require('../controller/user.controller');
const imageUpload = require('../middleware/imageUpload');
const verifyToken = require('../middleware/verifyToken');
const routes = express();

routes.post('/registerUser',imageUpload.single('profile'),registerUser)
routes.post('/loginUser',loginUser)

routes.use('/user',verifyToken,require('./user.routes'))

module.exports = routes