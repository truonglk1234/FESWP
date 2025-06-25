import { useNavigate, Link } from 'react-router-dom';
import {
  Heart, Phone, Mail, Search, ChevronDown,
  LogOut, Calendar, User, TestTube2, LayoutDashboard, Bell
} from 'lucide-react';
import './Header.css';
import { useAuth } from '../../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import axios from "axios";

const API_NOTIFICATION = "http://localhost:8080/api/notifications/me";

const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notiOpen, setNotiOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNoti, setLoadingNoti] = useState(false);
  const dropdownRef = useRef();
  const notiRef = useRef();

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notiRef.current && !notiRef.current.contains(event.target)) {
        setNotiOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Gọi API lấy danh sách thông báo khi notiOpen bật
  useEffect(() => {
    if (notiOpen && user) {
      const fetchNoti = async () => {
        setLoadingNoti(true);
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(API_NOTIFICATION, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setNotifications(res.data || []);
        } catch (err) {
          setNotifications([]);
        }
        setLoadingNoti(false);
      };
      fetchNoti();
    }
  }, [notiOpen, user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setDropdownOpen(false);
    navigate('/');
  };

  const getManageLink = () => {
    switch (user?.role) {
      case 'Admin': return '/admin';
      case 'Manager': return '/manager';
      case 'Staff': return '/staff';
      case 'Consultant': return '/consultant';
      default: return '/';
    }
  };

  const handleNotificationClick = (noti) => {
    setNotiOpen(false);
    if (noti.link) navigate(noti.link);
  };

  // Đếm số thông báo chưa đọc
  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <header>
      <div className="header-top-bar">
        <div className="header-container header-top-bar-inner">
          <div className="header-top-left">
            <span><Phone size={16} /> Hotline Y tế: 1900-1234</span>
            <span><Mail size={16} /> tuvan@stihealth.vn</span>
          </div>
          <div className="header-top-right">
            <span>Tư vấn sức khỏe giới tính 24/7</span>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="header-container">
          <Link to="/" className="header-logo">
            <div className="header-logo-icon"><Heart className="header-icon" /></div>
            <div>
              <div className="header-logo-text">STI Health</div>
              <div className="header-slogan">Tư vấn sức khỏe giới tính</div>
            </div>
          </Link>

          <div className="header-search-bar">
            <div className="header-search-input-wrapper">
              <Search className="header-search-icon" />
              <input
                type="text"
                placeholder="Tìm kiếm dịch vụ, bác sĩ, bài viết..."
              />
            </div>
          </div>

          <nav className="header-nav">
            <Link to="/">Trang chủ</Link>
            <Link to="/services">Dịch vụ y tế</Link>
            <Link to="/consultants">Tư vấn viên</Link>
            <Link to="/blogs">Tin tức</Link>
          </nav>

          <div className="header-auth-buttons">
            {/* Chuông thông báo */}
            {user && (
              <div className="notification-wrapper" ref={notiRef}>
                <button className="notification-btn" title="Thông báo" onClick={() => setNotiOpen(!notiOpen)}>
                  <Bell size={20} />
                  {unreadCount > 0 &&
                    <span className="noti-badge">{unreadCount}</span>
                  }
                </button>
                {notiOpen && (
                  <div className="notification-dropdown">
                    <p className="dropdown-title">🔔 Thông báo</p>
                    {loadingNoti && <div>Đang tải...</div>}
                    {!loadingNoti && notifications.length === 0 && <div>Không có thông báo</div>}
                    <ul>
                      {notifications.map((noti, idx) => (
                        <li
                          key={noti.id || idx}
                          className={!noti.is_read ? "noti-unread" : ""}
                          onClick={() => handleNotificationClick(noti)}
                          style={{ cursor: noti.link ? "pointer" : "default" }}
                        >
                          <span>{noti.content}</span><br />
                          <small style={{ color: "#888" }}>
                            {new Date(noti.created_at || noti.createdAt).toLocaleString()}
                          </small>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Đăng nhập/Đăng ký hoặc Dropdown user */}
            {!user ? (
              <>
                <button className="header-btn-outline" onClick={() => navigate('/login')}>Đăng nhập</button>
                <button className="header-btn-solid" onClick={() => navigate('/register')}>Đăng ký</button>
              </>
            ) : (
              <div className="header-user-dropdown" ref={dropdownRef}>
                <div className="header-user-info" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <div className="header-avatar">
                    {user.name?.split(' ').map(w => w[0]).join('').toUpperCase()}
                  </div>
                  <span>{user.name}</span>
                  <ChevronDown size={16} />
                </div>
                {dropdownOpen && (
                  <div className="header-dropdown-menu">
                    <Link to="/profile"><User size={16} /> Hồ sơ y tế</Link>
                    <Link to="/appointments"><Calendar size={16} /> Lịch hẹn</Link>
                    <Link to="/tests"><TestTube2 size={16} /> Xét nghiệm</Link>
                    {['Admin', 'Manager', 'Staff', 'Consultant'].includes(user?.role) && (
                      <Link
                        to={getManageLink()}
                        className="manage-button"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <LayoutDashboard size={16} /> Quản lý
                      </Link>
                    )}
                    <button onClick={handleLogout}><LogOut size={16} /> Đăng xuất</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
