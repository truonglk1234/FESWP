import React, { useState } from 'react';
import './VerifyEmail.css';
import { Send } from 'lucide-react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join('');
    console.log(`Mã OTP (${type}):`, code);

    // Gọi API xác thực theo loại
    if (type === 'register') {
      // Gọi API xác thực email khi đăng ký
      // TODO: thêm logic gọi API xác thực khi đăng ký
    } else if (type === 'reset') {
      // Gọi API xác thực email khi quên mật khẩu
      // TODO: thêm logic gọi API xác thực khi reset
    }

    // Sau khi xác thực thành công, chuyển bước
    if (onNext) onNext();
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
