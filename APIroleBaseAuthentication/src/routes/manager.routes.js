const express = require('express');
const { loginManager, addEmployee } = require('../controller/manager.controller');
const verifyToken = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');
const imageUpload = require('../middleware/imageUpload');

const routes = express.Router();

routes.post('/loginManager',loginManager)

// Actions of employee which manager can access
routes.post('/addEmployee',verifyToken,verifyRole('Manager'),imageUpload.single('profile'),addEmployee)

module.exports = routes