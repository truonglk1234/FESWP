import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './TestCalendar.css';
import axios from 'axios';
import ViewTestBookingModal from './ViewTestBookingModal';

// ✅ Hàm lấy token an toàn
const getToken = () => {
  const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
  try {
    return storedUser ? JSON.parse(storedUser).token : null;
  } catch (e) {
    return null;
  }
};

const TestScheduleContent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [testBookings, setTestBookings] = useState([]);
  const [viewingBooking, setViewingBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = getToken();
      if (!token) {
        alert("⚠️ Bạn chưa đăng nhập. Vui lòng đăng nhập để xem lịch.");
        return;
      }

      const response = await axios.get('http://localhost:8080/api/examinations/my-bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = response.data || [];

      const events = data.map(item => ({
        id: item.id,
        date: item.appointmentDate.split('T')[0],
        title: item.serviceName || 'Có lịch xét nghiệm'
      }));

      const bookings = data.map(item => ({
        id: item.id,
        date: item.appointmentDate.split('T')[0],
        package: item.serviceName || 'Gói xét nghiệm',
        status: item.status,
        result: item.result || '-'
      }));

      setCalendarEvents(events);
      setTestBookings(bookings);
    } catch (error) {
      console.error("❌ Lỗi khi tải lịch xét nghiệm:", error);
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'chờ thanh toán': return 'status-pending';
      case 'đang xét nghiệm': return 'status-processing';
      case 'hoàn tất': return 'status-complete';
      case 'đã hủy': return 'status-cancelled';
      default: return '';
    }
  };

  const handleView = (booking) => {
    setViewingBooking(booking);
  };

  const handleCancel = async (booking) => {
    if (!window.confirm("Bạn có chắc chắn muốn huỷ lịch xét nghiệm này không?")) return;

    try {
      const token = getToken();
      await axios.delete(`http://localhost:8080/api/examinations/${booking.id}/cancel`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("✅ Hủy lịch thành công!");
      fetchBookings();
    } catch (error) {
      console.error("❌ Lỗi khi hủy lịch:", error);
      alert("Không thể hủy lịch. Vui lòng thử lại.");
    }
  };

  return (
    <section className="ts-schedule-wrapper">
      <h1 className="ts-schedule-title">Lịch xét nghiệm</h1>

      <div className="ts-calendar-wrapper">
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
              const dayStr = date.toISOString().split('T')[0];
              const events = calendarEvents.filter(ev => ev.date === dayStr);
              return (
                <>
                  {events.map(ev => (
                    <div key={ev.id} className="ts-calendar-event-label">{ev.title}</div>
                  ))}
                </>
              );
            }
          }}
        />
      </div>

      <div className="ts-bookings-wrapper">
        <h2 className="ts-bookings-title">Danh sách lịch xét nghiệm đã đặt</h2>
        {testBookings.length === 0 ? (
          <p className="ts-bookings-empty">Bạn chưa có lịch xét nghiệm nào.</p>
        ) : (
          <table className="ts-bookings-table">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Gói xét nghiệm</th>
                <th>Trạng thái</th>
                <th>Kết quả</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {testBookings.map((tb, idx) => (
                <tr key={idx}>
                  <td>{new Date(tb.date).toLocaleDateString('vi-VN')}</td>
                  <td>{tb.package}</td>
                  <td><span className={`status-label ${getStatusClass(tb.status)}`}>{tb.status}</span></td>
                  <td>{tb.result}</td>
                  <td>
                    <div className="ts-actions">
                      <button className="view-btn" onClick={() => handleView(tb)}>Xem</button>

                      {tb.status?.toLowerCase() === 'chờ thanh toán' && (
                        <button className="cancel-btn" onClick={() => handleCancel(tb)}>Huỷ</button>
                      )}

                      {tb.status?.toLowerCase() === 'hoàn tất' && tb.result !== '-' && (
                        <button className="review-btn" onClick={() => alert('👉 Chuyển sang form đánh giá')}>Đánh giá</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ✅ Modal xem chi tiết */}
      <ViewTestBookingModal
        booking={viewingBooking}
        onClose={() => setViewingBooking(null)}
      />
    </section>
  );
};

export default TestScheduleContent;
