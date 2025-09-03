const express = require('express')

const port = 8001;

const app = express()

const db = require('./config/db')

const quizModel = require('./models/quizModel')

const session = require('express-session');

app.use(session({
  secret: 'quiz-secret',
  resave: false,
  saveUninitialized: true
}));


app.set('view engine','ejs')

app.use(express.urlencoded())

app.use('/',require('./routes/index'))

app.listen(port , (err) => {
  err ? console.log(err) : console.log(`server is running on port ${port}`);
  
})