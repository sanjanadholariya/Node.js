const express = require('express')

const routes = express.Router()

const quizCtrl = require('../controllers/quizCtrl')

routes.get('/',quizCtrl.startQuiz)
routes.get('/addQuiz',quizCtrl.addQuiz)
routes.post('/add',quizCtrl.add)
routes.post('/nextQuestion/:index/:count',quizCtrl.nextQuestion)
routes.get('/score',quizCtrl.score)


module.exports = routes;