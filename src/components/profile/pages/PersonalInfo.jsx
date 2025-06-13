import React, { useState } from 'react';
import '../pages/PersonalInfo.css';

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    name: 'Nguyễn Thị Lan',
    dob: '1995-05-15',
    gender: 'female',
    phone: '0987654321',
    email: 'lan.nguyen@example.com',
    maritalStatus: 'Độc thân',
    address: 'Hà Nội, Việt Nam',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Info:', formData);
  };

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
              <label><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Nam</label>
              <label><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Nữ</label>
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
            <input name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-col">
            <label>Tình trạng hôn nhân</label>
            <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
              <option>Độc thân</option>
              <option>Đã kết hôn</option>
              <option>Ly hôn</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <label>Địa chỉ</label>
            <input name="address" value={formData.address} onChange={handleChange} />
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
