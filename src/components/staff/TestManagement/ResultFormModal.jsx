import React, { useState } from "react";
import "./ResultFormModal.css";

const ResultFormModal = ({ booking, onClose }) => {
  const [result, setResult] = useState("");
  const [advice, setAdvice] = useState("");
  const [status, setStatus] = useState("Đã trả kết quả");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      console.log("🔍 Kết quả:", result);
      console.log("💡 Lời khuyên:", advice);
      console.log("📌 Trạng thái mới:", status);

      alert("✨ (DEMO) Trả kết quả thành công!");
      onClose();
      setLoading(false);
    }, 1000); // mô phỏng delay API
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
