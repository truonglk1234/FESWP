import React, { useState, useEffect } from 'react'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ConsultCalendar.css';
import ViewConsultBookingModal from './ViewConsultBookingModal';

const ConsultCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [viewingBooking, setViewingBooking] = useState(null);

  // Dữ liệu mẫu (mock data) - chỉ có 3 trạng thái
  const mockAppointments = [
    {
      id: 1,
      date: '2025-08-01',
      time: '08:00 - 09:00',
      packageName: 'Tư vấn sức khỏe tổng quát',
      status: 'Chờ xác nhận',
      consultantName: 'BS. Nguyễn Văn A'
    },
    {
      id: 2,
      date: '2025-08-02',
      time: '09:30 - 10:30',
      packageName: 'Tư vấn sức khỏe giới tính',
      status: 'Đã xác nhận',
      consultantName: 'BS. Trần Thị B'
    },
    {
      id: 3,
      date: '2025-08-02',
      time: '13:30 - 14:30',
      packageName: 'Tư vấn tâm lý',
      status: 'Từ chối',
      consultantName: 'ThS. Lê Văn C'
    },
    {
      id: 4,
      date: '2025-08-05',
      time: '15:00 - 16:00',
      packageName: 'Tư vấn sức khỏe sinh sản',
      status: 'Chờ xác nhận',
      consultantName: 'BS. Phạm Thị D'
    }
  ];

  // Load dữ liệu mẫu
  useEffect(() => {
    setAppointments(mockAppointments);
  }, []);

  // Dữ liệu sự kiện cho Calendar
  const calendarEvents = appointments.map(appt => ({
    id: appt.id,
    date: appt.date,
    title: appt.packageName || 'Tư vấn'
  }));

  // Chỉ xử lý 3 trạng thái
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'chờ xác nhận': return 'status-pending';
      case 'đã xác nhận': return 'status-confirmed';
      case 'từ chối': return 'status-rejected';
      default: return '';
    }
  };

  return (
    <section className="cs-schedule-wrapper">
      <h1 className="cs-schedule-title">Lịch tư vấn (Dữ liệu mẫu)</h1>

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
        {appointments.length === 0 && (
          <p className="cs-bookings-empty">Bạn chưa có lịch tư vấn nào.</p>
        )}
        {appointments.length > 0 && (
          <table className="cs-bookings-table">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Giờ</th>
                <th>Gói tư vấn</th>
                <th>Trạng thái</th>
                <th>Tư vấn viên</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((cb, idx) => (
                <tr key={idx}>
                  <td>{cb.date}</td>
                  <td>{cb.time}</td>
                  <td>{cb.packageName}</td>
                  <td>
                    <span className={`status-label ${getStatusClass(cb.status)}`}>
                      {cb.status}
                    </span>
                  </td>
                  <td>{cb.consultantName}</td>
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
