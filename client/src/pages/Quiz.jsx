import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Quiz() {

  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [answers, setAnswers] = useState([])   // NEW: store selected answers

  const navigate = useNavigate()

  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("questions")) || []

    // Shuffle Questions
    stored = stored.sort(() => Math.random() - 0.5)
    stored = stored.map(q => ({
      ...q,
      options: q.options.sort(() => Math.random() - 0.5)
    }))

    setQuestions(stored)
  }, [])

  // Timer Logic
  useEffect(() => {

    if (timeLeft === 0) {
      nextQuestion()
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)

  }, [timeLeft])

  const handleOptionClick = (option) => {
    if (selected !== null) return

    setSelected(option)

    // Save selected answer
    setAnswers(prev => [...prev, option])

    if (option === questions[currentIndex].answer) {
      setScore(prev => prev + 1)
    }
  }

  const submitQuizToBackend = async (finalScore) => {
    try {
      await fetch("http://localhost:5000/api/submit-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: "12345",   // Replace with logged-in user ID if available
          answers: answers,
          score: finalScore
        })
      })
    } catch (error) {
      console.error("Error submitting quiz:", error)
    }
  }

  const nextQuestion = async () => {
    setSelected(null)
    setTimeLeft(10)

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1)
    } else {

      await submitQuizToBackend(score)

      navigate("/result", {
        state: { score, total: questions.length }
      })
    }
  }

  if (questions.length === 0) {
    return (
      <div className="container">
        <h2>No questions available</h2>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]

  return (
    <div className="container">

      <h2>Quiz</h2>

      <p className={`timer ${timeLeft <= 3 ? "timer-warning" : ""}`}>
        Time Left: {timeLeft} seconds
      </p>

      <p>
        Question {currentIndex + 1} of {questions.length}
      </p>

      <h3>{currentQuestion.question}</h3>

      {currentQuestion.options.map((option, index) => (
        <button
          key={index}
          className={
            selected === null
              ? ""
              : selected === option
                ? option === currentQuestion.answer
                  ? "correct"
                  : "wrong"
                : "disabled-option"
          }
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </button>
      ))}

      {selected && (
        <button onClick={nextQuestion}>
          {currentIndex + 1 === questions.length ? "Finish Quiz" : "Next"}
        </button>
      )}

    </div>
  )
}

export default Quiz