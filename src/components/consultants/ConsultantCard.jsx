import React from 'react';
import { Mail, Phone, User, BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConsultantCard = ({ doc }) => {
  const navigate = useNavigate();

  return (
    <div className="csc-card">
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

      <div className="csc-card-body">
        <h3 className="csc-name">{doc.fullName}</h3>
        <div className="csc-info"><BadgeCheck size={14} /> {doc.specialty}</div>
        <div className="csc-info"><User size={14} /> {doc.experienceYears || 0} năm kinh nghiệm</div>
        <div className="csc-info"><Mail size={14} /> {doc.email}</div>
        <div className="csc-info"><Phone size={14} /> {doc.phone}</div>
      </div>

      <div className="csc-card-footer">
        {/* Chuyển sang trang hồ sơ */}
        <button
          className="csc-btn csc-btn-primary"
          onClick={() => navigate(`/consultants/${doc.id}`)}
        >
          Xem hồ sơ
        </button>
        {/* Chuyển sang trang đặt lịch */}
        <button
          className="csc-btn csc-btn-outline"
          onClick={() => navigate(`/consultants/${doc.id}/booking`)}
        >
          Đặt lịch
        </button>
      </div>
    </div>
  );
};

export default ConsultantCard;
