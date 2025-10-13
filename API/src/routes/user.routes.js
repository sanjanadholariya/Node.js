const express = require('express');
const { allUser, deleteUser, editUser } = require('../controller/user.controller');
const imageUpload = require('../middleware/imageUpload');

const routes = express.Router();

routes.get('/allUser',allUser)
// routes.get('')
routes.delete('/deleteUser',deleteUser)
routes.put('/editUser',imageUpload.single('profile'),editUser)

module.exports = routes;