const express = require('express');
const imageUpload = require('../middleware/imageUpload');
const { allUser } = require('../controller/user.controller');

const routes = express.Router();

routes.get('/allUser',allUser)

module.exports = routes;