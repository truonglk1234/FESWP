import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ServicePage from './pages/ServicePage';
import ConsultantPage from './pages/ConsultantPage';
import { AuthProvider } from './context/AuthContext';

// Profile layout & pages
import Profile from './components/profile/Profile';
import PersonalInfo from './components/profile/pages/PersonalInfo';
import AccountInfo from './components/profile/pages/AccountInfo';
import NotificationSettings from './components/profile/pages/NotificationSettings';
import ReproductiveHealth from './components/profile/pages/ReproductiveHealth';
import ServiceHistory from './components/profile/pages/ServiceHistory';

// Admin Layout & Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/dashboard/AdminDashboard';
import AdminUserManage from './components/admin/UserManagement/AdminUserManage';
import AdminCM from './components/admin/ConsultantManagement/AdminCM';
import AdminSM from './components/admin/ServiceManagement/AdminSM';
import AdminBM from './components/admin/BlogsManagement/AdminBM';
import AdminFM from './components/admin/FeedbackManagement/AdminFM';

const App = () => {

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

          {/* Profile layout + nested tabs */}
          <Route path="/profile" element={<Profile />}>
            <Route index element={<PersonalInfo />} /> {/* /profile */}
            <Route path="info" element={<PersonalInfo />} /> {/* /profile/info */}
            <Route path="account" element={<AccountInfo />} />
            <Route path="notifications" element={<NotificationSettings />} />
            <Route path="health" element={<ReproductiveHealth />} />
              <Route path="history" element={<ServiceHistory />} />
          </Route>

          {/* Admin layout + nested pages */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUserManage />} />
            <Route path="consultants" element={<AdminCM />} />
            <Route path="services" element={<AdminSM />} />
            <Route path="blogs" element={<AdminBM />} />
            <Route path="feedbacks" element={<AdminFM />} />
            {/* Các trang admin khác thêm sau tại đây */}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
