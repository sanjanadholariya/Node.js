const express = require('express')

const routes = express.Router()

const commentCtl = require('../controllers/commentCtl')

routes.get('/',commentCtl.blogComment)
routes.use('/like',require('./blogLike'))

module.exports = routes