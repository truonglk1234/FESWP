import { useNavigate } from 'react-router-dom';
import './Header.css';
import { Heart, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();

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
          <div className="logo">
            <div className="logo-icon"><Heart className="icon" /></div>
            <div>
              <div className="logo-text">STI Health</div>
              <div className="slogan">Tư vấn sức khỏe giới tính</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="nav">
            <Link to="/">Trang chủ</Link>
            <Link to="/services">Dịch vụ y tế</Link>
            <Link to="/doctors">Bác sĩ chuyên khoa</Link>
            <Link to="/knowledge">Kiến thức y khoa</Link>
          </nav>

          {/* Buttons */}
          <div className="auth-buttons">
            <button className="btn-outline" onClick={() => navigate('/login')}>
              Đăng nhập
            </button>
            <button className="btn-solid" onClick={() => navigate('/register')}>
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
