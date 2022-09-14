require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);

const wordSchema = new mongoose.Schema({
  word: String,
  definition: String
});

const Word = mongoose.model('Word', wordSchema);

module.exports.Word;

// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them
