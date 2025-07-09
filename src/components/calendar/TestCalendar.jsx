import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./TestCalendar.css";


const TestScheduleContent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // ✅ Dữ liệu DEMO tháng 7/2025 (ngày gần)
  const calendarEvents = [
    { id: 1, date: '2025-07-09', title: 'Xét nghiệm STI' },
    { id: 2, date: '2025-07-11', title: 'Xét nghiệm HIV' },
    { id: 3, date: '2025-07-20', title: 'Xét nghiệm máu' },
    { id: 4, date: '2025-07-21', title: 'Xét nghiệm nội tiết' },
    { id: 5, date: '2025-07-23', title: 'Xét nghiệm tổng quát' }
  ];

  const testBookings = [
    {
      date: '2025-07-09',
      package: 'Xét nghiệm STI',
      status: 'Chờ thanh toán',
      result: ''
    },
    {
      date: '2025-07-11',
      package: 'Xét nghiệm HIV',
      status: 'Đang xét nghiệm',
      result: ''
    },
    {
      date: '2025-07-20',
      package: 'Xét nghiệm máu',
      status: 'Hoàn tất',
      result: 'Âm tính'
    },
    {
      date: '2025-07-21',
      package: 'Xét nghiệm nội tiết',
      status: 'Đã hủy',
      result: '-'
    },
    {
      date: '2025-07-23',
      package: 'Xét nghiệm tổng quát',
      status: 'Đang xét nghiệm',
      result: ''
    }
  ];

  return (
    <section className="ts-schedule-wrapper">
      <h1 className="ts-schedule-title">Lịch xét nghiệm</h1>

      <div className="ts-calendar-wrapper">
        <Calendar
          locale="vi-VN"
          onChange={setSelectedDate}
          value={selectedDate}
          showNeighboringMonth={false}  // ✅ Ẩn ngày dư
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
        {testBookings.length === 0 && (
          <p className="ts-bookings-empty">Bạn chưa có lịch xét nghiệm nào.</p>
        )}
        {testBookings.length > 0 && (
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
                  <td>{tb.status}</td>
                  <td>{tb.result || '-'}</td>
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
