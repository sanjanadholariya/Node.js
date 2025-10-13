const express = require('express');
const { allUsers } = require('../controller/user.controller');
const verifyToken = require('../middleware/verifyToken')

const routes = express.Router();

routes.get('/',verifyToken,allUsers)

module.exports = routes;