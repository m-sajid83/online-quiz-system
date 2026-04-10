const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz"
  },
  questionText: String,
  options: [String],
  correctAnswer: Number
});

module.exports = mongoose.model("Question", questionSchema);