const express = require('express');
const { registerUser } = require('../controller/user.controller');
const imageUpload = require('../middleware/imageUpload');
const routes = express();

routes.post('/registerUser',imageUpload.single('profile'),registerUser)

module.exports = routes