import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import './ForgotPassword.css';
import axios from 'axios';

const ForgotPassword = ({ onNext, onBack }) => {
  const [emailInput, setEmailInput] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await axios.post('http://localhost:8080/api/auth/forgot-password', {
        email: emailInput
      });

      setMessage(res.data || 'M\u00e3 x\u00e1c th\u1ef1c \u0111\u00e3 \u0111\u01b0\u1ee3c g\u1eedi \u0111\u1ebfn email c\u1ee7a b\u1ea1n.');
      if (onNext) onNext(emailInput);
    } catch (err) {
      const msg = err.response?.data || 'Kh\u00f4ng th\u1ec3 g\u1eedi m\u00e3 x\u00e1c th\u1ef1c';
      setError(typeof msg === 'string' ? msg : msg.message);
    }
  };

  return (
    <div className="forgot-password-form">
      <h2>Qu\u00ean m\u1eadt kh\u1ea9u?</h2>
      <p>Nh\u1eadp \u0111\u1ecba ch\u1ec9 email \u0111\u1ec3 nh\u1eadn m\u00e3 x\u00e1c th\u1ef1c \u0111\u1eb7t l\u1ea1i m\u1eadt kh\u1ea9u</p>

      <form onSubmit={handleSubmit}>
        <div className="input-icon">
          <Mail className="icon-left" />
          <input
            type="email"
            placeholder="Nh\u1eadp \u0111\u1ecba ch\u1ec9 Gmail"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <button type="submit" className="btn-submit">
          G\u1eedi m\u00e3 x\u00e1c th\u1ef1c
        </button>

        <div className="back-button">
          <button type="button" onClick={onBack}>
            \u2190 Quay l\u1ea1i \u0111\u0103ng nh\u1eadp
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;