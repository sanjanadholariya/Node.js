const express = require('express')

const port = 8001;

const app = express()

const db = require('./config/db')

const quizModel = require('./models/quizModel')

app.listen(port , (err) => {
  err ? console.log(err) : console.log(`server is running on port ${port}`);
  
})