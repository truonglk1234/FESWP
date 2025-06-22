import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./BlogDetailPublic.css";

import Header from "../header/Header";
import Footer from "../footer/Footer";

const BlogDetailPublic = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/blogs/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.error("❌ Không lấy được bài viết:", err);
        setPost(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Header />
      <div className="blog-detail-wrapper">
        {loading ? (
          <div>⏳ Đang tải...</div>
        ) : !post ? (
          <div>❌ Không tìm thấy bài viết.</div>
        ) : (
          <>
            <button className="back-btn" onClick={() => navigate(-1)}>← Quay lại</button>
            <h1 className="blog-title">{post.title}</h1>
            <div className="blog-meta">
              <p><strong>Tác giả:</strong> {post.authorName}</p>
              <p><strong>Chủ đề:</strong> {post.topicName}</p>
              <p><strong>Ngày đăng:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
            <hr />
            <div className="blog-content">{post.content}</div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BlogDetailPublic;
