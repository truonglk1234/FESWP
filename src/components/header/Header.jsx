import { useNavigate, Link } from 'react-router-dom';
import {
  Heart, Phone, Mail, Search, ChevronDown,
  LogOut, Calendar, User, TestTube2
} from 'lucide-react';
import './Header.css';
import { useAuth } from '../../context/AuthContext';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    setUser(null);
    setDropdownOpen(false);
    navigate('/');
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header>
      {/* Top bar */}
      <div className="top-bar">
        <div className="header-container top-bar-inner">
          <div className="top-left">
            <span><Phone size={16} /> Hotline Y tế: 1900-1234</span>
            <span><Mail size={16} /> tuvan@stihealth.vn</span>
          </div>
          <div className="top-right">
            <span>Tư vấn sức khỏe giới tính 24/7</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="main-header">
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon"><Heart className="icon" /></div>
            <div>
              <div className="logo-text">STI Health</div>
              <div className="slogan">Tư vấn sức khỏe giới tính</div>
            </div>
          </Link>

          {/* Search */}
          <div className="search-bar">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Tìm kiếm dịch vụ, bác sĩ, bài viết..."
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="nav">
            <Link to="/">Trang chủ</Link>
            <Link to="/services">Dịch vụ y tế</Link>
            <Link to="/consultants">Tư vấn viên</Link>
            <Link to="/knowledge">Tin tức</Link>
          </nav>

          {/* Auth section */}
          <div className="auth-buttons">
            {!user ? (
              <>
                <button className="btn-outline" onClick={() => navigate('/login')}>Đăng nhập</button>
                <button className="btn-solid" onClick={() => navigate('/register')}>Đăng ký</button>
              </>
            ) : (
              <div className="user-dropdown" ref={dropdownRef}>
                <div className="user-info" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <div className="avatar-user">
                    {user.name?.split(' ').map(w => w[0]).join('').toUpperCase()}
                  </div>
                  <span>{user.name}</span>
                  <ChevronDown size={16} />
                </div>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile"><User size={16} /> Hồ sơ y tế</Link>
                    <Link to="/appointments"><Calendar size={16} /> Lịch hẹn</Link>
                    <Link to="/tests"><TestTube2 size={16} /> Xét nghiệm</Link>
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
