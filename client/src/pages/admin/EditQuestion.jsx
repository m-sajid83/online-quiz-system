import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"

function EditQuestion(){

  const navigate = useNavigate()
  const location = useLocation()

  const index = location.state.index
  const questionData = location.state.question

  const [question,setQuestion] = useState(questionData.question)
  const [option1,setOption1] = useState(questionData.options[0])
  const [option2,setOption2] = useState(questionData.options[1])
  const [option3,setOption3] = useState(questionData.options[2])
  const [option4,setOption4] = useState(questionData.options[3])
  const [answer,setAnswer] = useState(questionData.answer)

  const updateQuestion = () => {

    const stored = JSON.parse(localStorage.getItem("questions")) || []

    stored[index] = {
      question:question,
      options:[option1,option2,option3,option4],
      answer:answer
    }

    localStorage.setItem("questions",JSON.stringify(stored))

    alert("Question Updated")

    navigate("/admin")
  }

  return(

    <div className="container">

      <h2>Edit Question</h2>

      <button onClick={()=>navigate("/admin")}>
        Back to Admin Panel
      </button>

      <br/><br/>

      <input value={question} onChange={(e)=>setQuestion(e.target.value)}/>

      <input value={option1} onChange={(e)=>setOption1(e.target.value)}/>

      <input value={option2} onChange={(e)=>setOption2(e.target.value)}/>

      <input value={option3} onChange={(e)=>setOption3(e.target.value)}/>

      <input value={option4} onChange={(e)=>setOption4(e.target.value)}/>

      <br/>

      <select value={answer} onChange={(e)=>setAnswer(e.target.value)}>

        <option value={option1}>{option1}</option>
        <option value={option2}>{option2}</option>
        <option value={option3}>{option3}</option>
        <option value={option4}>{option4}</option>

      </select>

      <br/><br/>

      <button onClick={updateQuestion}>
        Update Question
      </button>

    </div>

  )
}

export default EditQuestion