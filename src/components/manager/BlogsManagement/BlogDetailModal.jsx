import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import "./BlogDetailModal.css";

const BlogDetailModal = ({ id, onClose, onStatusUpdate }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const token = user?.token || JSON.parse(localStorage.getItem("user"))?.token;

  // Bấm ESC để đóng modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (!id || !token) return;

    setLoading(true);
    axios
      .get(`http://localhost:8080/api/management/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPost(res.data))
      .catch((err) => {
        console.error("❌ Không lấy được bài viết:", err);
        setPost(null);
      })
      .finally(() => setLoading(false));
  }, [id, token]);

  const updateStatus = (newStatus) => {
    const endpoint =
      newStatus === "Đã xác nhận"
        ? `/api/management/blogs/${id}/approve`
        : `/api/management/blogs/${id}/reject`;

    axios
      .put(`http://localhost:8080${endpoint}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(`✅ Đã cập nhật trạng thái: ${newStatus}`);
        onStatusUpdate();
        onClose();
      })
      .catch((err) => {
        console.error("❌ Lỗi cập nhật trạng thái:", err);
        alert("Không thể cập nhật trạng thái!");
      });
  };

  if (!id) return null;

  return (
    <div className="blog-modal-overlay" onClick={onClose}>
      <div
        className="blog-modal-content"
        onClick={(e) => e.stopPropagation()} // Ngăn click ra ngoài
      >
        <button className="blog-close-btn" onClick={onClose}>
          ✖
        </button>

        {loading ? (
          <div>⏳ Đang tải...</div>
        ) : !post ? (
          <div>❌ Không tìm thấy bài viết.</div>
        ) : (
          <>
            <h2 className="blog-modal-title">{post.title}</h2>

            <div className="blog-modal-meta">
              <p>
                <strong>Tác giả:</strong> {post.authorName}
              </p>
              <p>
                <strong>Chủ đề:</strong> {post.topicName}
              </p>
              <p>
                <strong>Trạng thái:</strong> {post.status}
              </p>
              <p>
                <strong>Ngày đăng:</strong>{" "}
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : "Chưa lên lịch"}
              </p>
            </div>

            <hr />

            <div className="blog-modal-body">{post.content}</div>

            {(post.status?.toLowerCase().trim() === "chờ xác nhận" ||
              post.status?.toLowerCase().trim() === "pending") && (
              <div className="blog-modal-actions">
                <button
                  className="green"
                  onClick={() => updateStatus("Đã xác nhận")}
                >
                  Xác nhận
                </button>
                <button
                  className="red"
                  onClick={() => updateStatus("Đã từ chối")}
                >
                  Từ chối
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogDetailModal;
