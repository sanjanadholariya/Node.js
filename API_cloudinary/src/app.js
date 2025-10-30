require('dotenv').config()
const express = require('express')
const port = process.env.port
const app = express();
const db = require('./config/db')
const morgan = require('morgan')

db();

app.use(morgan('dev'))
app.use(express.urlencoded())
app.use(express.json())

app.use('/api',require('./routes/index'))

app.listen(port , (err) => {
  err ? console.log(err) : console.log(`Server is running on http://localhost:${port}`)
})