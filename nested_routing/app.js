const express = require('express')

const app = express();

const port = 8001;

const path = require('path')

app.set('view engine','ejs')

app.set('views',path.join(__dirname,'views'))

app.use('/',require('./routes'))

app.listen(port , (err) => {
  err ? console.log(err) : console.log(`server is running on port ${port}`);
  ;
})