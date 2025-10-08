const mongoose = require('mongoose')

const dbConnect = async() => {
    await mongoose.connect(`mongodb+srv://sanjana:sanjana123@cluster0.j5x75l5.mongodb.net/api`);
    console.log("database connected...")
}

module.exports = dbConnect();