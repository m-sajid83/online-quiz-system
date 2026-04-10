import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AdminLogin() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = () => {
    if (username === "project" && password === "8385") {
      localStorage.setItem("isAdmin", "true")
      navigate("/admin")
    } else {
      alert("Invalid Credentials")
    }
  }

  return (
    <div className="container">
      <h2>Admin Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  )
}

export default AdminLogin