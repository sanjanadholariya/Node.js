const express = require('express');
const { registerUser } = require('../controller/user.controller');

const routes = express.Router();

// routes.get('/registerUser',registerUser)
routes.post('/registerUser',registerUser)

module.exports = routes;