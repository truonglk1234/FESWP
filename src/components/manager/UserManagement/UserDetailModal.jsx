import React, { useEffect } from 'react';
import './UserDetailModal.css';

const UserDetailModal = ({ user, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!user) return null;

  return (
    <div className="udm-overlay" onClick={onClose}>
      <div className="udm-content" onClick={(e) => e.stopPropagation()}>
        <button className="udm-close-btn" onClick={onClose}>✖</button>
        <h2>Chi tiết người dùng</h2>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Tên:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Điện thoại:</strong> {user.phone}</p>
        <p><strong>Ngày đăng ký:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</p>
        <p><strong>Trạng thái:</strong> {user.verifiedStatus || 'Chưa xác thực'}</p>
      </div>
    </div>
  );
};

export default UserDetailModal;
