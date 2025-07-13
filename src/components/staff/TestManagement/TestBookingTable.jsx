import React, { useEffect, useState } from "react";
import "./TestBookingTable.css";
import ResultFormModal from "./ResultFormModal";
import StatusChangeModal from "./StatusChangeModal";

const TestBookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        appointmentDate: "2025-07-10",
        status: "Đã tiếp nhận",
        name: "Nguyễn Văn A",
        serviceName: "Xét nghiệm máu"
      },
      {
        id: 2,
        appointmentDate: "2025-07-11",
        status: "Đang xét nghiệm",
        name: "Trần Thị B",
        serviceName: "Xét nghiệm nước tiểu"
      },
      {
        id: 3,
        appointmentDate: "2025-07-12",
        status: "Đã hoàn tất",
        name: "Lê Văn C",
        serviceName: "Xét nghiệm Covid-19"
      },
      {
        id: 4,
        appointmentDate: "2025-07-13",
        status: "Đã trả kết quả",
        name: "Phạm Thị D",
        serviceName: "Xét nghiệm HIV"
      }
    ];
    setBookings(mockData);
  }, []);

  const fetchNewBookings = () => {
    const newBooking = {
      id: bookings.length + 1,
      appointmentDate: "2025-07-14",
      status: "Đã tiếp nhận",
      name: "Ngô Thị E",
      serviceName: "Xét nghiệm viêm gan B"
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  return (
    <div className="tbt-wrapper">
      <div className="tbt-header">
        <h2 className="tbt-title">Xét nghiệm</h2>
        <button className="tbt-receive-button" onClick={fetchNewBookings}>
          Nhận xét nghiệm mới
        </button>
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
