import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MSFooter.css";

const MSFooter = ({ searchKeyword, statusFilter, categoryFilter }) => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  // Gọi API lấy danh sách dịch vụ do staff tạo
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/auth/staff/services/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Lỗi khi tải dịch vụ:", err));
  }, []);

  // Lọc dịch vụ theo từ khóa, trạng thái, danh mục
  const filteredServices = services
    .filter((service) => service && service.name)
    .filter((service) => {
      const matchKeyword = searchKeyword
        ? service.name.toLowerCase().includes(searchKeyword.toLowerCase())
        : true;
      const matchStatus = statusFilter ? service.status === statusFilter : true;
      const matchCategory = categoryFilter ? service.categoryName === categoryFilter : true;
      return matchKeyword && matchStatus && matchCategory;
    });

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const visibleServices = filteredServices.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Xem chi tiết dịch vụ
  const handleView = (service) => {
    navigate(`/staff/services/${service.id}`);
  };

  // Sửa dịch vụ
  const handleEdit = (service) => {
    navigate(`/staff/services/edit/${service.id}`);
  };

  // Xóa dịch vụ
  const handleDelete = async (service) => {
    if (window.confirm(`❌ Bạn có chắc muốn xóa dịch vụ "${service.name}"?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/auth/staff/services/${service.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  // CSS badge theo trạng thái
  const getStatusClass = (status) => {
    switch (status) {
      case "ACTIVE":
      case "Đang hoạt động":
        return "ms-badge green";
      case "REJECTED":
      case "Bị từ chối":
        return "ms-badge red";
      case "PENDING":
      case "Chờ duyệt":
        return "ms-badge gray";
      default:
        return "ms-badge";
    }
  };

  return (
    <div className="ms-table-container">
      <h2>Danh sách dịch vụ ({filteredServices.length})</h2>
      <table className="ms-table">
        <thead>
          <tr>
            <th>DỊCH VỤ</th>
            <th>GIÁ</th>
            <th>DANH MỤC</th>
            <th>TRẠNG THÁI</th>
            <th>NGÀY TẠO</th>
            <th>THAO TÁC</th>
          </tr>
        </thead>
        <tbody>
          {visibleServices.map((service) => (
            <tr key={service.id}>
              <td>
                <strong>{service.name}</strong>
                <div className="ms-meta">ID: {service.id}</div>
              </td>
              <td>{service.price?.toLocaleString()} VND</td>
              <td>
                <span className="ms-badge gray">{service.categoryName}</span>
              </td>
              <td>
                <span className={getStatusClass(service.status)}>
                  {service.status}
                </span>
              </td>
              <td>
                {new Date(service.createdAt).toLocaleDateString() || "Chưa lên lịch"}
              </td>
              <td>
                <div className="ms-actions">
                  <button className="ms-view-btn" onClick={() => handleView(service)}>
                    Xem
                  </button>
                  <button className="ms-edit-btn" onClick={() => handleEdit(service)}>
                    Sửa
                  </button>
                  <button className="ms-delete-btn" onClick={() => handleDelete(service)}>
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ms-pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          ‹ Trước
        </button>
        {[...Array(totalPages)].map((_, idx) => {
          const p = idx + 1;
          return (
            <button
              key={p}
              className={page === p ? "active" : ""}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          );
        })}
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Sau ›
        </button>
      </div>
    </div>
  );
};

export default MSFooter;
