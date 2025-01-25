import "./App.css";
import Register from "./pages/Register.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Forgot from "./pages/Forgot.jsx";
import TaskManagement from "./pages/TaskManagement.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<TaskManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
