import { useEffect, useState } from "react";
import axios from "axios";
import "./AddTestingServiceModal.css";

const AddTestingServiceModal = ({ onClose, onAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    categoryId: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  // ESC để đóng
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Lấy danh mục
  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:8080/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.price || !formData.categoryId) {
      setError("❌ Vui lòng điền đầy đủ các trường bắt buộc.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8080/api/prices",
        { ...formData, type: "test" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Tạo dịch vụ thành công!");
      onAdded();
      onClose();
    } catch (err) {
      console.error(err);
      setError("❌ Không thể tạo dịch vụ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="atsm-overlay" onClick={onClose}>
      <div className="atsm-content" onClick={(e) => e.stopPropagation()}>
        <h2>Thêm dịch vụ xét nghiệm</h2>

        <form onSubmit={handleSubmit}>
          <label>Tên dịch vụ</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Giá</label>
          <input
            type="number"
            name="price"
            value={formData.price}
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

          <label>Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          {error && <p className="atsm-error">{error}</p>}

          <div className="atsm-actions">
            <button type="button" onClick={onClose}>Hủy</button>
            <button type="submit" disabled={loading}>
              {loading ? "Đang tạo..." : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTestingServiceModal;
