import React from 'react';
import { Mail, Phone, User, BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const ConsultantCard = ({ doc }) => {
  const navigate = useNavigate();

  return (
    <div className="csc-card">
      {/* Avatar + Giới tính */}
      <div className="csc-card-top">
        <img
          src={
            doc.avatarUrl ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.fullName)}&background=0D8ABC&color=fff`
          }
          alt={doc.fullName}
          className="csc-avatar"
        />
        <span className={`csc-badge-gender ${doc.gender ? 'male' : 'female'}`}>
          {doc.gender ? 'Nam' : 'Nữ'}
        </span>
      </div>

      {/* Thông tin chính */}
      <div className="csc-card-body">
        <h3 className="csc-name">{doc.fullName}</h3>
        <div className="csc-info">
          <BadgeCheck size={14} /> {doc.specialty || 'Chưa cập nhật'}
        </div>
        <div className="csc-info">
          <User size={14} /> {doc.experienceYears || 0} năm kinh nghiệm
        </div>
        <div className="csc-info">
          <Mail size={14} /> {doc.email}
        </div>
        <div className="csc-info">
          <Phone size={14} /> {doc.phone}
        </div>
      </div>

      {/* Footer */}
      <div className="csc-card-footer">
        <button
          className="csc-btn csc-btn-primary"
          onClick={() => navigate(`/consultants/${doc.userId || doc.id}`)}
        >
          Xem hồ sơ
        </button>
      </div>
    </div>
  );
};

export default ConsultantCard;
