import React, { useState, useEffect } from 'react';
import '../pages/PersonalInfo.css';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext'; // chỉnh lại đường dẫn nếu khác

const PersonalInfo = () => {
  const { user } = useAuth(); // để lấy token
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: ''
  });

  const [loading, setLoading] = useState(true);

  // ✅ Lấy thông tin từ backend khi mở trang
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/user/profile', {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });
        setFormData(res.data); // gán dữ liệu từ API vào form
      } catch (err) {
        console.error('❌ Lỗi khi lấy profile:', err);
        alert('Không thể tải thông tin cá nhân!');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Gửi dữ liệu cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8080/api/user/profile', formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      alert('✅ Thông tin đã được cập nhật thành công!');
    } catch (err) {
      console.error('❌ Lỗi khi cập nhật:', err);
      alert('Cập nhật thất bại!');
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
            <input name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-col">
            <label>Giới tính</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Nam
              </label>
              <label>
                <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Nữ
              </label>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <label>Ngày sinh</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          </div>
          <div className="form-col">
            <label>Số điện thoại</label>
            <input name="phone" value={formData.phone} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <label>Email</label>
            <input name="email" value={formData.email} onChange={handleChange} readOnly /> {/* thường không cho sửa */}
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <label>Địa chỉ</label>
            <input name="address" value={formData.address} onChange={handleChange} placeholder="Nhập địa chỉ của bạn" />
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
