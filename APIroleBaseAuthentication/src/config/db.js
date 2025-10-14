const mongoose = require("mongoose")

const dbConnection = () => {
  mongoose.connect(`mongodb+srv://sanjana:sanjana123@cluster0.j5x75l5.mongodb.net/role_base_api`)
  console.log("db is connected...")
}

module.exports = dbConnection();