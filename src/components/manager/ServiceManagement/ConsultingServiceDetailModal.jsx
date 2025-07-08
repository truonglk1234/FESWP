import { useEffect, useState } from "react";
import axios from "axios";
import "./ConsultingServiceDetailModal.css";
import { FaCheckCircle, FaBan } from "react-icons/fa";

const formatCurrency = (number) =>
  number ? number.toLocaleString("vi-VN") + " VNĐ" : "-";

const ConsultingServiceDetailModal = ({ id, onClose, onStatusUpdate }) => {
  const [service, setService] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  // ✅ ESC để đóng modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // ✅ Lấy chi tiết dịch vụ
  useEffect(() => {
    if (!id || !token) return;

    setLoading(true);
    axios
      .get(`http://localhost:8080/api/prices/detail/${id}`, {
        params: { type: "advice" },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setService(res.data))
      .catch(() => setService(null))
      .finally(() => setLoading(false));
  }, [id, token]);

  // ✅ Lấy danh mục
  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:8080/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, [token]);

  const getCategoryName = (id) => {
    if (!id) return "-";
    const found = categories.find((cat) => cat.id === id);
    return found ? found.name : "-";
  };

  const handleChangeStatus = async (newStatus) => {
    setStatusLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:8080/api/prices/${service.id}/status`,
        null,
        {
          params: { status: newStatus },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setService(res.data);
      if (onStatusUpdate) onStatusUpdate(); // ✅ GỌI LẠI DANH SÁCH
    } catch (err) {
      alert("Không thể cập nhật trạng thái!");
    }
    setStatusLoading(false);
  };

  if (!id) return null;

  return (
    <div className="csdm-overlay" onClick={onClose}>
      <div className="csdm-content" onClick={(e) => e.stopPropagation()}>
        <button className="csdm-close-btn" onClick={onClose}>
          ✖
        </button>

        {loading ? (
          <div>⏳ Đang tải...</div>
        ) : !service ? (
          <div>❌ Không tìm thấy dịch vụ.</div>
        ) : (
          <>
            <h2>{service.name}</h2>
            <p><strong>ID:</strong> {service.id}</p>
            <p>
              <strong>Danh mục:</strong>{" "}
              <span className="csdm-badge">
                {service.categoryName || getCategoryName(service.categoryId)}
              </span>
            </p>
            <p><strong>Giá:</strong> {formatCurrency(service.price)}</p>

            <div className="csdm-status-row">
              <strong>Trạng thái:</strong>{" "}
              {service.status === "Active" ? (
                <span className="csdm-status-badge active">● Active</span>
              ) : (
                <span className="csdm-status-badge inactive">● Inactive</span>
              )}

              <button
                className="csdm-status-btn green"
                disabled={statusLoading || service.status === "Active"}
                onClick={() => handleChangeStatus("Active")}
              >
                <FaCheckCircle style={{ fontSize: 16 }} /> Kích hoạt
              </button>

              <button
                className="csdm-status-btn red"
                disabled={statusLoading || service.status === "Inactive"}
                onClick={() => handleChangeStatus("Inactive")}
              >
                <FaBan style={{ fontSize: 16 }} /> Ngừng áp dụng
              </button>
            </div>

            <p>
              <strong>Mô tả:</strong>{" "}
              <span>{service.description || "—"}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ConsultingServiceDetailModal;
