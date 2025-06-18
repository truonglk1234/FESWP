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
      setError('M\u1eadt kh\u1ea9u kh\u00f4ng kh\u1edbp');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/auth/reset-password-with-code', {
        email,
        code,
        newPassword: newPassword,
        confirmPassword
      });

      setSuccess(res.data || '\u0110\u1eb7t l\u1ea1i m\u1eadt kh\u1ea9u th\u00e0nh c\u00f4ng!');
      setTimeout(() => {
        if (onDone) onDone();
      }, 1500);
    } catch (err) {
      const msg = err.response?.data || 'Kh\u00f4ng th\u1ec3 \u0111\u1eb7t l\u1ea1i m\u1eadt kh\u1ea9u';
      setError(typeof msg === 'string' ? msg : msg.message);
    }
  };

  return (
    <div className="reset-password-form">
      <h2>\u0110\u1eb7t l\u1ea1i m\u1eadt kh\u1ea9u</h2>
      <p>Nh\u1eadp m\u1eadt kh\u1ea9u m\u1edbi cho t\u00e0i kho\u1ea3n c\u1ee7a b\u1ea1n</p>

      <form onSubmit={handleSubmit}>
        <div className="input-icon">
          <Lock className="icon-left" />
          <input
            type={showNew ? 'text' : 'password'}
            placeholder="M\u1eadt kh\u1ea9u m\u1edbi"
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
            placeholder="X\u00e1c nh\u1eadn m\u1eadt kh\u1ea9u"
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
          \u2713 X\u00e1c nh\u1eadn & \u0110\u0103ng nh\u1eadp
        </button>

        <div className="back-button">
          <button type="button" onClick={onBack}>
            \u2190 Quay l\u1ea1i x\u00e1c th\u1ef1c
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
