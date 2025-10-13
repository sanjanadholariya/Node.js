const mongoose = require('mongoose')

const db = async(req , res) => {
    mongoose.connect(`mongodb+srv://sanjana:sanjana123@cluster0.j5x75l5.mongodb.net/api_extra`)
    .then(() => {
        console.log("db connected...")
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = db();