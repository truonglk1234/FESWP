import React from 'react';
import './ViewTestBookingModal.css';

const ViewTestBookingModal = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="vtb-modal-backdrop" onClick={onClose}>
      <div className="vtb-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Chi tiết lịch xét nghiệm</h3>
        <div className="vtb-info">
          <p><strong>Mã lịch:</strong> {booking.id}</p>
          <p><strong>Ngày:</strong> {new Date(booking.date).toLocaleDateString('vi-VN')}</p>
          <p><strong>Gói:</strong> {booking.package}</p>
          <p><strong>Trạng thái:</strong> {booking.status}</p>
          <p><strong>Kết quả:</strong> {booking.result}</p>
        </div>
        <button className="vtb-close-btn" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default ViewTestBookingModal;
