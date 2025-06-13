import React, { useState } from 'react';
import './AccountInfo.css';

const AccountInfo = () => {
  const [accountData] = useState({
    username: 'lan_nguyen95',
    createdAt: '2024-05-15',
    role: 'Khách hàng',
    status: 'Hoạt động'
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password change request:', passwords);
  };

  return (
    <div className="info-wrapper">
      <div className="info-header">
        <h2>Thông tin tài khoản</h2>
        <p>Quản lý tài khoản và bảo mật</p>
      </div>

      <div className="info-form">
        <div className="form-row">
          <div className="form-col">
            <label>Tên đăng nhập</label>
            <input value={accountData.username} disabled />
          </div>
          <div className="form-col">
            <label>Vai trò</label>
            <input value={accountData.role} disabled />
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <label>Ngày tạo tài khoản</label>
            <input value={accountData.createdAt} disabled />
          </div>
          <div className="form-col">
            <label>Trạng thái tài khoản</label>
            <p className="account-status"><span className="dot" /> {accountData.status}</p>
          </div>
        </div>

        <hr className="divider" />

        <div className="form-row">
          <h3>Thay đổi mật khẩu</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="password"
              name="currentPassword"
              placeholder="Mật khẩu hiện tại"
              value={passwords.currentPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <input
              type="password"
              name="newPassword"
              placeholder="Mật khẩu mới"
              value={passwords.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu mới"
              value={passwords.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit">Cập nhật mật khẩu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountInfo;
