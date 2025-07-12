import { useEffect, useState } from "react";
import axios from "axios";
import "./TestingServiceManage.css";
import TestingServiceDetailModal from "./TestingServiceDetailModal";
import AddTestingServiceModal from "./AddTestingServiceModal";

const TestingServiceManage = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const itemsPerPage = 3;

  // 🔒 HÀM LẤY TOKEN AN TOÀN
  const getToken = () => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser).token : null;
    } catch (e) {
      return null;
    }
  };

  const fetchServices = () => {
    const token = getToken();
    if (!token) {
      console.warn("❌ Token không tồn tại. Vui lòng đăng nhập.");
      return;
    }

    axios
      .get("http://localhost:8080/api/prices", {
        params: { type: "test" },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("✅ Danh sách dịch vụ:", res.data);
        setServices(res.data);
      })
      .catch((err) => {
        console.error("❌ Lỗi khi gọi API /prices:", err);
      });
  };

  const fetchCategories = () => {
    const token = getToken();
    if (!token) return;

    axios
      .get("http://localhost:8080/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("❌ Lỗi khi gọi API /categories:", err));
  };

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  const getCategoryName = (id) => {
    const found = categories.find((cat) => cat.id === id);
    return found ? found.name : "-";
  };

  const totalPages = Math.ceil(services.length / itemsPerPage);
  const visibleServices = services.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const formatCurrency = (number) =>
    typeof number === "number"
      ? number.toLocaleString("vi-VN") + " VNĐ"
      : "-";

  const handleView = (service) => {
    setSelectedId(service.id);
  };

  const getStatusBadge = (status) => {
    if (!status) return <span className="status-badge gray">-</span>;
    let lower = status.toLowerCase();
    let color = "gray";
    if (lower === "active" || lower === "đang áp dụng") color = "green";
    else if (lower === "inactive" || lower === "ngừng áp dụng") color = "red";
    else if (lower === "pending" || lower === "chờ duyệt") color = "yellow";
    return <span className={`status-badge ${color}`}>{status}</span>;
  };

  return (
    <div className="tsm-container">
      <div className="tsm-header">
        <h1 className="tsm-title">Quản lý dịch vụ xét nghiệm</h1>
        <p className="tsm-subtitle">
          Quản lý danh sách dịch vụ, giá tư vấn và trạng thái áp dụng
        </p>
        <button className="tsm-add-btn" onClick={() => setShowAddModal(true)}>
          Thêm dịch vụ mới
        </button>
      </div>

      <div className="tsm-table-container">
        <h2>Danh sách dịch vụ xét nghiệm ({services.length})</h2>
        {services.length === 0 ? (
          <p>📭 Không có dịch vụ nào được tìm thấy.</p>
        ) : (
          <table className="tsm-table">
            <thead>
              <tr>
                <th>DỊCH VỤ</th>
                <th>DANH MỤC</th>
                <th>GIÁ</th>
                <th>MÔ TẢ</th>
                <th>TRẠNG THÁI</th>
                <th>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {visibleServices.map((service, idx) => (
                <tr key={service.id || idx}>
                  <td>
                    <strong>{service.name}</strong>
                    <div className="tsm-meta">ID: {service.id}</div>
                  </td>
                  <td>
                    <span className="tsm-badge gray">
                      {getCategoryName(service.categoryId)}
                    </span>
                  </td>
                  <td>{formatCurrency(service.price)}</td>
                  <td className="tsm-description">
                    <span className="tsm-tooltip">
                      {service.description || "—"}
                      <span className="tsm-tooltip-text">
                        {service.description || "—"}
                      </span>
                    </span>
                  </td>
                  <td>{getStatusBadge(service.status)}</td>
                  <td>
                    <div className="tsm-actions">
                      <button
                        className="tsm-view-btn"
                        onClick={() => handleView(service)}
                      >
                        Xem
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="tsm-pagination">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              ‹ Trước
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={page === idx + 1 ? "active" : ""}
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Sau ›
            </button>
          </div>
        )}
      </div>

      {/* ✅ Modal xem chi tiết */}
      {selectedId && (
        <TestingServiceDetailModal
          id={selectedId}
          onClose={() => setSelectedId(null)}
          onStatusUpdate={fetchServices}
        />
      )}

      {/* ✅ Modal thêm mới */}
      {showAddModal && (
        <AddTestingServiceModal
          onClose={() => setShowAddModal(false)}
          onAdded={fetchServices}
        />
      )}
    </div>
  );
};

export default TestingServiceManage;
