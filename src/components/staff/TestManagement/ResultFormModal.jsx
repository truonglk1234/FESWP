import React, { useState } from "react";
import "./ResultFormModal.css";
import axios from "axios";

// ✅ Hàm lấy token từ localStorage/sessionStorage
const getToken = () => {
  const stored = localStorage.getItem("user") || sessionStorage.getItem("user");
  try {
    return stored ? JSON.parse(stored).token : null;
  } catch {
    return null;
  }
};

const ResultFormModal = ({ booking, onClose }) => {
  const [result, setResult] = useState("");
  const [advice, setAdvice] = useState("");
  const [status, setStatus] = useState("Đã trả kết quả");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!result.trim()) {
      alert("⚠️ Vui lòng nhập kết quả xét nghiệm.");
      return;
    }

    const token = getToken();
    if (!token) {
      alert("⚠️ Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.");
      return;
    }

    setLoading(true);

    try {
      await axios.put(
        `http://localhost:8080/api/examinations/${booking.id}/result`,
        {
          result: result.trim(),
          advice: advice.trim(),
          status: status
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("✅ Trả kết quả thành công!");
      onClose();
    } catch (error) {
      console.error("❌ Lỗi khi trả kết quả:", error);
      alert("❌ Không thể trả kết quả. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rfm-backdrop">
      <div className="rfm-modal">
        <h2>Trả kết quả xét nghiệm</h2>
        <p>Dịch vụ: <strong>{booking.serviceName}</strong></p>

        <textarea
          rows="3"
          placeholder="Nhập kết quả..."
          value={result}
          onChange={(e) => setResult(e.target.value)}
        />
        <textarea
          rows="3"
          placeholder="Nhập lời khuyên (tuỳ chọn)..."
          value={advice}
          onChange={(e) => setAdvice(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Đã hoàn tất">Đã hoàn tất</option>
          <option value="Đã trả kết quả">Đã trả kết quả</option>
        </select>

        <div className="rfm-actions">
          <button className="tbt-btn green" onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu kết quả"}
          </button>
          <button className="tbt-btn red" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default ResultFormModal;
