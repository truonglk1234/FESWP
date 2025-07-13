import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TestBookingTable.css";
import ResultFormModal from "./ResultFormModal";
import StatusChangeModal from "./StatusChangeModal";

const TestBookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // ✅ Lấy token từ localStorage hoặc sessionStorage
  const getToken = () => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser).token : null;
    } catch {
      return null;
    }
  };

  // ✅ Gọi API danh sách xét nghiệm của nhân viên
  useEffect(() => {
    const fetchBookings = async () => {
      const token = getToken();
      if (!token) {
        console.error("⚠️ Chưa đăng nhập");
        return;
      }

      try {
        const res = await axios.get("http://localhost:8080/api/examinations/staff/my-tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data || [];

        // Convert để dùng trong UI
        const mapped = data.map((item) => ({
          id: item.id,
          appointmentDate: item.appointmentDate,
          status: item.status,
          name: item.name,
          serviceName: item.serviceName,
        }));

        setBookings(mapped);
      } catch (err) {
        console.error("❌ Lỗi khi tải danh sách xét nghiệm:", err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="tbt-wrapper">
      <div className="tbt-header">
        <h2 className="tbt-title">Danh sách người dùng xét nghiệm</h2>
      </div>

      <table className="tbt-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ngày hẹn</th>
            <th>Trạng thái</th>
            <th>Người dùng</th>
            <th>Dịch vụ</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{new Date(b.appointmentDate).toLocaleDateString()}</td>
              <td>
                <span className={`tbt-badge status-${b.status.toLowerCase().replace(/\s/g, '-')}`}>
                  {b.status}
                </span>
              </td>
              <td>{b.name}</td>
              <td>{b.serviceName}</td>
              <td>
                <button
                  className="tbt-btn blue"
                  onClick={() => {
                    setSelectedBooking(b);
                    setShowStatusModal(true);
                  }}
                >
                  Xem chi tiết
                </button>

                {["Đang xét nghiệm", "Đã hoàn tất"].includes(b.status) && (
                  <button
                    className="tbt-btn green"
                    onClick={() => {
                      setSelectedBooking(b);
                      setShowResultModal(true);
                    }}
                  >
                    Trả kết quả
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showResultModal && selectedBooking && (
        <ResultFormModal
          booking={selectedBooking}
          onClose={() => setShowResultModal(false)}
        />
      )}

      {showStatusModal && selectedBooking && (
        <StatusChangeModal
          booking={selectedBooking}
          onClose={() => setShowStatusModal(false)}
          onStatusUpdated={(newStatus) => {
            setBookings((prev) =>
              prev.map((b) =>
                b.id === selectedBooking.id ? { ...b, status: newStatus } : b
              )
            );
            setShowStatusModal(false);
          }}
        />
      )}
    </div>
  );
};

export default TestBookingTable;
