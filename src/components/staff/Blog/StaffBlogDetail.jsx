import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StaffBlogDetail.css";

const StaffBlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  // ✅ Lấy token an toàn từ localStorage hoặc sessionStorage
  const getToken = () => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser).token : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      const token = getToken();
      if (!token) {
        alert("⚠️ Bạn chưa đăng nhập.");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8080/api/auth/staff/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlog(res.data);
      } catch (err) {
        if (err.response?.status === 404) {
          navigate("/staff/blogs", {
            state: { error: "Bài viết không tồn tại hoặc đã bị xóa." },
          });
        } else {
          alert("❌ Đã có lỗi xảy ra khi tải bài viết.");
        }
      }
    };

    fetchBlog();
  }, [id, navigate]);

  if (!blog)
    return <div className="sb-detail-container">Đang tải bài viết...</div>;

  return (
    <div className="sb-detail-container">
      <div className="sb-detail-header">
        <button className="sb-detail-back-btn" onClick={() => navigate("/staff/blogs")}>
          ← Quay lại danh sách
        </button>
        <h2 className="sb-detail-title">{blog.title}</h2>
        <p className="sb-detail-meta">
          Chủ đề: <strong>{blog.topicName}</strong> | Tác giả:{" "}
          <strong>{blog.authorName}</strong> | Ngày đăng:{" "}
          <strong>{new Date(blog.createdAt).toLocaleDateString()}</strong> | Trạng thái:{" "}
          <strong>{blog.status}</strong>
        </p>
      </div>

      <div
        className="sb-detail-content-box"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default StaffBlogDetail;
