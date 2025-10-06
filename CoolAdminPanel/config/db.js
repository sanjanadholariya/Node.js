const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://sanjana:sanjana123@cluster0.j5x75l5.mongodb.net/CoolAdminPanel')

const db = mongoose.connection;

db.once('open',(err) => {
    err ? console.log(err) : console.log("database is connected")
})

module.exports = db;