import React, { useState, useEffect, useContext } from 'react';
import { X, Calendar, Clock, User, CreditCard, Smartphone, Timer } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PaymentModal from './PaymentModal';
import axios from 'axios';
import './BookingModal.css';

const BookingModal = ({ consultant, onClose }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1); // 1: Select Date/Time, 2: Confirm Details, 3: Payment
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [customerNotes, setCustomerNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get next 7 days for date selection
  const getNextSevenDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('vi-VN', {
          weekday: 'short',
          day: 'numeric',
          month: 'numeric'
        })
      });
    }
    return days;
  };

  const [availableDates] = useState(getNextSevenDays());

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/auth/schedules/consultant/${consultant.id}/availability?date=${selectedDate}`,
        { withCredentials: true }
      );
      setAvailableSlots(response.data);
    } catch (err) {
      console.error('Error fetching available slots:', err);
      setError('Không thể tải lịch trống');
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setSelectedDuration(60);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    // Set default duration to the first available option
    if (slot.availableDurations && slot.availableDurations.length > 0) {
      setSelectedDuration(slot.availableDurations[0]);
    } else {
      setSelectedDuration(slot.sessionDurationMinutes || 60);
    }
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  const handleConfirmBooking = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để đặt lịch');
      return;
    }

    if (!selectedDate || !selectedSlot) {
      setError('Vui lòng chọn ngày và giờ');
      return;
    }

    setStep(3); // Move to payment step
  };

  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const calculatePrice = () => {
    if (!selectedSlot || !selectedSlot.pricePerSession) {
      return consultant.consultationFee || 0;
    }

    // Calculate price based on duration
    const baseDuration = selectedSlot.sessionDurationMinutes || 60;
    const basePrice = selectedSlot.pricePerSession;
    const pricePerMinute = basePrice / baseDuration;

    return pricePerMinute * selectedDuration;
  };

  const getEndTime = () => {
    if (!selectedSlot) return null;
    const startTime = new Date(selectedSlot.startTime);
    const endTime = new Date(startTime.getTime() + selectedDuration * 60000);
    return endTime;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Đặt lịch tư vấn</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {/* Consultant Info */}
          <div className="consultant-info">
            <img
              src={consultant.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(consultant.fullName)}&background=667eea&color=fff`}
              alt={consultant.fullName}
              className="consultant-avatar"
            />
            <div className="consultant-details">
              <h4>{consultant.fullName}</h4>
              <p>{consultant.specialization}</p>
              <p className="consultation-fee">
                Phí tư vấn: {formatPrice(calculatePrice())}
              </p>
            </div>
          </div>

          {/* Step 1: Date and Time Selection */}
          {step === 1 && (
            <div className="booking-step">
              <h4><Calendar size={20} /> Chọn ngày</h4>
              <div className="date-selector">
                {availableDates.map((day) => (
                  <button
                    key={day.date}
                    className={`date-option ${selectedDate === day.date ? 'selected' : ''}`}
                    onClick={() => handleDateSelect(day.date)}
                  >
                    {day.display}
                  </button>
                ))}
              </div>

              {selectedDate && (
                <>
                  <h4><Clock size={20} /> Chọn giờ</h4>
                  {loading ? (
                    <div className="loading">Đang tải...</div>
                  ) : availableSlots.length === 0 ? (
                    <div className="no-slots">
                      Không có lịch trống cho ngày này
                    </div>
                  ) : (
                    <div className="time-slots">
                      {availableSlots.map((slot, index) => (
                        <button
                          key={index}
                          className={`time-slot ${!slot.available ? 'disabled' : ''} ${selectedSlot === slot ? 'selected' : ''}`}
                          disabled={!slot.available}
                          onClick={() => handleSlotSelect(slot)}
                        >
                          <div className="slot-time">
                            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                          </div>
                          {slot.pricePerSession && (
                            <div className="slot-price">
                              {formatPrice(slot.pricePerSession)}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {selectedSlot && selectedSlot.availableDurations && selectedSlot.availableDurations.length > 1 && (
                <>
                  <h4><Timer size={20} /> Chọn thời gian tư vấn</h4>
                  <div className="duration-selector">
                    {selectedSlot.availableDurations.map((duration) => (
                      <button
                        key={duration}
                        className={`duration-option ${selectedDuration === duration ? 'selected' : ''}`}
                        onClick={() => handleDurationChange(duration)}
                      >
                        {duration} phút
                        <div className="duration-price">
                          {formatPrice(calculatePrice())}
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {selectedSlot && (
                <div className="next-step">
                  <button
                    className="continue-btn"
                    onClick={() => setStep(2)}
                  >
                    Tiếp tục
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Confirm Details */}
          {step === 2 && (
            <div className="booking-step">
              <h4>Xác nhận thông tin</h4>

              <div className="booking-summary">
                <div className="summary-item">
                  <strong>Ngày:</strong> {new Date(selectedDate).toLocaleDateString('vi-VN')}
                </div>
                <div className="summary-item">
                  <strong>Giờ:</strong> {formatTime(selectedSlot.startTime)} - {formatTime(getEndTime())}
                </div>
                <div className="summary-item">
                  <strong>Thời gian:</strong> {selectedDuration} phút
                </div>
                <div className="summary-item">
                  <strong>Tư vấn viên:</strong> {consultant.fullName}
                </div>
                <div className="summary-item">
                  <strong>Phí tư vấn:</strong> {formatPrice(calculatePrice())}
                </div>
              </div>

              <div className="notes-section">
                <label htmlFor="customerNotes">Ghi chú (tùy chọn):</label>
                <textarea
                  id="customerNotes"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Mô tả vấn đề cần tư vấn hoặc yêu cầu đặc biệt..."
                  rows="4"
                />
              </div>

              <div className="step-actions">
                <button
                  className="back-btn"
                  onClick={() => setStep(1)}
                >
                  Quay lại
                </button>
                <button
                  className="confirm-btn"
                  onClick={handleConfirmBooking}
                >
                  Xác nhận đặt lịch
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <PaymentModal
              consultant={consultant}
              appointmentDetails={{
                date: selectedDate,
                slot: selectedSlot,
                duration: selectedDuration,
                endTime: getEndTime(),
                notes: customerNotes,
                fee: calculatePrice()
              }}
              onClose={onClose}
              onBack={() => setStep(2)}
            />
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;