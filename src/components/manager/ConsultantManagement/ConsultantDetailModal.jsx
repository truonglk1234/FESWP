import React, { useState, useEffect } from 'react';
import './ConsultantDetailModal.css';
import { X } from 'lucide-react';

const ConsultantDetailModal = ({ consultant, onClose }) => {
  const [data, setData] = useState({ ...consultant });

  useEffect(() => {
    setData({ ...consultant });
  }, [consultant]);

  return (
    <div className="cddm-overlay" onClick={onClose}>
      <div className="cddm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cddm-header">
          <h2>Chi tiết tư vấn viên</h2>
          <button className="cddm-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="cddm-body">
          <div className="cddm-row">
            <label>Họ tên:</label>
            <span>{data.fullName || '-'}</span>
          </div>
          <div className="cddm-row">
            <label>Email:</label>
            <span>{data.email || '-'}</span>
          </div>
          <div className="cddm-row">
            <label>Số điện thoại:</label>
            <span>{data.phone || '-'}</span>
          </div>
          <div className="cddm-row">
            <label>Địa chỉ:</label>
            <span>{data.address || '-'}</span>
          </div>
          <div className="cddm-row">
            <label>Giới tính:</label>
            <span>{data.gender || '-'}</span>
          </div>
          <div className="cddm-row">
            <label>Ngày sinh:</label>
            <span>
              {data.dateOfBirth
                ? new Date(data.dateOfBirth).toLocaleDateString()
                : '-'}
            </span>
          </div>
          <div className="cddm-row">
            <label>Trạng thái:</label>
            <span
              className={`cddm-status ${
                data.status?.toLowerCase() === 'active' ? 'active' : 'inactive'
              }`}
            >
              {data.status === 'Active' ? 'Hoạt động' : 'Ngừng hoạt động'}
            </span>
          </div>
          <div className="cddm-row">
            <label>Chuyên môn:</label>
            <span>{data.specialty || '-'}</span>
          </div>
          <div className="cddm-row">
            <label>Số năm kinh nghiệm:</label>
            <span>{data.experienceYears ?? '-'}</span>
          </div>
          <div className="cddm-row">
            <label>Trình độ học vấn:</label>
            <span>{data.education || '-'}</span>
          </div>
          <div className="cddm-row">
            <label>Chứng chỉ:</label>
            <span>{data.certification || '-'}</span>
          </div>
          <div className="cddm-row">
            <label>Mô tả:</label>
            <span>{data.description || '-'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantDetailModal;
