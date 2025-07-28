import { NavLink, Link, useNavigate } from 'react-router-dom';
import { User, Lock, Heart, Calendar } from 'lucide-react';
import './ProfileSidebar.css';
import { useAuth } from '../../context/AuthContext';

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  if (!user) {
    navigate('/');
    return null;
  }

  const isConsultant = user?.role?.toLowerCase() === 'consultant';

  return (
    <aside className="profile-sidebar">
      {/* Logo */}
      <Link to="/" className="profile-logo">
        <div className="logo-icon">
          <Heart size={20} className="icon-white" />
        </div>
        <div className="logo-text-group">
          <h2 className="sidebar-title">STI Health</h2>
          <p className="sidebar-subtitle">Tư vấn sức khỏe giới tính</p>
        </div>
      </Link>

      {/* User Info */}
      <div className="profile-sidebar-header">
        <div className="profile-avatar">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="Avatar"
              className="profile-avatar-img"
            />
          ) : (
            <div className="avatar-initials">{getInitials(user?.name)}</div>
          )}
        </div>
        <h3 className="profile-name">{user?.name || 'Người dùng'}</h3>
        <p className="profile-email">{user?.email || 'Chưa có email'}</p>
        <p className="profile-role">Vai trò: {user?.role}</p>
      </div>

      {/* Menu */}
      <nav className="profile-menu">
        <ul>
          <li>
            <NavLink to="info" className={({ isActive }) => (isActive ? 'active' : '')}>
              <User size={18} /> Thông tin cá nhân
            </NavLink>
          </li>
          <li>
            <NavLink to="account" className={({ isActive }) => (isActive ? 'active' : '')}>
              <Lock size={18} /> Thông tin tài khoản
            </NavLink>
          </li>
          <li>
            <NavLink to="health" className={({ isActive }) => (isActive ? 'active' : '')}>
              <Heart size={18} /> Sức khỏe sinh sản
            </NavLink>
          </li>

          {isConsultant && (
            <>
              <li>
                <NavLink
                  to="professional-info"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <User size={18} /> Thông tin chuyên môn
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="schedule-setup"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <Calendar size={18} /> Lịch hẹn
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Back button */}
      <div className="profile-back-btn">
        <button onClick={() => navigate('/')}>Quay lại</button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
