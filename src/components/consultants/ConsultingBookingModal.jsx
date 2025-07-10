import React, { useState } from 'react';
import './ConsultingBookingModal.css';

const ConsultingBookingModal = ({ consultant, onClose }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 👉 Gửi dữ liệu đặt lịch lên API ở đây
    console.log('Đặt lịch:', {
      consultantId: consultant.id,
      date,
      time,
      note,
    });
    alert('Đặt lịch thành công!');
    onClose();
  };

  return (
    <div className="cbm-backdrop">
      <div className="cbm-modal">
        <button className="cbm-close" onClick={onClose}>×</button>
        <h2>{consultant.fullName}</h2>

        <form onSubmit={handleSubmit} className="cbm-form">
          <label>Ngày hẹn:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

          <label>Giờ hẹn:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

          <label>Ghi chú:</label>
          <textarea
            placeholder="Ghi chú thêm (nếu có)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button type="submit" className="cbm-submit-btn">Xác nhận đặt lịch</button>
        </form>
      </div>
    </div>
  );
};

export default ConsultingBookingModal;
