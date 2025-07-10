import React, { useState } from 'react';
import { Mail, Phone, User, BadgeCheck, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ConsultantProfileModal from './ConsultantProfileModal';
import ConsultingBookingModal from './ConsultingBookingModal'; // ✅ NEW

const ConsultantCard = ({ doc }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showBooking, setShowBooking] = useState(false); // ✅ NEW

  const handleBooking = () => {
    if (!user) {
      navigate('/login');
    } else {
      setShowBooking(true);
    }
  };

  return (
    <>
      <div className="csc-card">
        <div className="csc-card-top">
          <img
            src={doc.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.fullName)}`}
            alt={doc.fullName}
            className="csc-avatar"
          />
          <span className={`csc-badge-gender ${doc.gender ? 'male' : 'female'}`}>
            {doc.gender ? 'Nam' : 'Nữ'}
          </span>
        </div>

        <div className="csc-card-body">
          <h3 className="csc-name">{doc.fullName}</h3>
          <div className="csc-info"><BadgeCheck size={16} /> {doc.specialty}</div>
          <div className="csc-info"><User size={16} /> {doc.experienceYears} năm kinh nghiệm</div>
          <div className="csc-info"><Mail size={16} /> {doc.email}</div>
          <div className="csc-info"><Phone size={16} /> {doc.phone}</div>
          <div className="csc-description">
            <Info size={16} /> {doc.description || "Chưa có mô tả"}
          </div>
        </div>

        <div className="csc-card-footer">
          <button className="csc-btn-solid" onClick={() => setShowProfile(true)}>
            Xem hồ sơ
          </button>
          <button className="csc-btn-outline" onClick={handleBooking}>
            Đặt lịch
          </button>
        </div>
      </div>

      {showProfile && (
        <ConsultantProfileModal consultant={doc} onClose={() => setShowProfile(false)} />
      )}

      {showBooking && (
        <ConsultingBookingModal consultant={doc} onClose={() => setShowBooking(false)} />
      )}
    </>
  );
};

export default ConsultantCard;
