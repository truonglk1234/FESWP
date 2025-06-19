import React, { useState } from 'react';
import './PPHeader.css';

const PPHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Nguyễn Văn Tư Vấn',
    email: 'tuvan@example.com',
    phone: '0123456789',
    gender: 'Nam',
    dob: '1990-01-01',
    experience: '5',
    description:
      'Tôi là một tư vấn viên có nhiều năm kinh nghiệm trong lĩnh vực tư vấn tâm lý và phát triển cá nhân. Tôi luôn lắng nghe và đưa ra những lời khuyên tốt nhất cho khách hàng.',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Gọi API lưu nếu cần
    setIsEditing(false);
  };

  return (
    <div className="pp-container">
      <div className="pp-header">
        <div>
          <h2>Hồ sơ cá nhân</h2>
          <p>Quản lý thông tin cá nhân của bạn</p>
        </div>
        <button className={`btn ${isEditing ? 'btn-outline' : 'btn-dark'}`} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Hủy' : 'Chỉnh sửa'}
        </button>
      </div>

      <div className="pp-card">
        <h3>Thông tin cơ bản</h3>
        <div className="pp-grid">
          <div className="field">
            <label>Họ và tên</label>
            {isEditing ? (
              <input name="name" value={formData.name} onChange={handleChange} />
            ) : (
              <div className="value">{formData.name}</div>
            )}
          </div>

          <div className="field">
            <label>Email</label>
            {isEditing ? (
              <input name="email" value={formData.email} onChange={handleChange} />
            ) : (
              <div className="value">{formData.email}</div>
            )}
          </div>

          <div className="field">
            <label>Số điện thoại</label>
            {isEditing ? (
              <input name="phone" value={formData.phone} onChange={handleChange} />
            ) : (
              <div className="value">{formData.phone}</div>
            )}
          </div>

          <div className="field">
            <label>Giới tính</label>
            {isEditing ? (
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            ) : (
              <div className="value">{formData.gender}</div>
            )}
          </div>

          <div className="field">
            <label>Ngày sinh</label>
            {isEditing ? (
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            ) : (
              <div className="value">{new Date(formData.dob).toLocaleDateString('vi-VN')}</div>
            )}
          </div>

          <div className="field">
            <label>Số năm kinh nghiệm</label>
            {isEditing ? (
              <input name="experience" value={formData.experience} onChange={handleChange} />
            ) : (
              <div className="value">{formData.experience} năm</div>
            )}
          </div>

          <div className="field full-width">
            <label>Mô tả giới thiệu bản thân</label>
            {isEditing ? (
              <textarea name="description" rows={4} value={formData.description} onChange={handleChange} />
            ) : (
              <div className="value">{formData.description}</div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="actions">
            <button className="btn btn-outline" onClick={() => setIsEditing(false)}>Hủy</button>
            <button className="btn btn-dark" onClick={handleSave}>Lưu thay đổi</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PPHeader;
