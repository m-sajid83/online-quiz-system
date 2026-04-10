const express = require("express");
const router = express.Router();

const {
  createQuiz,
  getAllQuizzes,
  updateQuiz,
  deleteQuiz
} = require("../controllers/quizController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public route (anyone logged in can view quizzes)
router.get("/", protect, getAllQuizzes);

// Admin-only routes
router.post("/", protect, adminOnly, createQuiz);
router.put("/:id", protect, adminOnly, updateQuiz);
router.delete("/:id", protect, adminOnly, deleteQuiz);

module.exports = router;
