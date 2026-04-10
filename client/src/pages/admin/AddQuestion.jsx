import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AddQuestion() {

  const navigate = useNavigate()

  const [question,setQuestion] = useState("")
  const [option1,setOption1] = useState("")
  const [option2,setOption2] = useState("")
  const [option3,setOption3] = useState("")
  const [option4,setOption4] = useState("")
  const [answer,setAnswer] = useState("")

  const handleSubmit = () => {

    if(!question || !option1 || !option2 || !option3 || !option4 || !answer){
      alert("Fill all fields")
      return
    }

    const newQuestion = {
      question: question,
      options: [option1,option2,option3,option4],
      answer: answer
    }

    const stored = JSON.parse(localStorage.getItem("questions")) || []

    stored.push(newQuestion)

    localStorage.setItem("questions",JSON.stringify(stored))

    alert("Question Added")

    setQuestion("")
    setOption1("")
    setOption2("")
    setOption3("")
    setOption4("")
    setAnswer("")
  }

  return(
    <div className="container">

      <h2>Add Question</h2>

      <button onClick={()=>navigate("/admin")}>
        Back to Admin Panel
      </button>

      <br/><br/>

      <input
      placeholder="Enter Question"
      value={question}
      onChange={(e)=>setQuestion(e.target.value)}
      />

      <input
      placeholder="Option 1"
      value={option1}
      onChange={(e)=>setOption1(e.target.value)}
      />

      <input
      placeholder="Option 2"
      value={option2}
      onChange={(e)=>setOption2(e.target.value)}
      />

      <input
      placeholder="Option 3"
      value={option3}
      onChange={(e)=>setOption3(e.target.value)}
      />

      <input
      placeholder="Option 4"
      value={option4}
      onChange={(e)=>setOption4(e.target.value)}
      />

      <br/>

      <select value={answer} onChange={(e)=>setAnswer(e.target.value)}>

        <option value="">Select Correct Answer</option>
        <option value={option1}>{option1 || "Option 1"}</option>
        <option value={option2}>{option2 || "Option 2"}</option>
        <option value={option3}>{option3 || "Option 3"}</option>
        <option value={option4}>{option4 || "Option 4"}</option>

      </select>

      <br/><br/>

      <button onClick={handleSubmit}>
        Add Question
      </button>

    </div>
  )
}

export default AddQuestion