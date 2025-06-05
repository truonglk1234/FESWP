import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <HomePage />
      <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Có thể thêm route trang chủ nếu cần */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
    </>
  )

}

export default App;

