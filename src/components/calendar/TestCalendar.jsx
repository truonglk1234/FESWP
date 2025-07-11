import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './TestCalendar.css';
import axios from 'axios';

const TestScheduleContent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [testBookings, setTestBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/examinations/my-bookings', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = response.data || [];

        // 🟢 Dùng "Có lịch xét nghiệm" thay vì tên người dùng
        const events = data.map(item => ({
          id: item.id,
          date: item.appointmentDate.split('T')[0],
          title: 'Có lịch xét nghiệm'
        }));

        const bookings = data.map(item => ({
          date: item.appointmentDate.split('T')[0],
          package: item.serviceName || 'Gói xét nghiệm',
          status: item.status,
          result: item.result || '-'
        }));

        setCalendarEvents(events);
        setTestBookings(bookings);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi tải lịch xét nghiệm:', error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'chờ thanh toán': return 'status-pending';
      case 'đang xét nghiệm': return 'status-processing';
      case 'hoàn tất': return 'status-complete';
      case 'đã hủy': return 'status-cancelled';
      default: return '';
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

        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : testBookings.length === 0 ? (
          <p className="ts-bookings-empty">Bạn chưa có lịch xét nghiệm nào.</p>
        ) : (
          <table className="ts-bookings-table">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Gói xét nghiệm</th>
                <th>Trạng thái</th>
                <th>Kết quả</th>
              </tr>
            </thead>
            <tbody>
              {testBookings.map((tb, idx) => (
                <tr key={idx}>
                  <td>{tb.date}</td>
                  <td>{tb.package}</td>
                  <td>
                    <span className={`status-label ${getStatusClass(tb.status)}`}>
                      {tb.status}
                    </span>
                  </td>
                  <td>{tb.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default TestScheduleContent;
