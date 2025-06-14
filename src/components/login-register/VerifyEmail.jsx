import React, { useState } from 'react';
import './VerifyEmail.css';
import { Send } from 'lucide-react';
import axios from 'axios';

const VerifyEmail = ({ email, onBack, onNext, type = 'register' }) => {
  const [otp, setOtp] = useState(Array(6).fill(''));

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next && next.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev && prev.focus();
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const code = otp.join('');

  try {
  if (type === 'register') {
    // Gửi mã xác thực cho đăng ký
    await axios.post('http://localhost:8080/api/auth/verify-code', {
      email,
      code
    }, { withCredentials: true });

    // Sau khi xác thực thành công, chuyển về login
    window.location.href = '/login'; // hoặc dùng navigate('/login') nếu đang dùng useNavigate

  } else if (type === 'reset') {
    // Gửi mã xác thực cho quên mật khẩu
    await axios.post('http://localhost:8080/api/auth/verify-reset', {
      email,
      code
    }, { withCredentials: true });

    // Nếu xác thực đúng mã OTP, chuyển sang bước đặt lại mật khẩu
    if (onNext) onNext();
  }
} catch (err) {
  alert("Xác thực thất bại: " + (err.response?.data || "Lỗi máy chủ"));
}

};
  return (
    <div className="verify-form-web">
      <h2 className="title">Xác thực email</h2>
      <p className="subtitle">
        Chúng tôi đã gửi mã xác thực 6 chữ số đến<br />
        <span className="email">{email}</span>
      </p>

      <form onSubmit={handleSubmit}>
        <label className="input-label">Nhập mã xác thực</label>
        <div className="otp-inputs">
          {otp.map((d, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              required
            />
          ))}
        </div>

        <button type="submit" className="btn-verify">
          ✓ Xác thực tài khoản
        </button>

        <div className="resend-group">
          <p className="resend-question">Không nhận được mã xác thực?</p>
          <button type="button" className="resend-button">
            <Send size={16} className="resend-icon" />
            Gửi lại mã xác thực
          </button>
        </div>

        <div className="back-button">
          <button type="button" onClick={onBack}>
            ← {type === 'register' ? 'Quay lại đăng ký' : 'Quay lại quên mật khẩu'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmail;
