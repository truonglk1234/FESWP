import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ConsultantProfileModal.css';

const ConsultantProfileModal = ({ consultantId, onClose }) => {
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    if (!consultantId) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/public/consultants/${consultantId}`);
        setDoc(res.data);
      } catch (err) {
        console.error('Lỗi tải dữ liệu tư vấn viên:', err);
      }
    };
    fetchProfile();
  }, [consultantId]);

  if (!doc) return null;

  return (
    <div className="cp-modal-backdrop" onClick={onClose}>
      <div className="cp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cp-close" onClick={onClose}>×</button>

        <div className="cp-header">
          <h2>Hồ sơ tư vấn viên</h2>
          <p>Thông tin chi tiết</p>
        </div>

        <div className="cp-grid">
          <div className="cp-item"><label>Họ và tên</label><p>{doc.fullName}</p></div>
          <div className="cp-item"><label>Giới tính</label><p>{doc.gender ? 'Nam' : 'Nữ'}</p></div>
          <div className="cp-item"><label>Ngày sinh</label><p>{new Date(doc.dateOfBirth).toLocaleDateString('vi-VN')}</p></div>
          <div className="cp-item"><label>Số điện thoại</label><p>{doc.phone}</p></div>
          <div className="cp-item"><label>Email</label><p>{doc.email}</p></div>
          <div className="cp-item"><label>Chuyên ngành</label><p>{doc.specialty}</p></div>
          <div className="cp-item"><label>Kinh nghiệm</label><p>{doc.experienceYears} năm</p></div>
          <div className="cp-item"><label>Phí tư vấn</label><p>{doc.consultationFee?.toLocaleString()} đ</p></div>
          <div className="cp-item cp-full"><label>Địa chỉ</label><p>{doc.address}</p></div>
          <div className="cp-item cp-full"><label>Mô tả</label><p>{doc.description}</p></div>
          <div className="cp-item"><label>Học vấn</label><p>{doc.education}</p></div>
          <div className="cp-item"><label>Chứng chỉ</label><p>{doc.certifications}</p></div>
          <div className="cp-item cp-full cp-avatar">
            <label>Ảnh đại diện</label>
            <img
              src={
                doc.avatarUrl
                  ? doc.avatarUrl
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.fullName)}`
              }
              alt="Avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantProfileModal;
