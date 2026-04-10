import { useLocation, useNavigate } from "react-router-dom"

function Result() {

  const location = useLocation()
  const navigate = useNavigate()

  const score = location.state?.score || 0
  const total = location.state?.total || 0
  const percentage = total ? ((score / total) * 100).toFixed(0) : 0

  return (
    <div className="container result-card">
      <h2>Quiz Completed</h2>

      <h3>Your Score: {score} / {total}</h3>
      <h3>Percentage: {percentage}%</h3>

      <button onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  )
}

export default Result