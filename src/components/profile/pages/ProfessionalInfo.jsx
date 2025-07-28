import React, { useState, useEffect } from 'react';
import './ProfessionalInfo.css';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';

const ProfessionalInfo = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    specialty: '',
    experienceYears: '',
    consultationFee: '',
    description: '',
    education: '',
    certifications: ''
  });

  const api = axios.create({
    baseURL: 'http://localhost:8080/api'
  });

  api.interceptors.request.use(config => {
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/auth/profileuser');
        setFormData({
          specialty: res.data.specialty || '',
          experienceYears: res.data.experienceYears || '',
          consultationFee: res.data.consultationFee || '',
          description: res.data.description || '',
          education: res.data.education || '',
          certifications: res.data.certifications || ''
        });
      } catch (err) {
        alert('❌ Không thể tải thông tin chuyên môn!');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/auth/profileuser', formData);
      alert('✅ Cập nhật thông tin chuyên môn thành công!');
    } catch (err) {
      alert('❌ Cập nhật thất bại!');
    }
  };

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

        <div className="form-row">
          <div className="form-col">
            <label>Phí tư vấn</label>
            <input
              type="number"
              name="consultationFee"
              value={formData.consultationFee}
              onChange={handleChange}
            />
          </div>
          <div className="form-col">
            <label>Mô tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>

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
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit">Lưu thông tin chuyên môn</button>
        </div>
      </form>
    </div>
  );
};

export default ProfessionalInfo;
