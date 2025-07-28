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
            <label>ID:</label>
            <span>{data.id}</span>
          </div>
          <div className="cddm-row">
            <label>Họ tên:</label>
            <span>{data.name}</span>
          </div>
          <div className="cddm-row">
            <label>Email:</label>
            <span>{data.email}</span>
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
            <label>Trạng thái:</label>
            <span
              className={`cddm-status ${data.active === false ? 'inactive' : 'active'}`}
            >
              {data.active === false ? 'Ngừng hoạt động' : 'Hoạt động'}
            </span>
          </div>
          <div className="cddm-row">
            <label>Ngày tạo:</label>
            <span>
              {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantDetailModal;
