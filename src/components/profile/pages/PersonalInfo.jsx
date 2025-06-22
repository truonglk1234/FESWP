
import React, { useState, useEffect } from 'react';
import '../pages/PersonalInfo.css';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const PersonalInfo = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    gender: null,
    dateOfBirth: '', // dùng lại tên chuẩn
    email: '',
    phone: '',
    address: '',
    avatarUrl: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/auth/user/profile', {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });
        const data = res.data;

        setFormData({
          fullName: data.fullName || '',
          gender: data.gender,
          dateOfBirth: data.dateOfBirth || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          avatarUrl: data.avatarUrl || ''
        });
      } catch (err) {
        console.error('❌ Lỗi khi lấy profile:', err.response?.data || err.message);
        alert('Không thể tải thông tin cá nhân!');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'gender' ? value === 'true' : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8080/api/auth/user/profile', formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      alert('✅ Thông tin đã được cập nhật thành công!');
    } catch (err) {
      console.error('❌ Lỗi khi cập nhật:', err.response?.data || err.message);
      alert('Cập nhật thất bại: ' + (err.response?.data?.message || 'Lỗi không xác định'));
    }
  };

  if (loading) return <p>Đang tải thông tin...</p>;

  return (
    <div className="info-wrapper">
      <div className="info-header">
        <h2>Thông tin cá nhân</h2>
        <p>Cập nhật thông tin cá nhân của bạn</p>
      </div>

      <form onSubmit={handleSubmit} className="info-form">
        <div className="form-row">
          <div className="form-col">
            <label>Họ và tên đầy đủ</label>
            <input name="fullName" value={formData.fullName} onChange={handleChange} />
          </div>
          <div className="form-col">
            <label>Giới tính</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="true"
                  checked={formData.gender === true}
                  onChange={handleChange}
                /> Nam
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="false"
                  checked={formData.gender === false}
                  onChange={handleChange}
                /> Nữ
              </label>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <label>Ngày sinh</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="form-col">
            <label>Số điện thoại</label>
            <input name="phone" value={formData.phone} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <label>Email</label>
            <input name="email" value={formData.email} readOnly />
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <label>Địa chỉ</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Nhập địa chỉ của bạn"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit">Cập nhật thông tin cá nhân</button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
