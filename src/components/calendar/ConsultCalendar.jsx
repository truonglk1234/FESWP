import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ConsultCalendar.css';
import ViewConsultBookingModal from './ViewConsultBookingModal';
import axios from 'axios';

const ConsultCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [viewingBooking, setViewingBooking] = useState(null);

  // 🔑 Lấy token từ localStorage hoặc sessionStorage
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  // Gọi API BE
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/customer/consultations/my-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        // response.data = danh sách ConsultationServiceDTO
        const data = response.data.map(b => ({
          id: b.id,
          date: b.serviceDate.split('T')[0],
          time: new Date(b.serviceDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          packageName: b.serviceName,
          status: b.status,
          consultantName: b.consultantName
        }));
        setAppointments(data);
      } catch (error) {
        console.error("❌ Lỗi lấy dữ liệu lịch tư vấn:", error);
      }
    };

    if (token) {
      fetchBookings();
    }
  }, [token]);

  // Dữ liệu Calendar
  const calendarEvents = appointments.map(appt => ({
    id: appt.id,
    date: appt.date,
    title: appt.packageName || 'Tư vấn'
  }));

  // Style theo trạng thái
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
      <h1 className="cs-schedule-title">Lịch tư vấn của bạn</h1>

      {/* Calendar */}
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

      {/* Table danh sách */}
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