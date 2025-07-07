import React, { useState } from 'react';
import './BookingModal.css';

const BookingModal = ({ service, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
    note: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: '',
    account: ''
  });

  const availableDates = [
    'Th 2, 07/07', 'Th 3, 08/07', 'Th 4, 09/07', 'Th 5, 10/07',
    'Th 6, 11/07', 'Th 7, 12/07', 'CN, 13/07',
    'Th 2, 14/07', 'Th 3, 15/07', 'Th 4, 16/07', 'Th 5, 17/07',
    'Th 6, 18/07', 'Th 7, 19/07', 'CN, 20/07'
  ];

  const availableTimes = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '13:30', '14:00', '14:30', '15:00',
    '15:30', '16:00', '16:30', '17:00'
  ];

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmBooking = () => {
    console.log('✅ Booking info:', {
      service: service,
      selectedDate,
      selectedTime,
      contactInfo
    });
    // Giả sử gọi API ở đây, sau đó chuyển sang thanh toán:
    setStep(5);
  };

  const handleCompletePayment = () => {
    console.log('✅ Payment info:', paymentInfo);
    alert('Thanh toán thành công!');
    onClose();
  };

  return (
    <div className="bm-modal-overlay">
      <div className="bm-modal-content">
        <h2>Đặt lịch dịch vụ y tế</h2>

        <div className="bm-modal-section">
          <h3>{service.title || service.name}</h3>
          <p>Giá: {service.price.toLocaleString()}đ</p>
          <p>Thời gian: 15 phút</p>
        </div>

        {step === 1 && (
          <>
            <h4>📅 Chọn ngày khám</h4>
            <div className="bm-options-grid">
              {availableDates.map((date, index) => (
                <button
                  key={index}
                  className={selectedDate === date ? 'bm-selected' : ''}
                  onClick={() => {
                    setSelectedDate(date);
                    setStep(2);
                  }}
                >
                  {date}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h4>⏰ Chọn giờ khám</h4>
            <div className="bm-options-grid">
              {availableTimes.map((time, index) => (
                <button
                  key={index}
                  className={selectedTime === time ? 'bm-selected' : ''}
                  onClick={() => {
                    setSelectedTime(time);
                    setStep(3);
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h4>👤 Thông tin liên hệ</h4>
            <div className="bm-form-group">
              <label>Họ và tên *</label>
              <input
                type="text"
                name="name"
                value={contactInfo.name}
                onChange={handleContactChange}
                placeholder="Nhập họ và tên đầy đủ"
              />
            </div>
            <div className="bm-form-group">
              <label>Số điện thoại *</label>
              <input
                type="text"
                name="phone"
                value={contactInfo.phone}
                onChange={handleContactChange}
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div className="bm-form-group">
              <label>Email (tuỳ chọn)</label>
              <input
                type="email"
                name="email"
                value={contactInfo.email}
                onChange={handleContactChange}
                placeholder="Nhập email nếu cần"
              />
            </div>
            <div className="bm-form-group">
              <label>Ghi chú thêm</label>
              <textarea
                name="note"
                value={contactInfo.note}
                onChange={handleContactChange}
                placeholder="Triệu chứng, câu hỏi hoặc yêu cầu đặc biệt..."
              />
            </div>

            <button
              className="bm-next-btn"
              onClick={() => setStep(4)}
              disabled={!contactInfo.name || !contactInfo.phone}
            >
              Tiếp tục
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <h4>✅ Xác nhận thông tin đặt lịch</h4>
            <div className="bm-confirm-box">
              <div>
                <strong>Dịch vụ:</strong> {service.title || service.name}<br />
                <strong>Giá:</strong> {service.price.toLocaleString()}đ<br />
                <strong>Thời gian:</strong> 15 phút
              </div>
              <div>
                <strong>Lịch hẹn:</strong><br />
                Ngày: {selectedDate}<br />
                Giờ: {selectedTime}
              </div>
              <div>
                <strong>Thông tin liên hệ:</strong><br />
                {contactInfo.name} | {contactInfo.phone} | {contactInfo.email}<br />
                {contactInfo.note}
              </div>
            </div>
            <div className="bm-confirm-actions">
              <button className="bm-cancel-btn" onClick={onClose}>Huỷ bỏ</button>
              <button className="bm-confirm-btn" onClick={handleConfirmBooking}>Xác nhận đặt lịch</button>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h4>💳 Thanh toán</h4>
            <div className="bm-form-group">
              <label>Phương thức thanh toán</label>
              <select
                name="method"
                value={paymentInfo.method}
                onChange={handlePaymentChange}
              >
                <option value="">-- Chọn phương thức --</option>
                <option value="momo">Ví MoMo</option>
                <option value="zalo">Ví ZaloPay</option>
                <option value="credit">Thẻ tín dụng</option>
              </select>
            </div>

            <div className="bm-form-group">
              <label>Số thẻ / Tài khoản ví</label>
              <input
                type="text"
                name="account"
                value={paymentInfo.account}
                onChange={handlePaymentChange}
                placeholder="Nhập số thẻ hoặc tài khoản ví"
              />
            </div>

            <button
              className="bm-confirm-btn"
              onClick={handleCompletePayment}
              disabled={!paymentInfo.method || !paymentInfo.account}
            >
              Hoàn tất thanh toán
            </button>
          </>
        )}

        <button className="bm-close-btn" onClick={onClose}>✖</button>
      </div>
    </div>
  );
};

export default BookingModal;
