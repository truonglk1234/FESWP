import {
  BarChart3, Users, UserCheck, Heart, Stethoscope, FileText,
  MessageSquare, HelpCircle, Settings, LogOut
} from 'lucide-react';
import './AdminSidebar.css';
import { Link } from 'react-router-dom';

export const AdminSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-header">
          <Link to="/" className="logo-link">
            <div className="logo-square">
              <Heart className="icon-white" />
            </div>
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
          <li className="active"><BarChart3 /> Dashboard</li>
          <li><Users /> Quản lý người dùng</li>
          <li><UserCheck /> Quản lý tư vấn viên</li>
          <li><Stethoscope /> Quản lý dịch vụ</li>
          <li><FileText /> Quản lý blog</li>
          <li><MessageSquare /> Quản lý phản hồi</li>
          <li><HelpCircle /> Quản lý Q&A</li>
        </ul>
      </div>

      <div className="sidebar-footer">
        <div><Settings /> Cài đặt</div>
        <div><LogOut /> Đăng xuất</div>
      </div>
    </aside>
  );
};
