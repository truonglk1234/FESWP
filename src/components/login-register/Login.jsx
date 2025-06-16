import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, HeartHandshake, ShieldCheck, Award } from 'lucide-react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import VerifyEmail from './VerifyEmail';
import ResetPassword from './ResetPassword';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // ✅ GIẢI MÃ TOKEN

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [formState, setFormState] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      email,
      password
    }, { withCredentials: true });

    const token = response.data.token;
    const decoded = jwtDecode(token);

    const user = {
      name: decoded.sub,
      role: decoded.role,
      token: token
    };

    setUser(user);
    localStorage.setItem('token', token);

    // ✅ Phân quyền điều hướng
    switch (decoded.role) {
      case 'Admin':
        navigate('/admin/dashboard');
        break;
      case 'Consultant':
        navigate('/consultant/profile');
        break;
      case 'Staff':
        navigate('/staff/home');
        break;
      case 'Customer':
      default:
        navigate('/');
        break;
    }
  } catch (err) {
    if (err.response?.data) {
      setError(err.response.data);
    } else {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  }
};

  return (
    <div className="login-wrapper">
      {/* Left Info */}
      <div className="login-info">
        <h1>
          Tư vấn sức khỏe
          <span className="highlight"> giới tính </span> <br />
          chuyên nghiệp
        </h1>
        <p>Tham gia cùng hàng nghìn người dùng tin tưởng STI Health cho việc chăm sóc sức khỏe giới tính.</p>

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
        {formState === 'login' && (
          <>
            <h2>Đăng nhập</h2>
            <p>Chào mừng trở lại với STI Health</p>
            <form onSubmit={handleLogin}>
              <div className="input-icon">
                <Mail className="icon-left" />
                <input
                  type="email"
                  placeholder="Nhập địa chỉ Gmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-icon">
                <Lock className="icon-left" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu của bạn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="icon-right" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <div className="options">
                <label>
                  <input type="checkbox" /> Ghi nhớ đăng nhập
                </label>
                <button
                  type="button"
                  onClick={() => setFormState('forgot')}
                  className="forgot-link"
                >
                  Quên mật khẩu?
                </button>
              </div>

              <button type="submit" className="btn-submit">Đăng nhập →</button>

              {error && <p className="error">{error}</p>}


              <div className="register">
                Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
              </div>
            </form>
          </>
        )}

        {formState === 'forgot' && (
          <ForgotPassword onNext={() => setFormState('verify')} onBack={() => setFormState('login')} />
        )}

        {formState === 'verify' && (
          <VerifyEmail
            email={email}
            onBack={() => setFormState('forgot')}
            onNext={() => setFormState('reset')}
            type="reset"
          />
        )}

        {formState === 'reset' && (
          <ResetPassword
            onBack={() => setFormState('verify')}
            onDone={() => setFormState('login')}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
