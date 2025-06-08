import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import './ForgotPassword.css';

const ForgotPassword = ({ onNext, onBack }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    // Gửi email xác thực ở đây (nếu có API)
    // Sau khi thành công → chuyển sang bước xác thực
    onNext(email);  // ✅ truyền email cho component cha
  };

  return (
    <div className="forgot-password-form">
      <h2>Quên mật khẩu?</h2>
      <p>Nhập địa chỉ email để nhận mã xác thực đặt lại mật khẩu</p>

      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn-submit">
          Gửi mã xác thực
        </button>

        <div className="back-button">
          <button type="button" onClick={onBack}>
            ← Quay lại đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
