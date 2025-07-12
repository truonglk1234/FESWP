import {
  Home, Calendar, BookOpen,
  LogOut, UserPlus
} from 'lucide-react';
import './StaffSidebar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const StaffSidebar = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate('/');
  };

  return (
    <aside className="ss-sidebar">
      <div className="ss-sidebar-top">
        <div className="ss-sidebar-header">
          <NavLink to="/" className="ss-logo-link">
            <div className="ss-logo-square">
              <UserPlus className="ss-icon-white" />
            </div>
            <div className="ss-logo-text-group">
              <h1 className="ss-sidebar-title">STI Health</h1>
              <p className="ss-sidebar-subtitle">Nhân viên y tế</p>
            </div>
          </NavLink>
        </div>
      </div>

      <div className="ss-sidebar-middle">
        <p className="ss-nav-label">Chức năng</p>
        <ul>
          <li>
            <NavLink
              to="/staff"
              end
              className={({ isActive }) =>
                `ss-nav-link${isActive ? ' active' : ''}`
              }
            >
              <Home /> Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/staff/schedule"
              className={({ isActive }) =>
                `ss-nav-link${isActive ? ' active' : ''}`
              }
            >
              <Calendar /> Lịch xét nghiệm
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/staff/blogs"
              className={({ isActive }) =>
                `ss-nav-link${isActive ? ' active' : ''}`
              }
            >
              <BookOpen /> Blog Y Tế
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="ss-sidebar-footer">
        <button className="ss-nav-link ss-logout-btn" onClick={handleLogout}>
          <LogOut /> Đăng xuất
        </button>
      </div>
    </aside>
  );
};
