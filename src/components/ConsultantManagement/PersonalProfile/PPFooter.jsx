import React, { useState } from 'react';
import './PPFooter.css';

const PPFooter = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp');
      return;
    }

    // Gọi API đổi mật khẩu ở đây
    alert('Đổi mật khẩu thành công!');
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="ppf-container">
      <form className="ppf-card" onSubmit={handleSubmit}>
        <h3>Đổi mật khẩu</h3>

        <div className="ppf-group">
          <label>Mật khẩu hiện tại</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="ppf-group">
          <label>Mật khẩu mới</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="ppf-group">
          <label>Xác nhận mật khẩu mới</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark">Đổi mật khẩu</button>
      </form>
    </div>
  );
};

export default PPFooter;
