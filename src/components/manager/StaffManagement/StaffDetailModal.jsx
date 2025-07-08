import React, { useEffect } from 'react';
import './StaffDetailModal.css';

const StaffDetailModal = ({ staff, onClose }) => {
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
      <div className="sdm-content" onClick={(e) => e.stopPropagation()}>
        <button className="sdm-close-btn" onClick={onClose}>
          ✖
        </button>
        <h2>Thông tin nhân viên</h2>
        <p><strong>ID:</strong> {staff.id}</p>
        <p><strong>Họ tên:</strong> {staff.name}</p>
        <p><strong>Email:</strong> {staff.email}</p>
        <p><strong>Số điện thoại:</strong> {staff.phone}</p>
        <p><strong>Ngày tạo:</strong> {staff.createdAt ? new Date(staff.createdAt).toLocaleDateString() : '-'}</p>
        <p>
          <strong>Trạng thái:</strong>{' '}
          {staff.active === false ? 'Ngừng hoạt động' : 'Hoạt động'}
        </p>
      </div>
    </div>
  );
};

export default StaffDetailModal;
