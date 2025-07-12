import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Timer } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './BookingModal.css';

const BookingModal = ({ consultant, onClose, onConfirmPayment }) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [customerNotes, setCustomerNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getNextSevenDays = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return {
        date: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('vi-VN', {
          weekday: 'short',
          day: 'numeric',
          month: 'numeric'
        })
      };
    });
  };

  const [availableDates] = useState(getNextSevenDays());

  useEffect(() => {
    if (selectedDate) fetchAvailableSlots();
  }, [selectedDate]);

  const fetchAvailableSlots = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/auth/schedules/consultant/${consultant.id}/availability?date=${selectedDate}`,
        { withCredentials: true }
      );
      setAvailableSlots(res.data);
    } catch (err) {
      console.error(err);
      setError('Không thể tải lịch trống');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeStr) =>
    new Date(timeStr).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);

  const calculatePrice = () => {
    if (!selectedSlot || !selectedSlot.pricePerSession) return consultant.consultationFee || 0;
    const perMin = selectedSlot.pricePerSession / (selectedSlot.sessionDurationMinutes || 60);
    return perMin * selectedDuration;
  };

  const getEndTime = () => {
    if (!selectedSlot) return null;
    return new Date(new Date(selectedSlot.startTime).getTime() + selectedDuration * 60000);
  };

  const handleConfirmBooking = () => {
    if (!user) return alert('Vui lòng đăng nhập');
    if (!selectedDate || !selectedSlot) return setError('Vui lòng chọn ngày và giờ');

    const appointmentDetails = {
      date: selectedDate,
      slot: selectedSlot,
      duration: selectedDuration,
      endTime: getEndTime(),
      notes: customerNotes,
      fee: calculatePrice()
    };

    onConfirmPayment(appointmentDetails); // ✅ Gửi thông tin sang parent (ConsultantCard)
  };

  return (
    <div className="bm-overlay" onClick={onClose}>
      <div className="bm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="bm-header">
          <h3>Đặt lịch tư vấn</h3>
          <button onClick={onClose}><X size={22} /></button>
        </div>

        <div className="bm-body">
          <div className="bm-info">
            <img
              src={consultant.avatarUrl || `https://ui-avatars.com/api/?name=${consultant.fullName}`}
              alt="avatar"
            />
            <div>
              <h4>{consultant.fullName}</h4>
              <p>{consultant.specialty}</p>
              <p className="bm-fee">{formatPrice(calculatePrice())}</p>
            </div>
          </div>

          <div className="bm-step">
            <h4><Calendar size={18} /> Chọn ngày</h4>
            <div className="bm-date-list">
              {availableDates.map(day => (
                <button
                  key={day.date}
                  className={selectedDate === day.date ? 'selected' : ''}
                  onClick={() => setSelectedDate(day.date)}
                >
                  {day.display}
                </button>
              ))}
            </div>

            {selectedDate && (
              <>
                <h4><Clock size={18} /> Chọn giờ</h4>
                <div className="bm-slot-list">
                  {loading ? <p>Đang tải...</p> :
                    availableSlots.length === 0 ? <p>Không có lịch trống</p> :
                      availableSlots.map((slot, i) => (
                        <button
                          key={i}
                          disabled={!slot.available}
                          className={selectedSlot?.startTime === slot.startTime ? 'selected' : ''}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                        </button>
                      ))}
                </div>
              </>
            )}

            {selectedSlot?.availableDurations?.length > 1 && (
              <>
                <h4><Timer size={18} /> Thời lượng</h4>
                <div className="bm-duration-list">
                  {selectedSlot.availableDurations.map(dur => (
                    <button
                      key={dur}
                      className={selectedDuration === dur ? 'selected' : ''}
                      onClick={() => setSelectedDuration(dur)}
                    >
                      {dur} phút - {formatPrice((calculatePrice() / selectedDuration) * dur)}
                    </button>
                  ))}
                </div>
              </>
            )}

            <textarea
              placeholder="Ghi chú cho tư vấn viên..."
              value={customerNotes}
              onChange={e => setCustomerNotes(e.target.value)}
              className="bm-notes"
            />

            <div className="bm-actions">
              <button onClick={handleConfirmBooking}>Xác nhận</button>
            </div>
          </div>

          {error && <div className="bm-error">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
