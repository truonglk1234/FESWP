import React, { useState } from 'react';
import { Mail, Phone, User, BadgeCheck } from 'lucide-react';
import BookingModal from './BookingModal';
import PaymentModal from './PaymentModal';
import ConsultantProfileModal from './ConsultantProfileModal';

const ConsultantCard = ({ doc }) => {
  const [showBooking, setShowBooking] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null); // ✅ Thêm state mới

  const handleOpenBooking = () => {
    setShowBooking(true);
  };

  const handleCloseBooking = () => {
    setShowBooking(false);
  };

  const handleBookingConfirmed = (details) => {
    setAppointmentDetails(details);           // ✅ Lưu thông tin đặt lịch
    setShowBooking(false);
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  return (
    <div className="csc-card">
      <div className="csc-card-top">
        <img
          src={doc.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.fullName)}&background=0D8ABC&color=fff`}
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
        <button className="csc-btn csc-btn-primary" onClick={() => setShowProfile(true)}>
          Xem hồ sơ
        </button>
        <button className="csc-btn csc-btn-outline" onClick={handleOpenBooking}>
          Đặt lịch
        </button>
      </div>

      {showBooking && (
        <BookingModal
          consultant={doc}
          onClose={handleCloseBooking}
          onConfirmPayment={handleBookingConfirmed} // ✅ Nhận appointmentDetails từ BookingModal
        />
      )}

      {showPayment && appointmentDetails && (
        <PaymentModal
          consultant={doc}
          appointmentDetails={appointmentDetails} // ✅ Truyền thông tin đặt lịch
          onClose={handleClosePayment}
          onBack={() => {
            setShowPayment(false);
            setShowBooking(true);
          }}
        />
      )}

      {showProfile && (
        <ConsultantProfileModal
          consultantId={doc.id}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
};

export default ConsultantCard;
