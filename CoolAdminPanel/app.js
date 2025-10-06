const express = require('express')

const app = express();

const port = 8001;

const path = require('path')

const db = require('./config/db')

const adminModel = require('./model/adminModel')

app.use(express.static(path.join(__dirname, 'assets')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


app.use('/',require('./routes/index'))

app.listen(port , (err) => {
    err ? console.log(err) : console.log(`server is running on port ${port}`);
})
