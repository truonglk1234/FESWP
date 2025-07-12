import React, { useState } from "react";
import "./TestScheduleSection.css";

const sampleAppointments = [
  {
    id: 1,
    appointmentDate: "2025-07-12",
    status: "Đã tiếp nhận",
    userName: "Nguyễn Văn A",
    serviceName: "Xét nghiệm HIV",
    result: "",
  },
  {
    id: 2,
    appointmentDate: "2025-07-13",
    status: "Đang xử lý",
    userName: "Trần Thị B",
    serviceName: "Xét nghiệm Giang mai",
    result: "",
  },
  {
    id: 3,
    appointmentDate: "2025-07-14",
    status: "Đang xét nghiệm",
    userName: "Lê Văn C",
    serviceName: "Xét nghiệm Chlamydia",
    result: "",
  },
  {
    id: 4,
    appointmentDate: "2025-07-15",
    status: "Đã hoàn tất",
    userName: "Phạm Thị D",
    serviceName: "Xét nghiệm HPV",
    result: "",
  },
  {
    id: 5,
    appointmentDate: "2025-07-16",
    status: "Đã trả kết quả",
    userName: "Hoàng Văn E",
    serviceName: "Xét nghiệm Lậu",
    result: "Âm tính",
  },
];

// ➕ thêm 10 dữ liệu giả
for (let i = 6; i <= 15; i++) {
  sampleAppointments.push({
    id: i,
    appointmentDate: `2025-07-${16 + i}`,
    status: ["Đã tiếp nhận", "Đang xử lý", "Đang xét nghiệm", "Đã hoàn tất", "Đã trả kết quả"][i % 5],
    userName: `Người dùng ${i}`,
    serviceName: `Xét nghiệm mẫu ${i}`,
    result: i % 5 === 4 ? "Dương tính" : "",
  });
}

const TestScheduleSection = () => {
  const [appointments, setAppointments] = useState(sampleAppointments);
  const [editingId, setEditingId] = useState(null);
  const [resultInput, setResultInput] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const pageCount = Math.ceil(appointments.length / perPage);
  const paginated = appointments.slice((page - 1) * perPage, page * perPage);

  const handleSaveResult = (id) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, result: resultInput, status: "Đã trả kết quả" } : a
    );
    setAppointments(updated);
    setEditingId(null);
    setResultInput("");
  };

  return (
    <div className="ts-container">
      <h2 className="ts-title">Lịch hẹn xét nghiệm</h2>
      <div className="ts-table-wrapper">
        <table className="ts-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ngày hẹn</th>
              <th>Trạng thái</th>
              <th>Người dùng</th>
              <th>Dịch vụ</th>
              <th>Kết quả</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((a) => (
              <tr key={a.id}>
                <td>ID: {a.id}</td>
                <td>{new Date(a.appointmentDate).toLocaleDateString()}</td>
                <td>
                  <span className={`ts-badge status-${a.status.toLowerCase().replace(/\s/g, '-')}`}>
                    {a.status}
                  </span>
                </td>
                <td>{a.userName}</td>
                <td><span className="ts-topic">{a.serviceName}</span></td>
                <td>
                  {editingId === a.id ? (
                    <textarea
                      rows={2}
                      value={resultInput}
                      onChange={(e) => setResultInput(e.target.value)}
                      placeholder="Nhập kết quả..."
                    />
                  ) : (
                    a.result || "Chưa có"
                  )}
                </td>
                <td>
                  {editingId === a.id ? (
                    <div className="ts-action-group">
                      <button className="ts-btn green" onClick={() => handleSaveResult(a.id)}>Lưu</button>
                      <button className="ts-btn red" onClick={() => setEditingId(null)}>Huỷ</button>
                    </div>
                  ) : (
                    <button
                      className="ts-btn blue"
                      onClick={() => {
                        setEditingId(a.id);
                        setResultInput(a.result || "");
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

        {/* === Pagination === */}
        <div className="ts-pagination">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹ Trước</button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i + 1}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(pageCount, p + 1))} disabled={page === pageCount}>Sau ›</button>
        </div>
      </div>
    </div>
  );
};

export default TestScheduleSection;
