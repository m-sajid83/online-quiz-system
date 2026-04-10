import { useNavigate } from "react-router-dom"

function Home() {

  const navigate = useNavigate()

  const startQuiz = () => {
    const questions = JSON.parse(localStorage.getItem("questions")) || []

    if (questions.length === 0) {
      alert("No questions available. Contact Admin.")
      return
    }

    navigate("/quiz")
  }

  return (
    <div className="container home-container fade-in">

      <div className="app-icon">🧠</div>

      <h1 className="app-title">QuizMaster</h1>

      <p className="tagline">
        Test your knowledge. Challenge your mind.
      </p>

      <div className="home-buttons">
        <button onClick={startQuiz}>
          Start Quiz
        </button>

        <button className="secondary-btn" onClick={() => navigate("/admin-login")}>
          Admin Panel
        </button>
      </div>

    </div>
  )
}

export default Home