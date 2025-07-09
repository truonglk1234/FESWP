import {
  LayoutDashboard, Users, UserCheck, TestTube2,
  Calendar, MessageSquare, BarChart3, LogOut
} from 'lucide-react';
import './AdminSidebar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AdminSidebar = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const path = location.pathname;

  return (
    <aside className="as-sidebar">
      <div className="as-sidebar-top">
        <div className="as-sidebar-header">
          <Link to="/" className="as-logo-link">
            <div className="as-logo-square"><LayoutDashboard className="as-icon-white" /></div>
            <div className="as-logo-text-group">
              <h1 className="as-sidebar-title">Admin Center</h1>
              <p className="as-sidebar-subtitle">Hệ thống quản lý</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="as-sidebar-middle">
        <ul>
          <li>
            <Link
              to="/admin"
              className={`as-nav-link ${path === '/admin' ? 'active' : ''}`}
            >
              <LayoutDashboard /> Tổng quan
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={`as-nav-link ${path.startsWith('/admin/users') ? 'active' : ''}`}
            >
              <Users /> Quản lý người dùng
            </Link>
          </li>
          <li>
            <Link
              to="/admin/consultants"
              className={`as-nav-link ${path.startsWith('/admin/consultants') ? 'active' : ''}`}
            >
              <UserCheck /> Quản lý tư vấn viên
            </Link>
          </li>
          <li>
            <Link
              to="/admin/tests"
              className={`as-nav-link ${path.startsWith('/admin/tests') ? 'active' : ''}`}
            >
              <TestTube2 /> Dịch vụ xét nghiệm
            </Link>
          </li>
          <li>
            <Link
              to="/admin/appointments"
              className={`as-nav-link ${path.startsWith('/admin/appointments') ? 'active' : ''}`}
            >
              <Calendar /> Lịch hẹn tư vấn
            </Link>
          </li>
          <li>
            <Link
              to="/admin/feedbacks"
              className={`as-nav-link ${path.startsWith('/admin/feedbacks') ? 'active' : ''}`}
            >
              <MessageSquare /> Đánh giá & Phản hồi
            </Link>
          </li>
          <li>
            <Link
              to="/admin/reports"
              className={`as-nav-link ${path.startsWith('/admin/reports') ? 'active' : ''}`}
            >
              <BarChart3 /> Báo cáo & Thống kê
            </Link>
          </li>
        </ul>
      </div>

      <div className="as-sidebar-footer">
        <button className="as-nav-link as-logout-btn" onClick={handleLogout}>
          <LogOut /> Đăng xuất
        </button>
      </div>
    </aside>
  );
};
