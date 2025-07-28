import React, { useState } from 'react';
import './AddConsultantForm.css';
import { User, Mail, Phone, Lock, Eye, EyeOff, MapPin, Calendar } from 'lucide-react';
import axios from 'axios';

const AddConsultantForm = ({ onClose, onAdded }) => {
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

  const getToken = () => {
    try {
      const stored = localStorage.getItem('user') || sessionStorage.getItem('user');
      return stored ? JSON.parse(stored).token : null;
    } catch {
      return null;
    }
  };

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
      const token = getToken();
      await axios.post('http://localhost:8080/api/auth/manager/consultants', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('✅ Tạo tư vấn viên thành công!');
      onAdded();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || '❌ Lỗi khi tạo tư vấn viên');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addconsultant-overlay">
      <div className="addconsultant-modal">
        <h2>Thêm tư vấn viên mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="addconsultant-input-icon">
            <User className="addconsultant-icon-left" />
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="addconsultant-input-icon">
            <Mail className="addconsultant-icon-left" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="addconsultant-input-icon">
            <Phone className="addconsultant-icon-left" />
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="addconsultant-two-columns">
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

          <div className="addconsultant-input-icon">
            <MapPin className="addconsultant-icon-left" />
            <input
              type="text"
              name="address"
              placeholder="Địa chỉ"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="addconsultant-input-icon">
            <Lock className="addconsultant-icon-left" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="addconsultant-icon-right"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <div className="addconsultant-input-icon">
            <Lock className="addconsultant-icon-left" />
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className="addconsultant-icon-right"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {error && <p className="addconsultant-error">{error}</p>}

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
