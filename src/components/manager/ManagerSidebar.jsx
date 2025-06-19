import {
  BarChart3, Users, UserCheck, Heart, Stethoscope,
  FileText, MessageSquare, HelpCircle, LogOut
} from 'lucide-react';
import './ManagerSidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // điều chỉnh path nếu cần

export const ManagerSidebar = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);                          // xóa user khỏi context
    localStorage.removeItem('user');       // xóa khỏi localStorage
    navigate('/');                         // quay về trang chủ
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-header">
          <Link to="/" className="logo-link">
            <div className="logo-square"><Heart className="icon-white" /></div>
            <div className="logo-text-group">
              <h1 className="sidebar-title">STI Health</h1>
              <p className="sidebar-subtitle">Tư vấn sức khỏe giới tính</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="sidebar-middle">
        <p className="nav-label">Quản lý hệ thống</p>
        <ul>
          <li><Link to="/manager" className="nav-link"><BarChart3 /> Dashboard</Link></li>
          <li><Link to="/manager/users" className="nav-link"><Users /> Quản lý người dùng</Link></li>
          <li><Link to="/manager/consultants" className="nav-link"><UserCheck /> Quản lý tư vấn viên</Link></li>
          <li><Link to="/manager/services" className="nav-link"><Stethoscope /> Quản lý dịch vụ</Link></li>
          <li><Link to="/manager/blogs" className="nav-link"><FileText /> Quản lý blog</Link></li>
          <li><Link to="/manager/feedbacks" className="nav-link"><MessageSquare /> Quản lý phản hồi</Link></li>
          <li><Link to="/manager/qna" className="nav-link"><HelpCircle /> Quản lý Q&A</Link></li>
        </ul>
      </div>

      <div className="sidebar-footer">
        <button className="nav-link logout-btn" onClick={handleLogout}>
          <LogOut /> Đăng xuất
        </button>
      </div>
    </aside>
  );
};
