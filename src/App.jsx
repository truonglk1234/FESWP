import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ServicePage from './pages/ServicePage';
import ConsultantPage from './pages/ConsultantPage';
import { AuthProvider } from './context/AuthContext';

// Admin Layout & Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/dashboard/AdminDashboard';
import AdminUserManage from './components/admin/UserManagement/AdminUserManage';
// 👉 import thêm sau khi tạo file
// import AdminConsultantManage from './components/admin/Consultant/AdminConsultantManage';
// import AdminServiceManage from './components/admin/Service/AdminServiceManage';
// ...

const App = () => {
  useEffect(() => {
    const testUser = { name: 'Nguyễn Văn An', email: 'user@example.com' };
    localStorage.setItem('user', JSON.stringify(testUser));
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/consultants" element={<ConsultantPage />} />

          {/* Admin layout + nested pages */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} /> {/* /admin */}
            <Route path="users" element={<AdminUserManage />} /> {/* /admin/users */}
            {/* Các trang admin khác thêm sau tại đây */}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
