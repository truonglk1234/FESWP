import React, { useEffect, useState } from 'react';
import './UserEditPage.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:8080/api/auth/manager/customers/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setFormData(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:8080/api/auth/manager/customers/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ Cập nhật thông tin thành công!');
      navigate('/manager/users');
    } catch (error) {
      console.error(error);
      alert('❌ Lỗi khi cập nhật!');
    }
  };

  return (
    <div className="ue-container">
      <h1>Sửa thông tin người dùng</h1>
      <form onSubmit={handleSubmit} className="ue-form">
        <label>Họ tên</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Email</label>
        <input name="email" type="email" value={formData.email} onChange={handleChange} required />

        <label>Số điện thoại</label>
        <input name="phone" value={formData.phone} onChange={handleChange} required />

        <button type="submit">Lưu thay đổi</button>
      </form>
    </div>
  );
};

export default UserEditPage;
