import React, { useState, useMemo } from 'react';
import axios from 'axios';
import './TestBookingModal.css';

const TestBookingModal = ({ service, onClose }) => {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const [step, setStep] = useState(1);
  const [monthOffset, setMonthOffset] = useState(0);
  const [dayStartIndex, setDayStartIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [contactInfo, setContactInfo] = useState({
    name: currentUser.name || '',
    phone: '',
    email: currentUser.email || '',
    note: ''
  });

  const allDatesInMonth = useMemo(() => {
    const today = new Date();
    const baseYear = today.getFullYear();
    const baseMonth = today.getMonth() + monthOffset;
    const lastDay = new Date(baseYear, baseMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const dates = [];
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(baseYear, baseMonth, i);
      const dayOfWeek = date.getDay();
      const weekDayLabel = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'][dayOfWeek];
      const dd = String(i).padStart(2, '0');
      const mm = String(baseMonth + 1).padStart(2, '0');
      dates.push(`${weekDayLabel}, ${dd}/${mm}`);
    }
    return dates;
  }, [monthOffset]);

  const paginatedDates = useMemo(() => {
    return allDatesInMonth.slice(dayStartIndex, dayStartIndex + 15);
  }, [allDatesInMonth, dayStartIndex]);

  const availableTimes = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '13:30', '14:00', '14:30', '15:00',
    '15:30', '16:00', '16:30', '17:00'
  ];

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmBooking = async () => {
    try {
      if (!token) {
        alert("⚠️ Vui lòng đăng nhập để tiếp tục.");
        window.location.href = "/login";
        return;
      }

      const [_, dateString] = selectedDate.split(', ');
      const [day, month] = dateString.split('/').map(Number);
      const [hour, minute] = selectedTime.split(':').map(Number);
      const pad = (n) => n.toString().padStart(2, '0');
      const appointmentDate = `2025-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00`;

      const bookingPayload = {
        serviceId: service.id,
        appointmentDate,
        name: contactInfo.name,
        phone: contactInfo.phone,
        email: contactInfo.email,
        note: contactInfo.note
      };

      const bookingRes = await axios.post(
        "http://localhost:8080/api/examinations/book",
        bookingPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      const booking = bookingRes.data;
      setStep(5);

      const paymentRes = await axios.post(
  `http://localhost:8080/api/v1/examinationPayment/create-payment?bookingId=${booking.id}`,
  null,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

      const paymentUrl = paymentRes.data;
      setTimeout(() => {
        window.location.href = paymentUrl;
      }, 1000);

    } catch (error) {
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.location.href = "/login";
        return;
      }
      console.error("❌ Lỗi khi đặt lịch:", error);
      alert("Đặt lịch thất bại: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="bm-modal-overlay">
      <div className="bm-modal-content">
        <button className="bm-close-btn" onClick={onClose}>✖</button>
        <h2>Đặt lịch dịch vụ y tế</h2>

        <div className="bm-modal-section">
          <h3>{service.title || service.name}</h3>
          <p>Giá: {service.price.toLocaleString()}đ</p>
          <p>Thời gian: 15 phút</p>
        </div>

        {step === 1 && (
          <>
            <h4>📅 Chọn ngày khám</h4>

            <div className="bm-month-navigation">
              <button onClick={() => { setMonthOffset(prev => prev - 1); setDayStartIndex(0); }} disabled={monthOffset <= 0}>◀ Tháng trước</button>
              <span>Tháng {new Date().getMonth() + 1 + monthOffset}</span>
              <button onClick={() => { setMonthOffset(prev => prev + 1); setDayStartIndex(0); }}>Tháng sau ▶</button>
            </div>

            <div className="bm-date-pagination">
              <button
                onClick={() => setDayStartIndex((prev) => Math.max(0, prev - 14))}
                disabled={dayStartIndex === 0}
              >⬅ Ngày trước</button>
              <button
                onClick={() => setDayStartIndex((prev) =>
                  prev + 14 >= allDatesInMonth.length ? prev : prev + 14
                )}
                disabled={dayStartIndex + 14 >= allDatesInMonth.length}
              >Ngày sau ➡</button>
            </div>

            <div className="bm-options-grid">
              {paginatedDates.map((date, index) => (
                <button key={index}
                        className={selectedDate === date ? 'bm-selected' : ''}
                        onClick={() => {
                          setSelectedDate(date);
                          setStep(2);
                        }}>
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
                <button key={index}
                        className={selectedTime === time ? 'bm-selected' : ''}
                        onClick={() => {
                          setSelectedTime(time);
                          setStep(3);
                        }}>
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
              <input type="text" name="name" value={contactInfo.name} onChange={handleContactChange} />
            </div>
            <div className="bm-form-group">
              <label>Số điện thoại *</label>
              <input type="text" name="phone" value={contactInfo.phone} onChange={handleContactChange} />
            </div>
            <div className="bm-form-group">
              <label>Email</label>
              <input type="email" name="email" value={contactInfo.email} onChange={handleContactChange} />
            </div>
            <div className="bm-form-group">
              <label>Ghi chú</label>
              <textarea name="note" value={contactInfo.note} onChange={handleContactChange} />
            </div>
            <button className="bm-next-btn"
                    onClick={() => setStep(4)}
                    disabled={!contactInfo.name || !contactInfo.phone}>
              Tiếp tục
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <h4>✅ Xác nhận thông tin</h4>
            <div className="bm-confirm-box">
              <p><strong>Dịch vụ:</strong> {service.title || service.name}</p>
              <p><strong>Giá:</strong> {service.price.toLocaleString()}đ</p>
              <p><strong>Ngày:</strong> {selectedDate}</p>
              <p><strong>Giờ:</strong> {selectedTime}</p>
              <p><strong>Họ tên:</strong> {contactInfo.name}</p>
              <p><strong>Điện thoại:</strong> {contactInfo.phone}</p>
              <p><strong>Email:</strong> {contactInfo.email}</p>
              <p><strong>Ghi chú:</strong> {contactInfo.note}</p>
            </div>
            <div className="bm-confirm-actions">
              <button className="bm-cancel-btn" onClick={onClose}>Huỷ</button>
              <button className="bm-confirm-btn" onClick={handleConfirmBooking}>Xác nhận</button>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h4>💳 Đang chuyển sang VNPay</h4>
            <p>Vui lòng chờ giây lát để thanh toán...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default TestBookingModal;