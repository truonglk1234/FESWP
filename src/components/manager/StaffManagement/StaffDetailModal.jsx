import React, { useEffect } from 'react';
import './StaffDetailModal.css';
import { X } from 'lucide-react';

const StaffDetailModal = ({ staff, onClose }) => {
  // Đóng modal khi bấm phím ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!staff) return null;

  return (
    <div className="sdm-overlay" onClick={onClose}>
      <div className="sdm-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sdm-header">
          <h2>Chi tiết nhân viên</h2>
          <button className="sdm-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="sdm-body">
          <div className="sdm-row">
            <label>ID:</label>
            <span>{staff.id}</span>
          </div>
          <div className="sdm-row">
            <label>Họ tên:</label>
            <span>{staff.name}</span>
          </div>
          <div className="sdm-row">
            <label>Email:</label>
            <span>{staff.email}</span>
          </div>
          <div className="sdm-row">
            <label>Số điện thoại:</label>
            <span>{staff.phone || '-'}</span>
          </div>
          <div className="sdm-row">
            <label>Ngày tạo:</label>
            <span>
              {staff.createdAt
                ? new Date(staff.createdAt).toLocaleDateString()
                : '-'}
            </span>
          </div>
          <div className="sdm-row">
            <label>Trạng thái:</label>
            <span
              className={`sdm-status ${staff.active === false ? 'inactive' : 'active'}`}
            >
              {staff.active === false ? 'Ngừng hoạt động' : 'Hoạt động'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetailModal;
