import React from 'react';
import './ViewTestBookingModal.css';
import { FaVial } from 'react-icons/fa'; // icon xét nghiệm

const ViewTestBookingModal = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="vtb-modal-backdrop" onClick={onClose}>
      <div className="vtb-modal" onClick={(e) => e.stopPropagation()}>
        <div className="vtb-header">
          <FaVial className="vtb-icon" />
          <h3>Chi tiết lịch xét nghiệm</h3>
        </div>

        <div className="vtb-info">
          <div className="vtb-row">
            <span className="vtb-label">Mã lịch:</span>
            <span className="vtb-value">{booking.id}</span>
          </div>
          <div className="vtb-row">
            <span className="vtb-label">Ngày:</span>
            <span className="vtb-value">{new Date(booking.date).toLocaleDateString('vi-VN')}</span>
          </div>
          <div className="vtb-row">
            <span className="vtb-label">Gói:</span>
            <span className="vtb-value">{booking.package}</span>
          </div>
          <div className="vtb-row">
            <span className="vtb-label">Trạng thái:</span>
            <span className="vtb-value">{booking.status}</span>
          </div>
        </div>

        <button className="vtb-close-btn" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default ViewTestBookingModal;
