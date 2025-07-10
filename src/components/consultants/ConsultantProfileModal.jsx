import React from 'react';
import './ConsultantProfileModal.css';

const ConsultantProfileModal = ({ consultant, onClose }) => {
  return (
    <div className="cpm-backdrop">
      <div className="cpm-modal">
        <button className="cpm-close" onClick={onClose}>×</button>

        <div className="cpm-avatar-wrapper">
          <img
            src={
              consultant.avatarUrl ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(consultant.fullName)}`
            }
            alt={consultant.fullName}
            className="cpm-avatar"
          />
        </div>

        <h2>{consultant.fullName}</h2>

        <p><strong>Chuyên ngành:</strong> {consultant.specialty}</p>
        <p><strong>Kinh nghiệm:</strong> {consultant.experienceYears} năm</p>
        <p><strong>Email:</strong> {consultant.email}</p>
        <p><strong>Phone:</strong> {consultant.phone}</p>
        <p>{consultant.description || "Không có mô tả chi tiết"}</p>
      </div>
    </div>
  );
};

export default ConsultantProfileModal;
