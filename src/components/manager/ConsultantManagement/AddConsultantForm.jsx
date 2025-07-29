import React, { useState } from 'react';
import './AddConsultantForm.css';
import axios from 'axios';

const AddConsultantForm = ({ onClose, onAdded }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    specialty: '',
    experienceYears: '',
    education: '',
    certification: '',
    description: '',
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
    if (formData.password !== formData.confirmPassword) {
      setError('❌ Mật khẩu không khớp');
      return;
    }
    // Gửi payload
    try {
      setLoading(true);
      await axios.post('/api/auth/manager/consultants', formData);
      onAdded();
      onClose();
    } catch {
      setError('❌ Lỗi khi tạo tư vấn viên');
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
            <input name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>

          {/* Chuyên môn */}
          <div className="form-group">
            <label>Chuyên môn</label>
            <input name="specialty" value={formData.specialty} onChange={handleChange} />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          {/* Kinh nghiệm */}
          <div className="form-group">
            <label>Số năm kinh nghiệm</label>
            <input type="number" name="experienceYears" value={formData.experienceYears} onChange={handleChange} />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Số điện thoại</label>
            <input name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          {/* Trình độ */}
          <div className="form-group">
            <label>Trình độ học vấn</label>
            <input name="education" value={formData.education} onChange={handleChange} />
          </div>

          {/* Địa chỉ */}
          <div className="form-group">
            <label>Địa chỉ</label>
            <input name="address" value={formData.address} onChange={handleChange} />
          </div>

          {/* Chứng chỉ */}
          <div className="form-group">
            <label>Chứng chỉ</label>
            <input name="certification" value={formData.certification} onChange={handleChange} />
          </div>

          {/* Giới tính */}
          <div className="form-group">
            <label>Giới tính</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Chọn giới tính</option>
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
            </select>
          </div>

          {/* Ngày sinh */}
          <div className="form-group">
            <label>Ngày sinh</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
          </div>

          {/* Mô tả full width */}
          <div className="form-group full-width">
            <label>Mô tả</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
          </div>

          {/* Mật khẩu */}
          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          {/* Xác nhận mật khẩu */}
          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          {error && <p className="addconsultant-error">{error}</p>}

          {/* Actions */}
          <div className="addconsultant-actions">
            <button type="button" onClick={onClose}>Hủy</button>
            <button type="submit" disabled={loading}>{loading ? 'Đang xử lý...' : 'Thêm tư vấn viên'}</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddConsultantForm;
