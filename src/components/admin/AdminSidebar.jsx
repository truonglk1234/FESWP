import { BarChart3, Users, UserCheck, Heart, Stethoscope, FileText, MessageSquare, HelpCircle, Settings, LogOut } from 'lucide-react';
import './AdminSidebar.css';
import { Link } from 'react-router-dom';

export const AdminSidebar = () => {
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
          <li><Link to="/admin" className="nav-link"><BarChart3 /> Dashboard</Link></li>
          <li><Link to="/admin/users" className="nav-link"><Users /> Quản lý người dùng</Link></li>
          <li><Link to="/admin/consultants" className="nav-link"><UserCheck /> Quản lý tư vấn viên</Link></li>
          <li><Link to="/admin/services" className="nav-link"><Stethoscope /> Quản lý dịch vụ</Link></li>
          <li><Link to="/admin/blogs" className="nav-link"><FileText /> Quản lý blog</Link></li>
          <li><Link to="/admin/feedbacks" className="nav-link"><MessageSquare /> Quản lý phản hồi</Link></li>
          <li><Link to="/admin/qna" className="nav-link"><HelpCircle /> Quản lý Q&A</Link></li>
        </ul>
      </div>

      <div className="sidebar-footer">
        <Link to="/admin/settings" className="nav-link"><Settings /> Cài đặt</Link>
        <Link to="/logout" className="nav-link"><LogOut /> Đăng xuất</Link>
      </div>
    </aside>
  );
};
