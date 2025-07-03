import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./StaffServiceEdit.css";

const StaffServiceEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryName: "",
    type: "",
    rejectReason: ""
  });

  const [loading, setLoading] = useState(false);

  // Gọi API lấy dữ liệu dịch vụ cũ
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/auth/staff/services/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setFormData(res.data))
      .catch((err) => {
        console.error("❌ Lỗi tải dịch vụ:", err);
        alert("Không tìm thấy dịch vụ!");
        navigate("/staff/services");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:8080/api/auth/staff/services/${id}`,
        {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          categoryName: formData.categoryName,
          status: "PENDING" // Mỗi lần sửa lại sẽ quay về chờ duyệt
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("✅ Cập nhật dịch vụ thành công!");
      navigate("/staff/services");
    } catch (err) {
      console.error("❌ Lỗi cập nhật:", err);
      alert("❌ Sửa thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sse-edit-container">
      <h1>Chỉnh sửa dịch vụ</h1>

      {/* Nếu bị từ chối → hiển thị lý do từ chối */}
      {formData.status === "REJECTED" && formData.rejectReason && (
        <div className="sse-reject-reason">
          <strong>Lý do từ chối:</strong> {formData.rejectReason}
        </div>
      )}

      <form className="sse-form" onSubmit={handleSubmit}>
        <label>
          Tên dịch vụ:
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mô tả:
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Giá (VND):
          <input
            type="number"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Danh mục:
          <input
            type="text"
            name="categoryName"
            value={formData.categoryName || ""}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Loại dịch vụ:
          <input
            type="text"
            name="type"
            value={formData.type || ""}
            disabled
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </form>
    </div>
  );
};

export default StaffServiceEdit;
