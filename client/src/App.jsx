import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Quiz from "./pages/Quiz"
import Result from "./pages/Result"

import AdminDashboard from "./pages/admin/AdminDashboard"
import AddQuestion from "./pages/admin/AddQuestion"
import AdminLogin from "./pages/admin/AdminLogin"
import EditQuestion from "./pages/admin/EditQuestion"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/result" element={<Result />} />

      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/add-question" element={<AddQuestion />} />
      <Route path="/edit-question" element={<EditQuestion/>}/>
    </Routes>
  )
}

export default App