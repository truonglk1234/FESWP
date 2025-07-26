import { useNavigate, Link } from 'react-router-dom';
import {
  Heart, Phone, Mail, ChevronDown,
  LogOut, Calendar, User, TestTube2, LayoutDashboard, Bell
} from 'lucide-react';
import './Header.css';
import { useAuth } from '../../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import axios from "axios";

const API_NOTIFICATION = "http://localhost:8080/api/notifications/me";
const API_MARK_READ = "http://localhost:8080/api/notifications"; // + /{id}/read

const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notiOpen, setNotiOpen] = useState(false);
  const [notiOpenedOnce, setNotiOpenedOnce] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNoti, setLoadingNoti] = useState(false);
  const dropdownRef = useRef();
  const notiRef = useRef();

  // ✅ Axios instance with interceptor
  const axiosInstance = axios.create();
  axiosInstance.interceptors.request.use((config) => {
    const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  axiosInstance.interceptors.response.use(
    res => res,
    err => {
      if (err.response?.status === 401) {
        alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
      }
      return Promise.reject(err);
    }
  );

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

  // Load thông báo khi mở popup
  useEffect(() => {
    if (notiOpen && user) {
      setNotiOpenedOnce(true);
      const fetchNoti = async () => {
        setLoadingNoti(true);
        try {
          const res = await axiosInstance.get(API_NOTIFICATION);
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
    navigate('/');
  };

  // Cập nhật bỏ Consultant ra khỏi danh sách quản lý
  const getManageLink = () => {
    switch (user?.role) {
      case 'Admin': return '/admin';
      case 'Manager': return '/manager';
      case 'Staff': return '/staff';
      default: return '/';
    }
  };

  const markNotificationAsRead = async (id) => {
    try {
      await axiosInstance.patch(`${API_MARK_READ}/${id}/read`);
      setNotifications((prev) =>
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      );
    } catch (err) {
      console.error("❌ Mark as read failed:", err);
    }
  };

  const handleNotificationClick = async (noti) => {
    setNotiOpen(false);
    if (!noti.is_read) await markNotificationAsRead(noti.id);
    if (noti.link) navigate(noti.link);
  };

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

          <nav className="header-nav">
            <Link to="/">Trang chủ</Link>
            <Link to="/services/testing">Dịch vụ xét nghiệm</Link>
            <Link to="/services/consulting">Dịch vụ tư vấn</Link>
            <Link to="/consultants">Tư vấn viên</Link>
            <Link to="/blogs">Tin tức</Link>
          </nav>

          <div className="header-auth-buttons">
            {user && (
              <div className="notification-wrapper" ref={notiRef}>
                <button
                  className={`notification-btn ${unreadCount > 0 && !notiOpenedOnce ? 'has-unread' : ''}`}
                  title="Thông báo"
                  onClick={() => setNotiOpen(!notiOpen)}
                >
                  <Bell size={20} />
                </button>
                {notiOpen && (
                  <div className="notification-dropdown">
                    <p className="dropdown-title">Thông báo</p>
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

            {!user ? (
              <>
                <button className="header-btn-outline" onClick={() => navigate('/login')}>Đăng nhập</button>
                <button className="header-btn-solid" onClick={() => navigate('/register')}>Đăng ký</button>
              </>
            ) : (
              <div className="header-user-dropdown" ref={dropdownRef}>
                <div className="header-user-info" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <div className="header-avatar">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt="Avatar" className="avatar-img" />
                    ) : (
                      user.name?.split(' ').map(w => w[0]).join('').toUpperCase()
                    )}
                  </div>
                  <span>{user.name}</span>
                  <ChevronDown size={16} />
                </div>
                {dropdownOpen && (
                  <div className="header-dropdown-menu">
                    <Link to="/profile"><User size={16} /> Hồ sơ y tế</Link>

                    {!['Admin', 'Manager', 'Staff', 'Consultant'].includes(user?.role) && (
                      <>
                        <Link to="/consult-schedule"><Calendar size={16} /> Lịch tư vấn</Link>
                        <Link to="/tests"><TestTube2 size={16} /> Lịch xét nghiệm</Link>
                      </>
                    )}

                    {/* ✅ Chỉ hiện nút quản lý cho Admin, Manager, Staff */}
                    {['Admin', 'Manager', 'Staff'].includes(user?.role) && (
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
