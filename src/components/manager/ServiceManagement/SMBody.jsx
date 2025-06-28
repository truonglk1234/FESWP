import { useEffect, useState } from "react";
import axios from "axios";
import "./SMBody.css";

const SMBody = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const token = localStorage.getItem("token");

  // Lấy danh sách dịch vụ xét nghiệm
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/prices", {
        params: { type: "test" },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setServices(res.data))
      .catch((err) => console.error("❌ Lỗi tải dịch vụ:", err));
  }, [token]);

  // Lấy danh sách tất cả danh mục
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("❌ Lỗi tải danh mục:", err));
  }, [token]);

  // Map categoryId sang tên danh mục
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

  const handleDelete = async (service) => {
    if (!service.id) return;
    if (window.confirm(`❌ Bạn có chắc muốn xóa dịch vụ "${service.name}"?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/prices/${service.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServices((prev) => prev.filter((s) => s.id !== service.id));
        alert(`🗑️ Đã xóa dịch vụ: ${service.name}`);
      } catch (err) {
        console.error("Lỗi khi xóa dịch vụ:", err);
        alert("❌ Xóa thất bại!");
      }
    }
  };

  const handleView = (service) => {
    window.location.href = `/manager/services/${service.id}`;
  };

  // Badge màu theo trạng thái
  const getStatusBadge = (status) => {
    if (!status) return <span className="status-badge gray">-</span>;
    let lower = status.toLowerCase();
    let color = "gray";
    if (lower === "active" || lower === "đang áp dụng") color = "green";
    else if (lower === "inactive" || lower === "ngưng áp dụng") color = "red";
    else if (lower === "pending" || lower === "chờ duyệt") color = "yellow";
    return (
      <span className={`status-badge ${color}`}>{status}</span>
    );
  };

  return (
    <div className="sm-table-container">
      <h2>Danh sách dịch vụ xét nghiệm ({services.length})</h2>
      <table className="sm-table">
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
                <div className="sm-meta">ID: {service.id}</div>
              </td>
              <td>
                <span className="sm-badge gray">{getCategoryName(service.categoryId)}</span>
              </td>
              <td>{formatCurrency(service.price)}</td>
              <td className="sm-description">
                <span className="sm-tooltip">
                  {service.description || "—"}
                  <span className="sm-tooltip-text">{service.description || "—"}</span>
                </span>
              </td>
              <td>
                {getStatusBadge(service.status)}
              </td>
              <td>
                <div className="sm-actions">
                  <button className="sm-view-btn" onClick={() => handleView(service)}>
                    Xem
                  </button>
                  <button className="sm-delete-btn" onClick={() => handleDelete(service)}>
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Phần phân trang giữ nguyên */}
      <div className="sm-pagination">
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
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Sau ›
        </button>
      </div>
    </div>
  );
};

export default SMBody;