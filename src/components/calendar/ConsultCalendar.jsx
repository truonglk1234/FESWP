import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ConsultCalendar.css'; // 👉 CSS riêng với prefix cs-

const ConsultCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const calendarEvents = [
    { id: 1, date: '2025-07-10', title: 'Tư vấn sức khỏe' },
    { id: 2, date: '2025-07-12', title: 'Tư vấn tâm lý' },
    { id: 3, date: '2025-07-15', title: 'Tư vấn dinh dưỡng' },
    { id: 4, date: '2025-07-20', title: 'Tư vấn tiền hôn nhân' },
    { id: 5, date: '2025-07-25', title: 'Tư vấn tổng quát' },
  ];

  const consultBookings = [
    {
      date: '2025-07-10',
      package: 'Tư vấn sức khỏe',
      status: 'Đã xác nhận',
      consultant: 'Dr. Hạnh'
    },
    {
      date: '2025-07-12',
      package: 'Tư vấn tâm lý',
      status: 'Chờ xác nhận',
      consultant: 'Dr. Minh'
    },
    {
      date: '2025-07-15',
      package: 'Tư vấn dinh dưỡng',
      status: 'Đã xác nhận',
      consultant: 'Dr. Hoa'
    },
    {
      date: '2025-07-20',
      package: 'Tư vấn tiền hôn nhân',
      status: 'Đang xử lý',
      consultant: 'Dr. Thành'
    },
    {
      date: '2025-07-25',
      package: 'Tư vấn tổng quát',
      status: 'Hoàn tất',
      consultant: 'Dr. Lan'
    }
  ];

  return (
    <section className="cs-schedule-wrapper">
      <h1 className="cs-schedule-title">Lịch tư vấn</h1>

      <div className="cs-calendar-wrapper">
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
                    <div key={ev.id} className="cs-calendar-event-label">{ev.title}</div>
                  ))}
                </>
              );
            }
          }}
        />
      </div>

      <div className="cs-bookings-wrapper">
        <h2 className="cs-bookings-title">Danh sách lịch tư vấn đã đặt</h2>
        {consultBookings.length === 0 && (
          <p className="cs-bookings-empty">Bạn chưa có lịch tư vấn nào.</p>
        )}
        {consultBookings.length > 0 && (
          <table className="cs-bookings-table">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Gói tư vấn</th>
                <th>Trạng thái</th>
                <th>Tư vấn viên</th>
              </tr>
            </thead>
            <tbody>
              {consultBookings.map((cb, idx) => (
                <tr key={idx}>
                  <td>{cb.date}</td>
                  <td>{cb.package}</td>
                  <td>{cb.status}</td>
                  <td>{cb.consultant}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default ConsultCalendar;
