import React, { useState } from 'react';
import './Register.css';
import './VerifyEmail.css';
import {
  User, Mail, Phone, Lock, Eye, EyeOff,
  HeartHandshake, ShieldCheck, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import VerifyEmail from './VerifyEmail';
import axios from 'axios';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirthday: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', formData, {
        withCredentials: true,
      });

      console.log('Đăng ký thành công:', response.data);
      setEmail(formData.email);
      setIsRegistered(true);
    } catch (err) {
      if (err.response) {
        setError(err.response.data || 'Đăng ký thất bại');
      } else {
        setError('Không thể kết nối đến máy chủ');
      }
    }
  };
  return (
    <div className="login-wrapper">
      {/* Bên trái luôn hiển thị */}
      <div className="login-info">
        <h1>
          Tham gia cộng đồng <span className="highlight">sức khỏe</span>
        </h1>
        <p>Đăng ký ngay để trải nghiệm dịch vụ chăm sóc sức khỏe giới tính hàng đầu tại Việt Nam.</p>

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
            <div><strong>Tư vấn chuyên khoa</strong><div>Đội ngũ bác sĩ giàu kinh nghiệm</div></div>
          </div>
          <div className="feature">
            <div className="feature-icon"><ShieldCheck size={20} /></div>
            <div><strong>Bảo mật tuyệt đối</strong><div>Thông tin được mã hóa end-to-end</div></div>
          </div>
          <div className="feature">
            <div className="feature-icon"><Award size={20} /></div>
            <div><strong>Chất lượng hàng đầu</strong><div>Được chứng nhận bởi Bộ Y tế</div></div>
          </div>
        </div>
      </div>

      {/* Bên phải thay đổi theo trạng thái */}
       <div className="register-form">
        {isRegistered ? (
          <VerifyEmail email={email} />
        ) : (
          <>
            <h2>Đăng ký</h2>
            <p>Tạo tài khoản mới để sử dụng dịch vụ</p>

            <form onSubmit={handleRegister}>
              <div className="input-icon">
                <User className="icon-left" />
                <input
                  type="text"
                  name="name"
                  placeholder="Họ và tên"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-icon">
                <Mail className="icon-left" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-icon">
                <Phone className="icon-left" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Số điện thoại"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="two-columns">
                <div className="form-group">
                  <label htmlFor="gender">Giới tính</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="custom-select"
                    required
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="true">Nam</option>
                    <option value="false">Nữ</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="dateOfBirthday">Ngày sinh</label>
                  <input
                    type="date"
                    id="dateOfBirthday"
                    name="dateOfBirthday"
                    className="custom-input"
                    value={formData.dateOfBirthday}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-icon">
                <Lock className="icon-left" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span className="icon-right" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <div className="input-icon">
                <Lock className="icon-left" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span className="icon-right" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <label className="checkbox-label">
                <input type="checkbox" required /> Tôi đồng ý với{' '}
                <a href="#">điều khoản</a> &{' '}
                <a href="#">chính sách bảo mật</a>.
              </label>

              <button type="submit" className="btn-register">
                Đăng ký →
              </button>

              {error && <p className="error">{error}</p>}

              <div className="divider"><span>hoặc</span></div>
              <div className="register">
                Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;