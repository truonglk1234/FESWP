import React, { useState } from "react";
import axios from "axios";
import "./StatusChangeModal.css";

const StatusChangeModal = ({ booking, onClose, onStatusUpdated }) => {
  const [newStatus, setNewStatus] = useState(booking.status);
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async () => {
    setLoading(true);
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:8080/api/staff/bookings/${booking.id}/status`,
        null, // không có body
        {
          params: { status: newStatus.trim() },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("✅ Trạng thái đã được cập nhật!");
      onStatusUpdated(newStatus);
      onClose();
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật trạng thái:", error);
      alert("⚠️ Lỗi khi cập nhật trạng thái!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scm-backdrop">
      <div className="scm-modal">
        <h2>Chi tiết lịch hẹn</h2>

        <p><strong>ID:</strong> {booking.id}</p>
        <p><strong>Dịch vụ:</strong> {booking.serviceName}</p>
        <p><strong>Ngày hẹn:</strong> {new Date(booking.appointmentDate).toLocaleDateString()}</p>
        <p><strong>Người đặt:</strong> {booking.name} ({booking.email})</p>

        <label htmlFor="status">Trạng thái mới:</label>
        <select
          id="status"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="Đã tiếp nhận">Đã tiếp nhận</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đang xét nghiệm">Đang xét nghiệm</option>
          <option value="Đã hoàn tất">Đã hoàn tất</option>
          <option value="Đã trả kết quả">Đã trả kết quả</option>
        </select>

        <div className="scm-actions">
          <button
            className="tbt-btn green"
            onClick={handleStatusUpdate}
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
          <button className="tbt-btn red" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default StatusChangeModal;
