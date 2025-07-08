import { useState, useEffect } from "react";
import axios from "axios";
import "./AddConsultingServiceModal.css";

const AddConsultingServiceModal = ({ onClose, onAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:8080/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCategories(res.data || []))
      .catch(() => setCategories([]));
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("❌ Vui lòng nhập tên dịch vụ");
      return;
    }

    if (!formData.categoryId) {
      setError("❌ Vui lòng chọn danh mục");
      return;
    }

    if (Number(formData.price) <= 0) {
      setError("❌ Giá phải lớn hơn 0");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8080/api/prices",
        {
          ...formData,
          type: "advice",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("✅ Thêm dịch vụ thành công!");
      onAdded();
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message || "❌ Không thể thêm dịch vụ. Vui lòng thử lại!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="acsm-overlay" onClick={onClose}>
      <div
        className="acsm-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Thêm dịch vụ tư vấn</h2>
        <form onSubmit={handleSubmit}>
          <label>Tên dịch vụ</label>
          <input
            type="text"
            name="name"
            placeholder="Nhập tên dịch vụ"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Danh mục</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <label>Giá (VNĐ)</label>
          <input
            type="number"
            name="price"
            placeholder="Nhập giá"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <label>Mô tả</label>
          <textarea
            name="description"
            placeholder="Nhập mô tả"
            value={formData.description}
            onChange={handleChange}
          />

          {error && <p className="acsm-error">{error}</p>}

          <div className="acsm-actions">
            <button type="button" onClick={onClose}>Hủy</button>
            <button type="submit" disabled={loading}>
              {loading ? "Đang xử lý..." : "Thêm dịch vụ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddConsultingServiceModal;
