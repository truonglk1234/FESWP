import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StaffServiceCreate.css";

const StaffServiceCreate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryName: "",
    type: "TEST" // Mặc định TEST
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8080/api/auth/staff/services",
        {
          ...formData,
          status: "PENDING"
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      alert("✅ Tạo dịch vụ thành công, chờ duyệt!");
      navigate("/staff/services");
    } catch (err) {
      console.error("❌ Lỗi tạo dịch vụ:", err);
      alert("❌ Tạo thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ssc-create-container">
      <h1>Tạo dịch vụ mới</h1>
      <form className="ssc-form" onSubmit={handleSubmit}>
        <label>
          Tên dịch vụ:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mô tả:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Giá (VND):
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Danh mục:
          <input
            type="text"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Loại dịch vụ:
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="TEST">Dịch vụ xét nghiệm</option>
            <option value="CONSULTING">Dịch vụ tư vấn</option>
          </select>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Đang tạo..." : "Tạo dịch vụ"}
        </button>
      </form>
    </div>
  );
};

export default StaffServiceCreate;
