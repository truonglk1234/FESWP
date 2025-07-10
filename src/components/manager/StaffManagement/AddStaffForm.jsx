import React, { useState } from 'react';
import './AddStaffForm.css';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const AddStaffForm = ({ onClose, onAdded }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirthday: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('❌ Mật khẩu không khớp');
      return;
    }

    if (formData.password.length < 6) {
      setError('❌ Mật khẩu phải từ 6 ký tự trở lên');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (formData.dateOfBirthday > today) {
      setError('❌ Ngày sinh không hợp lệ');
      return;
    }

    const payload = {
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      fullName: formData.name,
      gender: formData.gender === 'true',
      dateOfBirthday: formData.dateOfBirthday,
      address: formData.address
    };

    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      await axios.post('http://localhost:8080/api/auth/manager/staff', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('✅ Tạo nhân viên thành công!');
      onAdded();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || '❌ Lỗi khi tạo nhân viên');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addstaff-overlay">
      <div className="addstaff-modal">
        <h2>Thêm nhân viên mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="addstaff-input-icon">
            <User className="addstaff-icon-left" />
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="addstaff-input-icon">
            <Mail className="addstaff-icon-left" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="addstaff-input-icon">
            <Phone className="addstaff-icon-left" />
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="addstaff-two-columns">
            <div>
              <label>Giới tính</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="true">Nam</option>
                <option value="false">Nữ</option>
              </select>
            </div>

            <div>
              <label>Ngày sinh</label>
              <input
                type="date"
                name="dateOfBirthday"
                value={formData.dateOfBirthday}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="addstaff-input-icon">
            <input
              type="text"
              name="address"
              placeholder="Địa chỉ"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="addstaff-input-icon">
            <Lock className="addstaff-icon-left" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="addstaff-icon-right" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <div className="addstaff-input-icon">
            <Lock className="addstaff-icon-left" />
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span className="addstaff-icon-right" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {error && <p className="addstaff-error">{error}</p>}

          <div className="addstaff-actions">
            <button type="button" onClick={onClose}>Hủy</button>
            <button type="submit" disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Thêm nhân viên'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaffForm;