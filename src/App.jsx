import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react'; // ⬅️ thêm dòng này
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import ServicePage from './pages/ServicePage';
import ConsultantPage from './pages/ConsultantPage';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  // ✅ Thêm đoạn test user ở đây
  useEffect(() => {
    const testUser = { name: 'Nguyễn Văn An', email: 'user@example.com' };
    localStorage.setItem('user', JSON.stringify(testUser));
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/consultants" element={<ConsultantPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
