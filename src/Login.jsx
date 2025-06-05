import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      {/* Thanh trên cùng */}
      <div className="top-bar">
        <span>Hotline: 1900-1234</span>
        <span>Email: support@stihealth.vn</span>
      </div>

      {/* Navbar */}
      <div className="nav-bar">
        <div className="logo">STI Health</div>
        <div className="nav-center">
          <nav className="nav-links">
            <a href="#">Trang chủ</a>
            <a href="#">Dịch vụ</a>
            <a href="#">Tư vấn viên</a>
            <a href="#">Blog</a>
          </nav>
        </div>
        <div className="auth-buttons">
          <button className="btn-outline">Đăng nhập</button>
          <button className="btn-primary">Đăng ký</button>
        </div>
      </div>

      {/* Form đăng nhập */}
      <div className="form-wrapper">
        <div className="login-box">
          <h2>Đăng nhập</h2>
          <p>Đăng nhập để tiếp tục sử dụng dịch vụ</p>

          <input type="tel" placeholder="Nhập số điện thoại" />
          <input type="password" placeholder="Nhập mật khẩu" />

          <div className="forgot-password">
            <a href="#">Quên mật khẩu?</a>
          </div>

          <button className="btn-primary full-width">Đăng nhập</button>

          <div className="or-divider">Hoặc</div>

          <button className="google-login-btn">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
            Đăng nhập bằng Google
          </button>

          <p className="register-text">
            Chưa có tài khoản? <a href="#">Đăng ký ngay</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="footer-section">
          <h4>STI Health</h4>
          <p>
            Hệ thống tư vấn sức khỏe sinh sản hàng đầu Việt Nam với đội ngũ chuyên gia y tế giàu kinh nghiệm.
          </p>
        </div>
        <div className="footer-section">
          <h4>Liên kết nhanh</h4>
          <p>Dịch vụ xét nghiệm</p>
          <p>Tư vấn viên</p>
        </div>
        <div className="footer-section">
          <h4>Dịch vụ</h4>
          <p>Xét nghiệm STI</p>
          <p>Tư vấn trực tuyến</p>
        </div>
        <div className="footer-section">
          <h4>Thông tin liên hệ</h4>
          <p>📞 1900-1234 (24/7)</p>
          <p>📧 support@stihealth.vn</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
