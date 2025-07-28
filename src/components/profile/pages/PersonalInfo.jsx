import React, { useState, useEffect } from 'react';
import '../pages/PersonalInfo.css';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const PersonalInfo = () => {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    gender: null,
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    avatar: null,
    avatarUrl: ''
  });

  const [loading, setLoading] = useState(true);

  // ✅ Tạo axios instance nội bộ
  const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { 'Content-Type': 'application/json' }
  });

  // ✅ Gắn token vào request
  api.interceptors.request.use(
    (config) => {
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ✅ Xử lý 401
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  // ✅ Lấy dữ liệu cá nhân từ API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/profileuser');
        const data = res.data;

        setFormData((prev) => ({
          ...prev,
          fullName: data.fullName || '',
          gender: data.gender,
          dateOfBirth: data.dateOfBirth || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          avatarUrl: data.avatarUrl || ''
        }));
      } catch (err) {
        console.error('❌ Lỗi khi lấy profile:', err.response?.data || err.message);
        alert('Không thể tải thông tin cá nhân!');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Cập nhật form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'gender' ? value === 'true' : value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: file,
        avatarUrl: URL.createObjectURL(file)
      }));
    }
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append('fullName', formData.fullName);
    submitData.append('gender', formData.gender);
    submitData.append('dateOfBirth', formData.dateOfBirth);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('address', formData.address);

    if (formData.avatar) {
      submitData.append('avatar', formData.avatar);
    }

    try {
      const res = await api.put('/auth/profileuser', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // ✅ Cập nhật thông tin user trên context & localStorage
      const updatedUser = {
        ...user,
        name: formData.fullName,
        avatarUrl: formData.avatarUrl
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      alert('✅ Cập nhật thông tin cá nhân thành công!');
    } catch (err) {
      console.error('❌ Lỗi khi cập nhật:', err);
      alert('❌ Cập nhật thất bại!');
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

        <div className="form-row">
          <div className="form-col">
            <label>Ảnh đại diện</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            {formData.avatarUrl && (
              <div className="avatar-preview">
                <img src={formData.avatarUrl} alt="Avatar preview" />
              </div>
            )}
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
