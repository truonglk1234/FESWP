import React, { useState, useEffect } from "react";
import Pagination from "./Pagination"; 
import "./ScheduleTablePage.css";

const ScheduleSetupPage = () => {
  // Dữ liệu mẫu
  const mockTasks = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    customerName: `Khách hàng ${i + 1}`,
    status: i % 3 === 0 ? "Đã xác nhận" : i % 3 === 1 ? "Đã hủy" : "Chờ xác nhận",
    serviceName: "Khám tư vấn sức khoẻ",
    serviceDate: `2025-08-${(i % 30) + 1}T08:00:00`,
    phone: "0912345678",
    email: "khach@example.com",
    note: "",
    servicePrice: 300000 + i * 10000,
  }));

  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setTasks(mockTasks);
  }, []);

  const totalPages = Math.ceil(tasks.length / pageSize);
  const paginatedTasks = tasks.slice((page - 1) * pageSize, page * pageSize);

  // Xác nhận
  const handleConfirm = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "Đã xác nhận" } : t
      )
    );
  };

  // Từ chối
  const handleReject = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "Đã hủy" } : t
      )
    );
  };

  return (
    <div className="schedule-table-wrapper">
      <h2 className="schedule-table-title">📅 Lịch hẹn của bạn</h2>

      <table className="schedule-table">
        <thead>
          <tr>
            <th>Khách hàng</th>
            <th>Dịch vụ</th>
            <th>Ngày hẹn</th>
            <th>Liên hệ</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTasks.map((t) => (
            <tr key={t.id}>
              <td>{t.customerName}</td>
              <td>{t.serviceName}</td>
              <td>{new Date(t.serviceDate).toLocaleString("vi-VN")}</td>
              <td>
                {t.phone}
                <br />
                {t.email}
              </td>
              <td>
                <span
                  className={`schedule-table-badge ${
                    t.status === "Đã xác nhận"
                      ? "schedule-table-badge-confirmed"
                      : t.status === "Đã hủy"
                      ? "schedule-table-badge-rejected"
                      : "schedule-table-badge-pending"
                  }`}
                >
                  {t.status}
                </span>
              </td>
              <td>
                <div className="schedule-table-actions">
                  <button
                    className="schedule-table-btn-confirm"
                    onClick={() => handleConfirm(t.id)}
                  >
                    Xác nhận
                  </button>
                  <button
                    className="schedule-table-btn-reject"
                    onClick={() => handleReject(t.id)}
                  >
                    Từ chối
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Component phân trang */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default ScheduleSetupPage;
