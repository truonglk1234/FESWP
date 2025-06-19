import React, { useState } from 'react';
import './ResetPassword.css';
import { Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const ResetPassword = ({ onBack, onDone, email, code }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/auth/reset-password-with-code', {
        email,
        code,
        newPassword,
        confirmPassword
      });

      setSuccess(res.data || 'Đặt lại mật khẩu thành công!');
      setTimeout(() => {
        if (onDone) onDone();
      }, 1500);
    } catch (err) {
      const msg = err.response?.data || 'Không thể đặt lại mật khẩu';
      setError(typeof msg === 'string' ? msg : msg.message);
    }
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

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

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
