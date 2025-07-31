import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import './ConsultingBookingModal.css';


const ConsultingBookingModal = ({ service, onClose }) => {
  // 🔑 Lấy user & token ngay đầu component (giống TestBookingModal)
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");


  // State quản lý
  const [step, setStep] = useState(0); // 0: Chọn tư vấn viên
  const [monthOffset, setMonthOffset] = useState(0);
  const [dateOffset, setDateOffset] = useState(0);


  const [consultants, setConsultants] = useState([]);
  const [selectedConsultant, setSelectedConsultant] = useState(null);


  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [contactInfo, setContactInfo] = useState({
    name: currentUser.name || '',
    phone: '',
    email: currentUser.email || '',
    note: ''
  });


  // 1️⃣ Lấy danh sách tư vấn viên từ API
  useEffect(() => {
<<<<<<< Updated upstream
    const fetchConsultants = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/customer/consultations/consultants");
        const list = (response.data || []).map(c => ({
          id: c.id,
          name: c.consultantName || c.name || "Không rõ tên"
        }));
        setConsultants(list);
      } catch (error) {
        console.error("❌ Lỗi lấy danh sách tư vấn viên:", error);
      }
    };
    fetchConsultants();
  }, []);
=======
  const fetchConsultants = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/public/consultants-view");
      // Lấy userId và fullName từ API trả về
      const list = (response.data || []).map(c => ({
        id: c.userId,
        name: c.fullName || "Không rõ tên"
      }));
      setConsultants(list);
    } catch (error) {
      console.error("❌ Lỗi lấy danh sách tư vấn viên:", error);
    }
  };
  fetchConsultants();
}, []);
>>>>>>> Stashed changes


  // 2️⃣ Tạo danh sách ngày trong tháng (giống TestBookingModal)
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + monthOffset;
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();


    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      const dayOfWeek = date.getDay();
      const dayLabel = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'][dayOfWeek];
      const dd = String(i).padStart(2, '0');
      const mm = String(month + 1).padStart(2, '0');
      dates.push(`${dayLabel}, ${dd}/${mm}`);
    }
    return dates;
  }, [monthOffset]);


  const paginatedDates = availableDates.slice(dateOffset, dateOffset + 15);


  const availableTimes = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];


  // Xử lý thay đổi thông tin liên hệ
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };


  // 3️⃣ Gửi booking & thanh toán
  const handleConfirmBooking = async () => {
    try {
      if (!token) {
        alert("⚠️ Vui lòng đăng nhập để tiếp tục.");
window.location.href = "/login";
        return;
      }


      // Convert ngày giờ sang ISO
      const [_, dateString] = selectedDate.split(', ');
      const [day, month] = dateString.split('/').map(Number);
      const [hour, minute] = selectedTime.split(':').map(Number);
      const pad = (n) => n.toString().padStart(2, '0');
      const serviceDate = `2025-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00`;


      const bookingPayload = {
        serviceId: service.id,
        consultantId: selectedConsultant?.id,
        serviceDate,
        name: contactInfo.name,
        phone: contactInfo.phone,
        email: contactInfo.email,
        note: contactInfo.note
      };


      // API đặt lịch
      const bookingRes = await axios.post(
        "http://localhost:8080/api/customer/consultations/book",
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


      // API thanh toán
      const paymentRes = await axios.post(
        `http://localhost:8080/api/v1/consultation-payment/create?consultationServiceId=${booking.id}`,
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
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/login";
        return;
      }
      console.error("❌ Lỗi khi đặt lịch:", error);
      alert("Đặt lịch thất bại: " + (error.response?.data?.message || error.message));
    }
  };


  return (
    <div className="cbm-modal-overlay">
      <div className="cbm-modal-content">
        <button className="cbm-close-btn" onClick={onClose}>✖</button>
        <h2>Đặt lịch TƯ VẤN</h2>


        <div className="cbm-modal-section">
          <h3>{service.title || service.name}</h3>
          <p>Giá: {service.price?.toLocaleString()}đ</p>
          <p>Thời gian: 30 phút</p>
        </div>


        {/* --- Bước 0: Chọn tư vấn viên --- */}
        {step === 0 && (
          <>
            <h4>👨‍⚕️ Chọn tư vấn viên</h4>
            <div className="cbm-form-group">
              <select
                value={selectedConsultant?.id || ""}
                onChange={(e) => {
                  const consultant = consultants.find(c => c.id === parseInt(e.target.value));
                  if (consultant) {
                    setSelectedConsultant(consultant);
                    setStep(1);
                  }
                }}
              >
<option value="" hidden>-- Chọn tư vấn viên --</option>
                {consultants.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </>
        )}


        {/* --- Bước 1: Chọn ngày --- */}
        {step === 1 && (
          <>
            <h4>📅 Chọn ngày tư vấn</h4>
            <div className="cbm-month-navigation">
              <button onClick={() => setMonthOffset(prev => prev - 1)} disabled={monthOffset <= 0}>◀ Tháng trước</button>
              <span>Tháng {new Date().getMonth() + 1 + monthOffset}</span>
              <button onClick={() => setMonthOffset(prev => prev + 1)}>Tháng sau ▶</button>
            </div>


            <div className="cbm-date-pagination">
              <button onClick={() => setDateOffset(o => Math.max(o - 14, 0))}>⬅ Ngày trước</button>
              <button onClick={() => setDateOffset(o => o + 14)}>Ngày sau ➡</button>
            </div>


            <div className="cbm-options-grid">
              {paginatedDates.map((date, index) => (
                <button
                  key={index}
                  className={selectedDate === date ? 'cbm-selected' : ''}
                  onClick={() => { setSelectedDate(date); setStep(2); }}
                >
                  {date}
                </button>
              ))}
            </div>
          </>
        )}


        {/* --- Bước 2: Chọn giờ --- */}
        {step === 2 && (
          <>
            <h4>⏰ Chọn giờ tư vấn</h4>
            <div className="cbm-options-grid">
              {availableTimes.map((time, index) => (
                <button
                  key={index}
                  className={selectedTime === time ? 'cbm-selected' : ''}
                  onClick={() => { setSelectedTime(time); setStep(3); }}
                >
                  {time}
                </button>
              ))}
            </div>
          </>
        )}


        {/* --- Bước 3: Nhập thông tin liên hệ --- */}
        {step === 3 && (
          <>
            <h4>👤 Thông tin liên hệ</h4>
            <div className="cbm-form-group">
              <label>Họ và tên *</label>
              <input type="text" name="name" value={contactInfo.name} onChange={handleContactChange} />
            </div>
            <div className="cbm-form-group">
              <label>Số điện thoại *</label>
              <input type="text" name="phone" value={contactInfo.phone} onChange={handleContactChange} />
            </div>
            <div className="cbm-form-group">
              <label>Email</label>
              <input type="email" name="email" value={contactInfo.email} onChange={handleContactChange} />
            </div>
            <div className="cbm-form-group">
              <label>Ghi chú</label>
<textarea name="note" value={contactInfo.note} onChange={handleContactChange} />
            </div>
            <button
              className="cbm-next-btn"
              onClick={() => setStep(4)}
              disabled={!contactInfo.name || !contactInfo.phone}
            >
              Tiếp tục
            </button>
          </>
        )}


        {/* --- Bước 4: Xác nhận --- */}
        {step === 4 && (
          <>
            <h4>✅ Xác nhận thông tin</h4>
            <div className="cbm-confirm-box">
              <p><strong>Dịch vụ:</strong> {service.title || service.name}</p>
              <p><strong>Giá:</strong> {service.price?.toLocaleString()}đ</p>
              <p><strong>Tư vấn viên:</strong> {selectedConsultant?.name}</p>
              <p><strong>Ngày:</strong> {selectedDate}</p>
              <p><strong>Giờ:</strong> {selectedTime}</p>
              <p><strong>Họ tên:</strong> {contactInfo.name}</p>
              <p><strong>Điện thoại:</strong> {contactInfo.phone}</p>
              <p><strong>Email:</strong> {contactInfo.email}</p>
              <p><strong>Ghi chú:</strong> {contactInfo.note}</p>
            </div>
            <div className="cbm-confirm-actions">
              <button className="cbm-cancel-btn" onClick={onClose}>Huỷ</button>
              <button className="cbm-confirm-btn" onClick={handleConfirmBooking}>Xác nhận</button>
            </div>
          </>
        )}


        {/* --- Bước 5: Thanh toán --- */}
        {step === 5 && (
          <>
            <h4>💳 Đang chuyển sang thanh toán</h4>
            <p>Vui lòng chờ trong giây lát để thanh toán bằng QR VNPay...</p>
          </>
        )}
      </div>
    </div>
  );
};


export default ConsultingBookingModal;