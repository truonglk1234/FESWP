import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./StaffServiceDetail.css";

const StaffServiceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/auth/staff/services/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setService(res.data))
      .catch((err) => {
        console.error("❌ Lỗi tải chi tiết dịch vụ:", err);
        alert("Không tìm thấy dịch vụ!");
        navigate("/staff/services");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <div className="ssd-loading">Đang tải...</div>;

  if (!service) return null;

  return (
    <div className="ssd-detail-container">
      <h1>Chi tiết dịch vụ</h1>

      <div className="ssd-field">
        <strong>Tên dịch vụ:</strong>
        <p>{service.name}</p>
      </div>

      <div className="ssd-field">
        <strong>Mô tả:</strong>
        <p>{service.description}</p>
      </div>

      <div className="ssd-field">
        <strong>Giá:</strong>
        <p>{service.price?.toLocaleString()} VND</p>
      </div>

      <div className="ssd-field">
        <strong>Danh mục:</strong>
        <p>{service.categoryName}</p>
      </div>

      <div className="ssd-field">
        <strong>Loại dịch vụ:</strong>
        <p>{service.type}</p>
      </div>

      <div className="ssd-field">
        <strong>Trạng thái:</strong>
        <p>{service.status}</p>
      </div>

      {service.status === "REJECTED" && service.rejectReason && (
        <div className="ssd-reject-reason">
          <strong>Lý do từ chối:</strong> {service.rejectReason}
        </div>
      )}

      <button className="ssd-back-btn" onClick={() => navigate("/staff/services")}>
        ← Quay lại danh sách
      </button>
    </div>
  );
};

export default StaffServiceDetail;
