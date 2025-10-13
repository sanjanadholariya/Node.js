const express = require('express')
const app = express();
const port = 8001;
const db = require('./config/dbConnect')
const path = require('path')

app.use(express.urlencoded())
app.use(express.json())

app.set('/uploads',express.static(path.join(__dirname,'/src/uploads')))

app.use('/api',require('./routes/index.routes'))

app.listen(port , (err)=>{
    err ? console.log(err) : console.log(`server is running on port http://localhost:${port}`)
})