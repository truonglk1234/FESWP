import React, { useState } from 'react'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ConsultCalendar.css';
import ViewConsultBookingModal from './ViewConsultBookingModal';

const ConsultCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewingBooking, setViewingBooking] = useState(null);

  const calendarEvents = [
    { id: 1, date: '2025-07-10', title: 'Tư vấn sức khỏe' },
    { id: 2, date: '2025-07-12', title: 'Tư vấn tâm lý' },
    { id: 3, date: '2025-07-15', title: 'Tư vấn dinh dưỡng' },
    { id: 4, date: '2025-07-20', title: 'Tư vấn tiền hôn nhân' },
    { id: 5, date: '2025-07-25', title: 'Tư vấn tổng quát' },
  ];

  const consultBookings = [
    {
      id: 1,
      date: '2025-07-10',
      package: 'Tư vấn sức khỏe',
      status: 'Đã xác nhận',
      consultant: 'Dr. Hạnh',
      time: '09:00',
      note: 'Trao đổi về dinh dưỡng'
    },
    {
      id: 2,
      date: '2025-07-12',
      package: 'Tư vấn tâm lý',
      status: 'Chờ xác nhận',
      consultant: 'Dr. Minh',
      time: '10:30',
      note: 'Stress công việc'
    },
    {
      id: 3,
      date: '2025-07-15',
      package: 'Tư vấn dinh dưỡng',
      status: 'Đã xác nhận',
      consultant: 'Dr. Hoa',
      time: '13:00',
      note: 'Ăn kiêng khoa học'
    },
    {
      id: 4,
      date: '2025-07-20',
      package: 'Tư vấn tiền hôn nhân',
      status: 'Đang xử lý',
      consultant: 'Dr. Thành',
      time: '15:30',
      note: 'Chuẩn bị kết hôn'
    },
    {
      id: 5,
      date: '2025-07-25',
      package: 'Tư vấn tổng quát',
      status: 'Hoàn tất',
      consultant: 'Dr. Lan',
      time: '17:00',
      note: ''
    }
  ];

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'chờ xác nhận': return 'status-pending';
      case 'đã xác nhận': return 'status-confirmed';
      case 'đang xử lý': return 'status-processing';
      case 'hoàn tất': return 'status-complete';
      default: return '';
    }
  };

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
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {consultBookings.map((cb, idx) => (
                <tr key={idx}>
                  <td>{cb.date}</td>
                  <td>{cb.package}</td>
                  <td><span className={`status-label ${getStatusClass(cb.status)}`}>{cb.status}</span></td>
                  <td>{cb.consultant}</td>
                  <td>
                    <div className="cs-actions">
                      <button className="cs-view-btn" onClick={() => setViewingBooking(cb)}>Xem</button>
                      {cb.status?.toLowerCase() === 'chờ xác nhận' && (
                        <button className="cs-cancel-btn" onClick={() => alert(`Huỷ lịch tư vấn: ${cb.id}`)}>Huỷ</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ViewConsultBookingModal
        booking={viewingBooking}
        onClose={() => setViewingBooking(null)}
      />
    </section>
  );
};

export default ConsultCalendar;
