const mongoose = require('mongoose')

const dbConnect = () => {
  try {
    mongoose.connect(process.env.MONGO_URL)
    console.log("DB is connected...")
  } catch (error) {
    console.log(error)
  }
}

module.exports = dbConnect;