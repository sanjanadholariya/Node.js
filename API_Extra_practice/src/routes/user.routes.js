const express = require('express');
const { profile, allUsers, deleteUser, editUser } = require('../controller/user.controller');

const routes = express.Router();

routes.get('/profile',profile)
routes.get('/allUsers',allUsers)
routes.delete('/deleteUser',deleteUser)
routes.patch('/editUser',editUser)


module.exports = routes;