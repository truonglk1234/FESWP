import React, { useEffect, useState } from 'react';
import './AccountInfo.css';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const AccountInfo = () => {
  const { user } = useAuth();

  const [accountData, setAccountData] = useState({
    username: '',
    createdAt: '',
    role: '',
    status: ''
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInvalidToken = () => {
    alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchAccountInfo = async () => {
      if (!user?.token) return handleInvalidToken();

      try {
        const res = await axios.get("http://localhost:8080/api/auth/profileuser", {
          headers: { Authorization: `Bearer ${user.token}` }
        });

        const data = res.data;
        setAccountData({
          username: data.email || '',
          createdAt: data.createdAt || '',
          role: convertRole(data.role),
          status: data.active === false ? 'Không hoạt động' : 'Hoạt động'
        });
      } catch (err) {
        if (err.response?.status === 401) return handleInvalidToken();
        console.error("❌ Lỗi khi lấy thông tin tài khoản:", err);
        alert("Không thể tải thông tin tài khoản!");
      }
    };

    fetchAccountInfo();
  }, [user]);

  const convertRole = (role) => {
    switch (role) {
      case 'Admin': return 'Quản trị viên';
      case 'Manager': return 'Quản lý';
      case 'Staff': return 'Nhân viên';
      case 'Consultant': return 'Tư vấn viên';
      case 'Customer': return 'Khách hàng';
      default: return role;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      return alert("❌ Mật khẩu xác nhận không khớp!");
    }

    if (!user?.token) return handleInvalidToken();

    try {
      await axios.post("http://localhost:8080/api/auth/change-password", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      alert("✅ Đổi mật khẩu thành công!");
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      if (err.response?.status === 401) return handleInvalidToken();
      console.error("❌ Lỗi khi đổi mật khẩu:", err);
      alert("❌ Không thể đổi mật khẩu!");
    }
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
            <input value={accountData.createdAt?.slice(0, 10)} disabled />
          </div>
          <div className="form-col">
            <label>Trạng thái tài khoản</label>
            <p className="account-status">
              <span className={`dot ${accountData.status === 'Hoạt động' ? 'green' : 'red'}`} />
              {accountData.status}
            </p>
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
              required
            />
          </div>
          <div className="form-row">
            <input
              type="password"
              name="newPassword"
              placeholder="Mật khẩu mới"
              value={passwords.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu mới"
              value={passwords.confirmPassword}
              onChange={handleChange}
              required
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
