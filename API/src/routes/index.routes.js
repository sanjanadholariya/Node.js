const express = require('express');
const imageUpload = require('../middleware/imageUpload');
const { registerUser, loginUser } = require('../controller/user.controller');
const verifyToken = require('../middleware/verifyToken');

const routes = express.Router();

routes.post('/register',imageUpload.single('profile'),registerUser)
routes.post('/login',loginUser)

routes.use('/user',verifyToken,require('./user.routes'))

module.exports = routes;