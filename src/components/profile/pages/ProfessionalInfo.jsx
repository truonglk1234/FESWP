import React, { useState, useEffect } from 'react';
import './ProfessionalInfo.css';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';

const ProfessionalInfo = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    specialty: '',
    experienceYears: '',
    education: '',
    certification: '',
    description: ''
  });

  const api = axios.create({
    baseURL: 'http://localhost:8080/api'
  });

  // Đính kèm token vào header
  api.interceptors.request.use(config => {
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/consultants/me/professional-info');
        setFormData({
          specialty: res.data.specialty || '',
          experienceYears: res.data.experienceYears || '',
          education: res.data.education || '',
          certification: res.data.certification || '',
          description: res.data.description || ''
        });
      } catch (err) {
        alert('❌ Không thể tải thông tin chuyên môn!');
      }
    };
    fetchData();
  }, []);

  // Handle change input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/consultants/me/professional-info', formData);
      alert('✅ Cập nhật thông tin chuyên môn thành công!');
    } catch (err) {
      alert('❌ Cập nhật thất bại!');
    }
  };

  // Kiểm tra role
  if (user?.role?.toLowerCase() !== 'consultant') {
    return <p>Bạn không có quyền truy cập trang này.</p>;
  }

  return (
    <div className="info-wrapper">
      <div className="info-header">
        <h2>Thông tin chuyên môn</h2>
        <p>Cập nhật các thông tin chuyên ngành, kinh nghiệm, chứng chỉ</p>
      </div>
      <form className="info-form" onSubmit={handleSubmit}>
        {/* Chuyên ngành + Kinh nghiệm */}
        <div className="form-row">
          <div className="form-col">
            <label>Chuyên ngành</label>
            <input
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
            />
          </div>
          <div className="form-col">
            <label>Kinh nghiệm (năm)</label>
            <input
              type="number"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Học vấn + Chứng chỉ */}
        <div className="form-row">
          <div className="form-col">
            <label>Học vấn</label>
            <input
              name="education"
              value={formData.education}
              onChange={handleChange}
            />
          </div>
          <div className="form-col">
            <label>Chứng chỉ</label>
            <input
              name="certification"
              value={formData.certification}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Mô tả */}
        <div className="form-row">
          <div className="form-col-full">
            <label>Mô tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Nút lưu */}
        <div className="form-actions">
          <button type="submit">Lưu thông tin chuyên môn</button>
        </div>
      </form>
    </div>
  );
};

export default ProfessionalInfo;
