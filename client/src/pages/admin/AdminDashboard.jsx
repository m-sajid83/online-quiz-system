import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function AdminDashboard(){

  const navigate = useNavigate()
  const [questions,setQuestions] = useState([])

  useEffect(()=>{

    const isAdmin = localStorage.getItem("isAdmin")

    if(!isAdmin){
      navigate("/admin-login")
    }

    const stored = JSON.parse(localStorage.getItem("questions")) || []
    setQuestions(stored)

  },[])

  const deleteQuestion = (index)=>{

    const updated = questions.filter((q,i)=> i !== index)

    setQuestions(updated)

    localStorage.setItem("questions",JSON.stringify(updated))
  }

  const logout = ()=>{
    localStorage.removeItem("isAdmin")
    navigate("/")
  }

  return(

    <div className="container admin-container fade-in">

      <h1 className="admin-title">Admin Dashboard</h1>

      <p className="admin-subtitle">
        Manage your quiz questions efficiently
      </p>

      <div className="admin-actions">

        <button onClick={()=>navigate("/")}>
          Home
        </button>

        <button onClick={()=>navigate("/add-question")}>
          Add Question
        </button>

        <button className="secondary-btn" onClick={logout}>
          Logout
        </button>

      </div>

      <div className="question-count">
        Total Questions: {questions.length}
      </div>

      <div className="question-list">

        {questions.length === 0 && (
          <p className="empty-text">No questions added yet.</p>
        )}

        {questions.map((q,index)=>(
          <div key={index} className="question-card">

            <p className="question-text">
              <strong>Q{index+1}:</strong> {q.question}
            </p>

            <div className="card-actions">
              <button
              onClick={()=>navigate("/edit-question",
              {state:{question:q,index:index}})}
              >
              Edit
              </button>

              <button
              className="delete-btn"
              onClick={()=>deleteQuestion(index)}
              >
              Delete
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default AdminDashboard