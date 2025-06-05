import React from "react";
import "./Register.css";

const Register = () => {
  return (
    <div className="register-container">
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
          <a href="/Login"><button className="btn-outline">Đăng nhập</button></a>
          <button className="btn-primary">Đăng ký</button>
        </div>
      </div>

      {/* Form đăng ký */}
      <div className="form-wrapper">
        <div className="register-box">
          <h2>Đăng ký</h2>
          <p>Tạo tài khoản để sử dụng dịch vụ</p>

          <input type="text" placeholder="Họ và tên" />
          <input type="tel" placeholder="Số điện thoại" />
          <input type="email" placeholder="Email (nếu có)" />
          <input type="password" placeholder="Mật khẩu" />
          <input type="password" placeholder="Xác nhận mật khẩu" />

          <button className="btn-primary full-width">Đăng ký</button>

          <div className="or-divider">Hoặc</div>

          <button className="google-register-btn">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
            Đăng ký bằng Google
          </button>

          <p className="login-text">
            Đã có tài khoản? <a href="/Login">Đăng nhập</a>
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

export default Register;
