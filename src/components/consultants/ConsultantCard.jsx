import React, { useState } from 'react';
import { Mail, Phone, User, BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BookingModal from './BookingModal';
import './ConsultantCard.css';

const ConsultantCard = ({ doc, viewMode }) => {
  const navigate = useNavigate();
  const [showBooking, setShowBooking] = useState(false);

  const handleViewProfile = () => {
    navigate(`/consultants/${doc.id}`);
  };

  const handleBooking = () => {
    setShowBooking(true);
  };

  return (
    <div className={`consultant-card ${viewMode}`}>
      <div className="card-top">
        <img
          src={
            doc.avatarUrl ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.fullName)}`
          }
          alt={doc.fullName}
          className="avatar"
        />
        <div className="badge-gender">{doc.gender ? 'Nam' : 'Nữ'}</div>
      </div>

      <div className="card-body">
        <h3 className="doctor-name">{doc.fullName}</h3>
        <div className="info">
          <BadgeCheck size={14} /> {doc.specialty}
        </div>
        <div className="info">
          <User size={14} /> {doc.experienceYears || 0} năm kinh nghiệm
        </div>
        <div className="info">
          <Mail size={14} /> {doc.email}
        </div>
        <div className="info">
          <Phone size={14} /> {doc.phone}
        </div>
      </div>

      <div className="consultant-footer">
        <button className="solid" onClick={handleViewProfile}>
          Xem hồ sơ
        </button>
        <button className="outline" onClick={handleBooking}>
          Đặt lịch
        </button>
      </div>

      {showBooking && (
        <BookingModal
          consultant={doc}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  );
};

export default ConsultantCard;
