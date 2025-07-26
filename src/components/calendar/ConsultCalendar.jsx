import React, { useState, useEffect } from 'react'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ConsultCalendar.css';
import ViewConsultBookingModal from './ViewConsultBookingModal';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // lấy user hiện tại

const ConsultCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [viewingBooking, setViewingBooking] = useState(null);
  const { user } = useAuth(); // user hiện tại (phải có consultantId)

  // Lấy dữ liệu từ API
  useEffect(() => {
    if (!user || !user.id) return;

    axios.get(`http://localhost:8080/api/auth/consultant/${user.id}`, {
      withCredentials: true
    })
    .then(res => {
      setAppointments(res.data); // dữ liệu lịch hẹn từ DB
    })
    .catch(err => console.error('Lỗi load lịch hẹn:', err));
  }, [user]);

  // Nhóm event theo ngày để hiện trên Calendar
  const calendarEvents = appointments.map(appt => ({
    id: appt.id,
    date: appt.date, // format yyyy-MM-dd từ backend
    title: appt.packageName || 'Tư vấn'
  }));

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
        {appointments.length === 0 && (
          <p className="cs-bookings-empty">Bạn chưa có lịch tư vấn nào.</p>
        )}
        {appointments.length > 0 && (
          <table className="cs-bookings-table">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Gói tư vấn</th>
                <th>Trạng thái</th>
                <th>Khách hàng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((cb, idx) => (
                <tr key={idx}>
                  <td>{cb.date}</td>
                  <td>{cb.packageName}</td>
                  <td>
                    <span className={`status-label ${getStatusClass(cb.status)}`}>
                      {cb.status}
                    </span>
                  </td>
                  <td>{cb.customerName}</td>
                  <td>
                    <div className="cs-actions">
                      <button className="cs-view-btn" onClick={() => setViewingBooking(cb)}>Xem</button>
                      {cb.status?.toLowerCase() === 'chờ xác nhận' && (
                        <button
                          className="cs-cancel-btn"
                          onClick={() => alert(`Huỷ lịch tư vấn: ${cb.id}`)}
                        >
                          Huỷ
                        </button>
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
