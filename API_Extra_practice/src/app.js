const express = require('express')
const port = 8001;
const app = express()

const db = require('./config/dbConnection')

app.use(express.urlencoded())
app.use(express.json())

app.use('/api',require('./routes/index.routes'))

app.listen(port , (err) => {
    err ? console.log(err) : console.log(`Server is running on http://localhost:${port}`)
})