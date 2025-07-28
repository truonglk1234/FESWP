import React, { useEffect } from 'react';
import './UserDetailModal.css';
import { X } from 'lucide-react';

const UserDetailModal = ({ user, onClose }) => {
  // Đóng modal bằng phím ESC
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
      <div className="udm-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="udm-header">
          <h2>Chi tiết người dùng</h2>
          <button className="udm-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="udm-body">
          <div className="udm-row">
            <label>ID:</label>
            <span>{user.id}</span>
          </div>
          <div className="udm-row">
            <label>Tên:</label>
            <span>{user.name}</span>
          </div>
          <div className="udm-row">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          <div className="udm-row">
            <label>Điện thoại:</label>
            <span>{user.phone || '-'}</span>
          </div>
          <div className="udm-row">
            <label>Ngày đăng ký:</label>
            <span>
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : '-'}
            </span>
          </div>
          <div className="udm-row">
            <label>Trạng thái:</label>
            <span
              className={`udm-status ${
                user.verifiedStatus === 'Đã xác thực' ? 'active' : 'inactive'
              }`}
            >
              {user.verifiedStatus || 'Chưa xác thực'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
