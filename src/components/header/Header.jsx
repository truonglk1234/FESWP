import './Header.css';
import { Heart, Phone, Mail } from 'lucide-react';

const Header = () => {
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
            <a href="#">Trang chủ</a>
            <a href="#">Dịch vụ y tế</a>
            <a href="#">Bác sĩ chuyên khoa</a>
            <a href="#">Kiến thức y khoa</a>
          </nav>

          {/* Buttons */}
          <div className="auth-buttons">
            <button className="btn-outline">Đăng nhập</button>
            <button className="btn-solid">Đăng ký</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
