import { NavLink, Link, useNavigate } from 'react-router-dom';
import { User, Lock, Bell, Heart, RotateCcw } from 'lucide-react';
import './ProfileSidebar.css';

const ProfileSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="profile-sidebar">
      {/* Logo về trang chủ */}
      <Link to="/" className="profile-logo">
        <div className="logo-icon">
          <Heart size={20} className="icon-white" />
        </div>
        <div className="logo-text-group">
          <h2 className="sidebar-title">STI Health</h2>
          <p className="sidebar-subtitle">Tư vấn sức khỏe giới tính</p>
        </div>
      </Link>

      <div className="profile-sidebar-header">
        <div className="profile-avatar">
          <img src="/default-avatar.png" alt="Avatar" />
          <div className="camera-icon">📷</div>
        </div>
        <h3 className="profile-name">Nguyễn Thị Lan</h3>
        <p className="profile-email">lan.nguyen@example.com</p>
        <span className="profile-status">● Tài khoản hoạt động</span>
      </div>

      <nav className="profile-menu">
        <ul>
          <li>
            <NavLink to="info" className={({ isActive }) => isActive ? 'active' : ''}>
              <User size={18} /> Thông tin cá nhân
            </NavLink>
          </li>
          <li>
            <NavLink to="account" className={({ isActive }) => isActive ? 'active' : ''}>
              <Lock size={18} /> Thông tin tài khoản
            </NavLink>
          </li>
          <li>
            <NavLink to="notifications" className={({ isActive }) => isActive ? 'active' : ''}>
              <Bell size={18} /> Thông báo
            </NavLink>
          </li>
          <li>
            <NavLink to="health" className={({ isActive }) => isActive ? 'active' : ''}>
              <Heart size={18} /> Sức khỏe sinh sản
            </NavLink>
          </li>
          <li>
            <NavLink to="history" className={({ isActive }) => isActive ? 'active' : ''}>
              <RotateCcw size={18} /> Lịch sử dịch vụ
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Nút Quay lại về trang chủ */}
      <div className="profile-back-btn">
        <button onClick={() => navigate('/')}>
          Quay lại
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
