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

    console.log('\ud83d\udd0d Sending verify-code:', { email, code });

    if (code.length !== 6) {
      alert('M\u00e3 x\u00e1c th\u1ef1c ph\u1ea3i \u0111\u1ee7 6 ch\u1eef s\u1ed1.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/auth/verify-code', { email, code }, { withCredentials: true });

      if (type === 'register') {
        window.location.href = '/login';
      } else if (type === 'reset') {
        if (onNext) onNext(code);
      }
    } catch (err) {
      const msg = err.response?.data;
      alert("X\u00e1c th\u1ef1c th\u1ea5t b\u1ea1i: " + (typeof msg === 'string' ? msg : msg?.message || 'L\u1ed7i m\u00e1y ch\u1ee7'));
    }
  };

  const handleResendCode = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/resend-code', { email }, { withCredentials: true });
      alert('\u2705 M\u00e3 x\u00e1c th\u1ef1c \u0111\u00e3 \u0111\u01b0\u1ee3c g\u1eedi l\u1ea1i.');
    } catch (err) {
      alert('\u274c Kh\u00f4ng th\u1ec3 g\u1eedi l\u1ea1i m\u00e3: ' + (err.response?.data || 'L\u1ed7i m\u00e1y ch\u1ee7'));
    }
  };

  return (
    <div className="verify-form-web">
      <h2 className="title">X\u00e1c th\u1ef1c email</h2>
      <p className="subtitle">
        Ch\u00fang t\u00f4i \u0111\u00e3 g\u1eedi m\u00e3 x\u00e1c th\u1ef1c 6 ch\u1eef s\u1ed1 \u0111\u1ebfn<br />
        <span className="email">{email}</span>
      </p>

      <form onSubmit={handleSubmit}>
        <label className="input-label">Nh\u1eadp m\u00e3 x\u00e1c th\u1ef1c</label>
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
          \u2713 X\u00e1c th\u1ef1c t\u00e0i kho\u1ea3n
        </button>

        <div className="resend-group">
          <p className="resend-question">Kh\u00f4ng nh\u1eadn \u0111\u01b0\u1ee3c m\u00e3 x\u00e1c th\u1ef1c?</p>
          <button type="button" className="resend-button" onClick={handleResendCode}>
            <Send size={16} className="resend-icon" />
            G\u1eedi l\u1ea1i m\u00e3 x\u00e1c th\u1ef1c
          </button>
        </div>

        <div className="back-button">
          <button type="button" onClick={onBack}>
            \u2190 {type === 'register' ? 'Quay l\u1ea1i \u0111\u0103ng k\u00fd' : 'Quay l\u1ea1i qu\u00ean m\u1eadt kh\u1ea9u'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmail;
