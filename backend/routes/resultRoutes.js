const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

router.post("/submit-quiz", async (req, res) => {
  try {
    const { userId, answers, score } = req.body;

    const newResult = new Result({
      userId,
      answers,
      score
    });

    await newResult.save();

    res.status(201).json({ message: "Quiz submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;