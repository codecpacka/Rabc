const mongoose = require("mongoose")
const suggestionSchema = new mongoose.Schema({
  suggestion: {
    type: String,
    required: true,
    lowercase: true,
  },
  type: {
    type: String,
  },
})
const Suggestion = mongoose.model("Suggestion", suggestionSchema)
module.exports = Suggestion
