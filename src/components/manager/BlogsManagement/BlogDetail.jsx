import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./BlogDetail.css";

const initialPosts = [
  {
    id: 1,
    title: "10 mẹo giữ gìn sức khỏe tim mạch",
    author: "BS. Nguyễn Văn A",
    topic: "Tim mạch",
    status: "Chờ xác nhận",
    date: "2024-06-01",
    content: "Dưới đây là 10 mẹo hữu ích giúp bạn giữ gìn sức khỏe tim mạch mỗi ngày...",
  },
  {
    id: 2,
    title: "Chế độ ăn uống lành mạnh cho người tiểu đường",
    author: "BS. Trần Thị B",
    topic: "Dinh dưỡng",
    status: "Đã xác nhận",
    date: "2024-05-28",
    content: "Chế độ ăn uống khoa học giúp kiểm soát đường huyết và nâng cao sức khỏe...",
  },
];

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState(initialPosts);

  const postIndex = posts.findIndex((p) => p.id === parseInt(id));
  const post = posts[postIndex];

  if (!post) {
    return <div className="blog-detail-wrapper">Không tìm thấy bài viết.</div>;
  }

  const updateStatus = (newStatus) => {
    const updatedPosts = [...posts];
    updatedPosts[postIndex] = { ...post, status: newStatus };
    setPosts(updatedPosts);
    navigate(-1);
  };

  return (
    <div className="blog-detail-wrapper">
      <div className="blog-detail-header">
        <button className="blog-detail-btn" onClick={() => navigate(-1)}>Quay lại</button>
        <div className="blog-detail-actions">
          <button
            className="blog-detail-btn"
            onClick={() => updateStatus("Đã xác nhận")}
          >
            Xác nhận
          </button>
          <button
            className="blog-detail-btn"
            onClick={() => updateStatus("Đã từ chối")}
          >
            Từ chối
          </button>
        </div>
      </div>

      <h1 className="blog-detail-title">{post.title}</h1>
      <div className="blog-detail-meta">
        <p><strong>Tác giả:</strong> {post.author}</p>
        <p><strong>Chủ đề:</strong> {post.topic}</p>
        <p><strong>Trạng thái:</strong> {post.status}</p>
        <p><strong>Ngày đăng:</strong> {post.date || "Chưa lên lịch"}</p>
      </div>
      <hr />
      <div className="blog-detail-content">{post.content}</div>
    </div>
  );
};

export default BlogDetail;
