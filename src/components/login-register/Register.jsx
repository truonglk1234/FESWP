import React, { useState } from 'react';
import './Register.css';
import { User, Mail, Phone, Lock, Eye, EyeOff, HeartHandshake, ShieldCheck, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="login-wrapper">
      {/* Phần bên trái giống Login */}
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

      {/* Phần bên phải - Form đăng ký */}
      <div className="register-form">
        <h2>Đăng ký</h2>
        <p>Tạo tài khoản mới để sử dụng dịch vụ</p>

        <form>
          <div className="input-icon">
            <User className="icon-left" />
            <input type="text" placeholder="Họ và tên" />
          </div>

          <div className="input-icon">
            <Mail className="icon-left" />
            <input type="email" placeholder="Email" />
          </div>

          <div className="input-icon">
            <Phone className="icon-left" />
            <input type="tel" placeholder="Số điện thoại" />
          </div>

          <div className="two-columns">
            <div className="form-group">
                <label htmlFor="gender">Giới tính</label>
                <select id="gender" name="gender" className="custom-select">
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="dob">Ngày sinh</label>
                <input type="date" id="dob" name="dob" className="custom-input" />
            </div>
          </div>

          <div className="input-icon">
            <Lock className="icon-left" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mật khẩu"
            />
            <span className="icon-right" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <div className="input-icon">
            <Lock className="icon-left" />
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Nhập lại mật khẩu"
            />
            <span className="icon-right" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <label className="checkbox-label">
            <input type="checkbox" /> Tôi đồng ý với{' '}
            <a href="#">điều khoản</a> &{' '}
            <a href="#">chính sách bảo mật</a>.
          </label>

          <button type="submit" className="btn-register">
            Đăng ký →
          </button>

          <div className="divider"><span>hoặc</span></div>

          <div className="register">
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
