const mongoose = require('mongoose')

const dbConnect = () => {
    try {
        mongoose.connect(`mongodb+srv://sanjana:sanjana123@cluster0.j5x75l5.mongodb.net/api-extra`)
        console.log("db connected...")
    } catch (error) {
        console.log(error)

    }
}

module.exports - dbConnect()