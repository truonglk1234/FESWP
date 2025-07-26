import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './BookingPage.css';

const BookingPage = () => {
  const { id } = useParams(); // Lấy consultantId từ URL
  const navigate = useNavigate();
  const { user } = useAuth();

  const [consultant, setConsultant] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [manualTime, setManualTime] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch consultant info
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/public/consultants/${id}`)
      .then((res) => setConsultant(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // Fetch available slots khi chọn ngày
  useEffect(() => {
    if (!selectedDate) return;
    setLoading(true);
    axios
      .get(
        `http://localhost:8080/api/auth/schedules/consultant/${id}/availability?date=${selectedDate}`,
        { withCredentials: true }
      )
      .then((res) => setAvailableSlots(res.data))
      .catch(() => setError('Không thể tải lịch trống'))
      .finally(() => setLoading(false));
  }, [selectedDate, id]);

  const formatTime = (t) =>
    new Date(t).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });

  const formatPrice = (p) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

  const calculatePrice = () => {
    if (!consultant) return 0;
    return consultant.consultationFee || 0;
  };

  const handleConfirm = () => {
    if (!user) return alert('Vui lòng đăng nhập');
    if (!selectedDate) return setError('Vui lòng chọn ngày');
    if (!selectedSlot && !manualTime) return setError('Vui lòng chọn giờ');

    const bookingData = {
      consultantId: id,
      date: selectedDate,
      startTime: selectedSlot ? selectedSlot.startTime : manualTime,
      notes: customerNotes,
      fee: calculatePrice(),
    };

    console.log('Booking:', bookingData);
    alert('Đặt lịch thành công!');
    navigate(-1); // Quay lại trang trước
  };

  if (!consultant) return <p>Đang tải thông tin tư vấn viên...</p>;

  return (
    <div className="bp-page">
      <button className="bp-back" onClick={() => navigate(-1)}>← Quay lại</button>
      <h2>Đặt lịch tư vấn</h2>

      <div className="bp-info">
        <img
          src={consultant.avatarUrl || `https://ui-avatars.com/api/?name=${consultant.fullName}`}
          alt="avatar"
        />
        <div>
          <h4>{consultant.fullName}</h4>
          <p>{consultant.specialty}</p>
          <p className="bp-fee">{formatPrice(calculatePrice())}</p>
        </div>
      </div>

      <div className="bp-step">
        {/* Chọn ngày */}
        <h4><Calendar size={18} /> Chọn ngày</h4>
        <div className="bp-date-picker">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* Chọn giờ */}
        {selectedDate && (
          <>
            <h4><Clock size={18} /> Chọn giờ</h4>
            {loading ? (
              <p>Đang tải...</p>
            ) : (
              <>
                <div className="bp-slot-list">
                  {availableSlots.length === 0 ? (
                    <p>Không có lịch trống</p>
                  ) : (
                    availableSlots.map((slot, i) => (
                      <button
                        key={i}
                        disabled={!slot.available}
                        className={selectedSlot?.startTime === slot.startTime ? 'selected' : ''}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                      </button>
                    ))
                  )}
                </div>

                {/* Nhập giờ thủ công */}
                <div className="bp-manual-time">
                  <label>Hoặc nhập giờ thủ công:</label>
                  <input
                    type="time"
                    value={manualTime}
                    onChange={(e) => {
                      setManualTime(e.target.value);
                      setSelectedSlot(null);
                    }}
                  />
                </div>
              </>
            )}
          </>
        )}

        {/* Ghi chú */}
        <textarea
          placeholder="Ghi chú cho tư vấn viên..."
          value={customerNotes}
          onChange={(e) => setCustomerNotes(e.target.value)}
          className="bp-notes"
        />

        <div className="bp-actions">
          <button onClick={handleConfirm}>Xác nhận</button>
        </div>
        {error && <div className="bp-error">{error}</div>}
      </div>
    </div>
  );
};

export default BookingPage;
