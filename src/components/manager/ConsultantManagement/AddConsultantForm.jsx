import React, { useState } from 'react';
import './AddConsultantForm.css';
import axios from 'axios';

const AddConsultantForm = ({ onClose, onAdded }) => {
  const initialState = {
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    password: '',
    confirmPassword: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu
    if (formData.password !== formData.confirmPassword) {
      setError('❌ Mật khẩu không khớp');
      return;
    }

    if (!formData.gender) {
      setError('❌ Vui lòng chọn giới tính');
      return;
    }

    // Payload đúng format API
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender === 'Male', // Male = true, Female = false
      password: formData.password
    };

    try {
      setLoading(true);
      setError('');
      await axios.post('http://localhost:8080/api/manager/consultants', payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      // Sau khi thêm thành công
      onAdded();
      onClose();
      setFormData(initialState); // Reset form
    } catch (err) {
      console.error(err);
      setError('❌ Lỗi khi tạo tư vấn viên (email có thể đã tồn tại)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addconsultant-overlay">
      <div className="addconsultant-modal">
        <h2>Thêm tư vấn viên mới</h2>
        <form onSubmit={handleSubmit} className="addconsultant-grid-form">

          {/* Họ tên */}
          <div className="form-group">
            <label>Họ và tên</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Số điện thoại */}
          <div className="form-group">
            <label>Số điện thoại</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Địa chỉ */}
          <div className="form-group">
            <label>Địa chỉ</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Giới tính */}
          <div className="form-group">
            <label>Giới tính</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
            </select>
          </div>

          {/* Ngày sinh */}
          <div className="form-group">
            <label>Ngày sinh</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mật khẩu */}
          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Xác nhận mật khẩu */}
          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Hiển thị lỗi */}
          {error && <p className="addconsultant-error">{error}</p>}

          {/* Buttons */}
          <div className="addconsultant-actions">
            <button type="button" onClick={onClose}>Hủy</button>
            <button type="submit" disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Thêm tư vấn viên'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddConsultantForm;
