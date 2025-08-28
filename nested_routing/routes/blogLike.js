const express = require('express')

const routes = express.Router()

const likeCtl = require('../controllers/like')

routes.get('/',likeCtl.like)

module.exports = routes