const express = require('express')

const app = express();

const port = 8001;

const db = require('./config/db')

const path = require('path')

app.use(express.urlencoded())
app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

app.use('/api',require('./routes/index.routes'))

app.listen(port , (err) => {
    err ? console.log(err) : console.log(`server is running on http://localhost:${port}`)
})