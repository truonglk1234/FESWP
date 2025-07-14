import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './TestCalendar.css';
import axios from 'axios';
import ViewTestBookingModal from './ViewTestBookingModal';
import TestResultModal from './TestResultModal';
import { FaStar } from 'react-icons/fa';

const getToken = () => {
  const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
  try {
    return storedUser ? JSON.parse(storedUser).token : null;
  } catch {
    return null;
  }
};

const TestScheduleContent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [testBookings, setTestBookings] = useState([]);
  const [viewingBooking, setViewingBooking] = useState(null);
  const [viewingResult, setViewingResult] = useState(null);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [reviewedIds, setReviewedIds] = useState([]);

  useEffect(() => {
    fetchBookings();
    fetchReviewed();
  }, []);

  const fetchReviewed = async () => {
    try {
      const token = getToken();
      const res = await axios.get('http://localhost:8080/api/feedbacks/booking-ids', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviewedIds(res.data || []);
      const reviewedMap = {};
      (res.data || []).forEach(id => reviewedMap[id] = true);
      setSubmitted(reviewedMap);
    } catch (err) {
      console.error("Error loading reviewed IDs:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = getToken();
      if (!token) {
        alert("⚠️ Bạn chưa đăng nhập.");
        return;
      }

      const res = await axios.get('http://localhost:8080/api/examinations/my-bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = (res.data || []).filter(item =>
        item.status?.toLowerCase() !== 'chờ thanh toán'
      );

      const events = data.map(item => ({
        id: item.id,
        date: item.appointmentDate.split('T')[0],
        title: item.serviceName
      }));

      const bookings = data.map(item => ({
        id: item.id,
        date: item.appointmentDate.split('T')[0],
        package: item.serviceName,
        status: item.status
      }));

      setCalendarEvents(events);
      setTestBookings(bookings);
    } catch (err) {
      console.error("❌ Lỗi:", err);
      alert("Không thể tải lịch.");
    }
  };

  const handleSubmitReview = async (tb) => {
    const rating = ratings[tb.id];
    const comment = comments[tb.id];

    if (!rating || !comment?.trim()) {
      alert("⚠️ Vui lòng chọn sao và nhập nhận xét.");
      return;
    }

    try {
      const token = getToken();

      await axios.post('http://localhost:8080/api/feedbacks', {
        bookingId: tb.id,
        rating,
        comment
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('✅ Gửi đánh giá thành công!');
      setSubmitted(prev => ({ ...prev, [tb.id]: true }));
    } catch (err) {
      console.error("Feedback Error:", err);
      if (err.response?.status === 400) {
        alert('⚠️ Lịch này đã được đánh giá rồi hoặc thông tin sai.');
      } else {
        alert('❌ Gửi đánh giá thất bại.');
      }
    }
  };

  const handleViewResult = async (bookingId) => {
    try {
      const token = getToken();
      const res = await axios.get(`http://localhost:8080/api/customer/examinations/${bookingId}/result`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setViewingResult(res.data);
    } catch (err) {
      alert("❌ Không thể tải kết quả xét nghiệm.");
      console.error(err);
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'đã tiếp nhận': return 'tsc-status-received';
      case 'đang xử lý': return 'tsc-status-processing';
      case 'đang xét nghiệm': return 'tsc-status-testing';
      case 'đã hoàn tất': return 'tsc-status-complete';
      case 'đã trả kết quả': return 'tsc-status-resulted';
      case 'đã huỷ': return 'tsc-status-cancelled';
      default: return '';
    }
  };

  return (
    <section className="tsc-wrapper">
      <h1 className="tsc-title">Lịch xét nghiệm</h1>

      <div className="tsc-calendar">
        <Calendar
          locale="vi-VN"
          onChange={setSelectedDate}
          value={selectedDate}
          showNeighboringMonth={false}
          formatShortWeekday={(locale, date) => ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][date.getDay()]}
          tileContent={({ date, view }) => {
            if (view === 'month') {
              const dayStr = date.toLocaleDateString('sv-SE');
              const events = calendarEvents.filter(ev => ev.date === dayStr);
              return (
                <>
                  {events.map(ev => (
                    <div key={ev.id} className="tsc-calendar-label">{ev.title}</div>
                  ))}
                </>
              );
            }
          }}
        />
      </div>

      <div className="tsc-bookings">
        <h2 className="tsc-bookings-title">Danh sách đã đặt</h2>
        {testBookings.length === 0 ? (
          <p className="tsc-bookings-empty">Bạn chưa có lịch nào.</p>
        ) : (
          <table className="tsc-table">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Gói</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
                <th>Phản hồi</th>
              </tr>
            </thead>
            <tbody>
              {testBookings.map(tb => (
                <tr key={tb.id}>
                  <td>{new Date(tb.date).toLocaleDateString('vi-VN')}</td>
                  <td>{tb.package}</td>
                  <td>
                    <span className={`tsc-status-label ${getStatusClass(tb.status)}`}>
                      {tb.status}
                    </span>
                  </td>
                  <td>
                    <button className="tsc-view-btn" onClick={() => setViewingBooking(tb)}>Xem</button>
                    {tb.status?.toLowerCase() === 'đã trả kết quả' && (
                      <button className="tsc-result-btn" onClick={() => handleViewResult(tb.id)}>
                        Xem kết quả
                      </button>
                    )}
                  </td>
                  <td>
                    {tb.status?.toLowerCase() === 'đã trả kết quả' ? (
                      submitted[tb.id] ? (
                        <span className="tsc-feedback-sent">
                          Đã gửi đánh giá {'⭐'.repeat(ratings[tb.id] || 5)}
                        </span>
                      ) : (
                        <div className="tsc-feedback-form">
                          <div className="tsc-stars">
                            {[1, 2, 3, 4, 5].map(star => (
                              <FaStar
                                key={star}
                                className="tsc-star-icon"
                                color={(ratings[tb.id] || 0) >= star ? '#ffc107' : '#ccc'}
                                onClick={() => setRatings(prev => ({ ...prev, [tb.id]: star }))}
                              />
                            ))}
                          </div>
                          <textarea
                            className="tsc-textarea"
                            placeholder="Nhận xét..."
                            value={comments[tb.id] || ''}
                            onChange={e => setComments(prev => ({ ...prev, [tb.id]: e.target.value }))}
                          />
                          <button
                            className="tsc-submit-btn"
                            onClick={() => handleSubmitReview(tb)}
                          >
                            Gửi đánh giá
                          </button>
                        </div>
                      )
                    ) : (
                      <span className="tsc-feedback-warn">⚠️ Chưa thể đánh giá</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ViewTestBookingModal
        booking={viewingBooking}
        onClose={() => setViewingBooking(null)}
      />

      <TestResultModal
        result={viewingResult}
        onClose={() => setViewingResult(null)}
      />
    </section>
  );
};

export default TestScheduleContent;
