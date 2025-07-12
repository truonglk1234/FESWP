import React from 'react';
import './ViewConsultBookingModal.css';

const ViewConsultBookingModal = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="cs-modal-backdrop" onClick={onClose}>
      <div className="cs-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Chi tiết lịch tư vấn</h3>
        <div className="cs-modal-info">
          <p><strong>Mã lịch:</strong> {booking.id}</p>
          <p><strong>Ngày:</strong> {new Date(booking.date).toLocaleDateString('vi-VN')}</p>
          <p><strong>Khung giờ:</strong> {booking.time || '-'}</p>
          <p><strong>Chuyên gia:</strong> {booking.consultant || '-'}</p>
          <p><strong>Ghi chú:</strong> {booking.note || '-'}</p>
          <p><strong>Trạng thái:</strong> {booking.status}</p>
        </div>
        <button className="cs-modal-close-btn" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default ViewConsultBookingModal;
