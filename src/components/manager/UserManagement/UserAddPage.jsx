import React, { useState } from 'react';
import './UserAddPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserAddPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    try {
      await axios.post('http://localhost:8080/api/auth/manager/customers', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ Thêm người dùng thành công!');
      navigate('/manager/users');
    } catch (error) {
      console.error(error);
      alert('❌ Lỗi khi thêm người dùng!');
    }
  };

  return (
    <div className="ua-container">
      <h1>Thêm người dùng mới</h1>
      <form onSubmit={handleSubmit} className="ua-form">
        <label>Họ tên</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Email</label>
        <input name="email" type="email" value={formData.email} onChange={handleChange} required />

        <label>Số điện thoại</label>
        <input name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Mật khẩu</label>
        <input name="password" type="password" value={formData.password} onChange={handleChange} required />

        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default UserAddPage;
