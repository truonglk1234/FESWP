import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StaffBlogCreate.css";

const StaffBlogCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  // ✅ Chuẩn hóa hàm lấy token
  const getToken = () => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser).token : null;
    } catch {
      return null;
    }
  };

  // ✅ Gọi API danh sách chủ đề (không cần auth nếu là public)
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/topics") // sửa từ topic -> topics
      .then((res) => setTopics(res.data))
      .catch((err) => console.error("❌ Lỗi khi tải chủ đề:", err));
  }, []);

  // ✅ Xử lý submit bài viết
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();

    if (!token) {
      alert("⚠️ Bạn chưa đăng nhập!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/auth/staff/blogs",
        {
          title,
          content,
          topicId: parseInt(topic),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("✅ Bài viết đã được tạo!");
      navigate("/staff/blogs");
    } catch (error) {
      console.error("❌ Lỗi tạo bài viết:", error);
      if (error?.response?.data?.message) {
        alert(`❌ ${error.response.data.message}`);
      } else {
        alert("Không thể tạo bài viết. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="blog-create-container">
      <div className="blog-header-buttons">
        <button className="back-btn" onClick={() => navigate("/staff/blogs")}>
          Quay lại
        </button>
      </div>

      <h2>Tạo bài viết mới</h2>
      <form onSubmit={handleSubmit} className="blog-create-form">
        <label htmlFor="title">Tiêu đề</label>
        <input
          id="title"
          type="text"
          placeholder="Nhập tiêu đề..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="content">Nội dung</label>
        <textarea
          id="content"
          placeholder="Nhập nội dung bài viết..."
          rows="8"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <label htmlFor="topic">Chủ đề</label>
        <select
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        >
          <option value="">-- Chọn chủ đề --</option>
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            Đăng bài
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/staff/blogs")}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffBlogCreate;
