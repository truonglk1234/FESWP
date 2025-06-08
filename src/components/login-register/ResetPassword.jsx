import React, { useState } from 'react';
import './ResetPassword.css';
import { Lock, Eye, EyeOff } from 'lucide-react';

const ResetPassword = ({ onBack, onDone }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu không khớp');
      return;
    }

    console.log('Mật khẩu mới:', newPassword);
    // TODO: Gọi API đặt lại mật khẩu ở đây

    if (onDone) onDone(); // quay về login
  };

  return (
    <div className="reset-password-form">
      <h2>Đặt lại mật khẩu</h2>
      <p>Nhập mật khẩu mới cho tài khoản của bạn</p>

      <form onSubmit={handleSubmit}>
        <div className="input-icon">
          <Lock className="icon-left" />
          <input
            type={showNew ? 'text' : 'password'}
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <span className="icon-right" onClick={() => setShowNew(!showNew)}>
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <div className="input-icon">
          <Lock className="icon-left" />
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span className="icon-right" onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <button type="submit" className="btn-submit">
          ✓ Xác nhận & Đăng nhập
        </button>

        <div className="back-button">
          <button type="button" onClick={onBack}>
            ← Quay lại xác thực
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
