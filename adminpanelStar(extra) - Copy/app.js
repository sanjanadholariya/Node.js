const express = require('express')

const port = 8001;

const app = express()

const path = require('path')

const db = require('./config/db')

const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.use(express.urlencoded())

app.set('view engine','ejs')

app.use(express.static(path.join(__dirname , 'assets')))
app.use('/uploads', express.static('uploads'));

app.use('/',require('./routes'))

app.listen(port , (err) => {
  err ? console.log(err) : console.log(`server is running on port ${port}`);
})