import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import "./ScheduleTablePage.css";
import axios from "axios";


const ScheduleTablePage = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;


  // Lấy token
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");


  // Gọi API lấy danh sách lịch hẹn
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/consultant/consultations/my-tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(res.data);
    } catch (error) {
      console.error("❌ Lỗi tải lịch hẹn:", error);
    }
  };


  useEffect(() => {
    fetchTasks();
  }, []);


  // Gọi API cập nhật trạng thái
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/api/consultant/consultations/${id}/status`,
        null,
        {
          params: { status: newStatus },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Cập nhật lại danh sách sau khi đổi trạng thái
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status: newStatus } : t
        )
      );
    } catch (error) {
      console.error("❌ Lỗi cập nhật trạng thái:", error);
    }
  };


  const totalPages = Math.ceil(tasks.length / pageSize);
  const paginatedTasks = tasks.slice((page - 1) * pageSize, page * pageSize);


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
              <td>{t.customerName || t.name}</td>
              <td>{t.serviceName}</td>
              <td>
                {t.serviceDate
                  ? new Date(t.serviceDate).toLocaleString("vi-VN")
                  : "Không có"}
              </td>
              <td>
                {t.phone}
                <br />
                {t.email}
              </td>
              <td>
                <span
                  className={`schedule-table-badge ${t.status === "Đã xác nhận"
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
                    onClick={() => updateStatus(t.id, "Đã xác nhận")}
                  >
                    Xác nhận
                  </button>
                  <button
                    className="schedule-table-btn-reject"
                    onClick={() => updateStatus(t.id, "Đã hủy")}
                  >
                    Từ chối
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};


export default ScheduleTablePage;