import React, { useState } from 'react';
import { Calendar, Clock3, MapPin, Star, User, Phone, Briefcase, GraduationCap, Mail, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import BookingModal from './BookingModal';

const ConsultantCard = ({ consultant, viewMode }) => {
  const { user } = useAuth();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Nếu consultant null thì không render
  if (!consultant) return null;

  const getAvatarUrl = () => {
    return consultant?.avatarUrl?.trim()
      ? consultant.avatarUrl
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(consultant.fullName || 'User')}&background=667eea&color=fff`;
  };

  const handleBookingClick = () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    setIsBookingModalOpen(true);
  };

  return (
    <div className={`consultant-card ${viewMode}`}>
      <div className="card-top">
        <img
          src={getAvatarUrl()}
          alt={consultant.fullName || 'No name'}
          className="avatar"
        />
        <div className="badge-gender">
          {consultant.gender ? 'Nam' : 'Nữ'}
        </div>
      </div>

      <div className="card-body">
        <h3 className="doctor-name">{consultant.fullName || 'Chưa có tên'}</h3>

        {consultant.specialization && (
          <div className="info">
            <Briefcase size={14} /> {consultant.specialization}
          </div>
        )}

        {consultant.yearsOfExperience !== undefined && (
          <div className="info">
            <User size={14} /> {consultant.yearsOfExperience} năm kinh nghiệm
          </div>
        )}

        {consultant.email && (
          <div className="info">
            <Mail size={14} /> {consultant.email}
          </div>
        )}

        {consultant.phone && (
          <div className="info">
            <Phone size={14} /> {consultant.phone}
          </div>
        )}

        <div className="info">
          <Info size={14} /> {consultant.bio || 'Chưa có mô tả'}
        </div>
      </div>

      <div className="consultant-footer">
        <Link to={`/consultant/${consultant.userId}`} className="outline">
          Xem hồ sơ
        </Link>

        <button
          className="solid"
          onClick={handleBookingClick}
        >
          Đặt lịch
        </button>
      </div>

      {isBookingModalOpen && (
        <BookingModal
          consultant={consultant}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ConsultantCard;
