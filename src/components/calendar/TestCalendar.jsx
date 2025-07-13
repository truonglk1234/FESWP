import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './TestCalendar.css';
import axios from 'axios';
import ViewTestBookingModal from './ViewTestBookingModal';

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
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [submitted, setSubmitted] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

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

  const handleCancel = async (booking) => {
    if (!window.confirm("Bạn có chắc chắn muốn huỷ lịch này không?")) return;

    try {
      const token = getToken();
      await axios.delete(`http://localhost:8080/api/examinations/${booking.id}/cancel`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Đã huỷ lịch!");
      fetchBookings();
    } catch (err) {
      console.error("❌ Lỗi khi huỷ lịch:", err);
      alert("❌ Không thể huỷ.");
    }
  };

  const handleSubmitReview = async (bookingId) => {
    const rating = ratings[bookingId];
    const comment = comments[bookingId];
    if (!rating || !comment?.trim()) {
      alert("⚠️ Vui lòng chọn sao và nhập nhận xét.");
      return;
    }

    try {
      const token = getToken();
      await axios.post(`http://localhost:8080/api/feedbacks/${bookingId}`, {
        rating,
        comment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("✅ Gửi đánh giá thành công!");
      setSubmitted(prev => ({ ...prev, [bookingId]: true }));
    } catch (err) {
      if (err.response?.status === 400) {
        alert("⚠️ Bạn đã đánh giá lịch này rồi.");
      } else {
        alert("❌ Gửi đánh giá thất bại.");
      }
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
          formatShortWeekday={(locale, date) =>
            ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][date.getDay()]
          }
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
        <h2 className="tsc-bookings-title">Danh sách lịch đã đặt</h2>
        {testBookings.length === 0 ? (
          <p className="tsc-bookings-empty">Bạn chưa có lịch nào.</p>
        ) : (
          <table className="tsc-table">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Gói</th>
                <th>Trạng thái</th>
                <th>Đánh giá</th>
                <th>Hành động</th>
                <th>Nhận xét</th> {/* ✅ Moved to the end */}
              </tr>
            </thead>
            <tbody>
              {testBookings.map(tb => (
                <tr key={tb.id}>
                  <td>{new Date(tb.date).toLocaleDateString('vi-VN')}</td>
                  <td>{tb.package}</td>
                  <td>
                    <span className={`tsc-status-label ${getStatusClass(tb.status)}`}>{tb.status}</span>
                  </td>
                  <td>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        className="tsc-star"
                        style={{ color: (ratings[tb.id] || 0) >= star ? '#ffc107' : '#ccc' }}
                        onClick={() => !submitted[tb.id] && setRatings(prev => ({ ...prev, [tb.id]: star }))}
                      >
                        ★
                      </span>
                    ))}
                  </td>
                  <td>
                    <div className="tsc-actions">
                      <button className="tsc-view-btn" onClick={() => setViewingBooking(tb)}>Xem</button>
                      {!['hoàn tất', 'đã hoàn tất', 'đã huỷ'].includes(tb.status?.toLowerCase()) && (
                        <button className="tsc-cancel-btn" onClick={() => handleCancel(tb)}>Huỷ</button>
                      )}
                    </div>
                  </td>
                  <td>
                    <textarea
                      className="tsc-textarea"
                      rows="2"
                      placeholder="Nhận xét..."
                      disabled={submitted[tb.id]}
                      value={comments[tb.id] || ""}
                      onChange={e => setComments(prev => ({ ...prev, [tb.id]: e.target.value }))}
                    />
                    <button
                      className="tsc-submit-btn"
                      disabled={submitted[tb.id]}
                      onClick={() => handleSubmitReview(tb.id)}
                    >
                      Gửi đánh giá
                    </button>
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
    </section>
  );
};

export default TestScheduleContent;
