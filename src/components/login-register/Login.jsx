import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, HeartHandshake, ShieldCheck, Award } from 'lucide-react';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-wrapper">
      {/* Left Info */}
      <div className="login-info">
        <h1>
          Tư vấn sức khỏe
          <span className="highlight"> giới tính </span> <br />
          chuyên nghiệp
        </h1>
        <p>
          Tham gia cùng hàng nghìn người dùng tin tưởng STI Health cho việc chăm sóc sức khỏe giới tính.
        </p>

        <div className="stats">
          <div>
            <div className="stat-value">50K+</div>
            <div className="stat-label">Người dùng tin tưởng</div>
          </div>
          <div>
            <div className="stat-value">99%</div>
            <div className="stat-label">Độ hài lòng</div>
          </div>
        </div>

        <div className="features">
          <div className="feature">
            <div className="feature-icon"><HeartHandshake size={20} /></div>
            <div>
              <strong>Tư vấn chuyên khoa</strong>
              <div>Đội ngũ bác sĩ giàu kinh nghiệm</div>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon"><ShieldCheck size={20} /></div>
            <div>
              <strong>Bảo mật tuyệt đối</strong>
              <div>Thông tin được mã hóa end-to-end</div>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon"><Award size={20} /></div>
            <div>
              <strong>Chất lượng hàng đầu</strong>
              <div>Được chứng nhận bởi Bộ Y tế</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="login-form">
        <h2>Đăng nhập</h2>
        <p>Chào mừng trở lại với STI Health</p>

        <form>
          <div className="input-icon">
            <Mail className="icon-left" />
            <input type="email" placeholder="Nhập địa chỉ Gmail" />
          </div>

          <div className="input-icon">
            <Lock className="icon-left" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Nhập mật khẩu của bạn"
            />
            <span className="icon-right" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Ghi nhớ đăng nhập
            </label>
            <a href="#">Quên mật khẩu?</a>
          </div>

          <button type="submit" className="btn-submit">
            Đăng nhập →
          </button>

          <div className="divider">
            <span>hoặc</span>
          </div>

          <div className="register">
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
