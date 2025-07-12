import {
  BarChart3, Users, UserCheck, TestTube2,
  Calendar, MessageSquare, LogOut, LayoutDashboard
} from 'lucide-react';
import './AdminSidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AdminSidebar = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <aside className="as-sidebar">
      <div className="as-sidebar-top">
        <div className="as-sidebar-header">
          <Link to="/" className="as-logo-link">
            <div className="as-logo-square"><LayoutDashboard className="as-icon-white" /></div>
            <div className="as-logo-text-group">
              <h1 className="as-sidebar-title">STI Admin</h1>
              <p className="as-sidebar-subtitle">Hệ thống quản lý</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="as-sidebar-middle">
        <p className="as-nav-label">Quản lý hệ thống</p>
        <ul>
          <li><Link to="/admin" className="as-nav-link"><BarChart3 /> Dashboard</Link></li>
          <li><Link to="/admin/users" className="as-nav-link"><Users /> Quản lý manager</Link></li>
          <li><Link to="/admin/consultants" className="as-nav-link"><UserCheck /> Quản lý tư vấn viên</Link></li>
          <li><Link to="/admin/tests" className="as-nav-link"><TestTube2 /> Dịch vụ xét nghiệm</Link></li>
          <li><Link to="/admin/appointments" className="as-nav-link"><Calendar /> Lịch hẹn tư vấn</Link></li>
          <li><Link to="/admin/feedbacks" className="as-nav-link"><MessageSquare /> Đánh giá & Phản hồi</Link></li>
          <li><Link to="/admin/reports" className="as-nav-link"><BarChart3 /> Báo cáo & Thống kê</Link></li>
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
