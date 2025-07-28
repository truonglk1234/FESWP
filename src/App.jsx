import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// --------- PUBLIC PAGES ---------
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ServiceTestingPage from './pages/ServiceTestingPage';
import ConsultantServicePage from './pages/ConsultantServicePage';
import ConsultantPage from './pages/ConsultantPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPublic from './components/blogs/BlogDetailPublic';
import TestSchedulePage from './pages/TestSchedulePage';
import ConsultSchedulePage from './pages/ConsultSchedulePage';
import TermsPage from './pages/TermsPage';
import ConsultantProfileWrapper from './pages/ConsultantProfileWrapper';

// --------- PROFILE ---------
import Profile from './components/profile/Profile';
import PersonalInfo from './components/profile/pages/PersonalInfo';
import AccountInfo from './components/profile/pages/AccountInfo';
import ReproductiveHealth from './components/profile/pages/ReproductiveHealth';
import ScheduleSetupPage from './components/profile/pages/ScheduleSetupPage';
import ProfessionalInfo from './components/profile/pages/ProfessionalInfo';   // ✅ import mới

// --------- MANAGER ---------
import ManagerLayout from './components/manager/ManagerLayout';
import UserManagementPage from './components/manager/UserManagement/UserManagementPage';
import ConsultantManage from './components/manager/ConsultantManagement/ConsultantManage';
import ManagerStaffManage from './components/manager/StaffManagement/ManagerStaffManage';
import TestingServiceManage from './components/manager/ServiceManagement/TestingServiceManage';
import ConsultingServiceManage from './components/manager/ServiceManagement/ConsultingServiceManage';
import ManagerBlogManage from './components/manager/BlogsManagement/ManagerBlogManage';
import ManagerExamManage from './components/manager/ExaminationManagement/ManagerExamManage';

// --------- STAFF ---------
import StaffLayout from './components/staff/StaffLayout';
import TestBookingTable from './components/staff/TestManagement/TestBookingTable';
import MedicalBlog from './components/staff/Blog/MedicalBlog';
import StaffBlogCreate from './components/staff/Blog/StaffBlogCreate';
import StaffBlogDetail from './components/staff/Blog/StaffBlogDetail';
import StaffBlogEdit from './components/staff/Blog/StaffBlogEdit';

// --------- ADMIN ---------
import AdminLayout from './components/admin/AdminLayout';
import Overview from './components/admin/Overview/Overview';
import UM from './components/admin/UserManagement/UM';
import Report from './components/admin/Reports/Report';
import ManagerFM from './components/admin/FeedbackManagement/ManagerFM';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>

          {/* --------- PUBLIC --------- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/services/testing" element={<ServiceTestingPage />} />
          <Route path="/services/consulting" element={<ConsultantServicePage />} />
          <Route path="/consultants" element={<ConsultantPage />} />
          <Route path="/consultants/:id" element={<ConsultantProfileWrapper />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:id" element={<BlogDetailPublic />} />
          <Route path="/tests" element={<TestSchedulePage />} />
          <Route path="/consult-schedule" element={<ConsultSchedulePage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* --------- PROFILE --------- */}
          <Route path="/profile" element={<Profile />}>
            <Route index element={<PersonalInfo />} />
            <Route path="info" element={<PersonalInfo />} />
            <Route path="account" element={<AccountInfo />} />
            <Route path="health" element={<ReproductiveHealth />} />
            <Route path="professional-info" element={<ProfessionalInfo />} /> {/* ✅ route mới */}
            <Route path="schedule-setup" element={<ScheduleSetupPage />} />
          </Route>

          {/* --------- STAFF --------- */}
          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<Navigate to="test-bookings" replace />} />
            <Route path="test-bookings" element={<TestBookingTable />} />
            <Route path="blogs" element={<MedicalBlog />} />
            <Route path="blogs/create" element={<StaffBlogCreate />} />
            <Route path="blogs/:id" element={<StaffBlogDetail />} />
            <Route path="blogs/edit/:id" element={<StaffBlogEdit />} />
          </Route>

          {/* --------- ADMIN --------- */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Overview />} />
            <Route path="users" element={<UM />} />
            <Route path="reports" element={<Report />} />
            <Route path="feedbacks" element={<ManagerFM />} />
          </Route>

          {/* --------- MANAGER --------- */}
          <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<Navigate to="users" replace />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="consultants" element={<ConsultantManage />} />
            <Route path="staffs" element={<ManagerStaffManage />} />
            <Route path="services" element={<TestingServiceManage />} />
            <Route path="consulting-services" element={<ConsultingServiceManage />} />
            <Route path="blogs" element={<ManagerBlogManage />} />
            <Route path="examinations" element={<ManagerExamManage />} />
          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
