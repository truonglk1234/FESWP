import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BMBody.css";

const posts = [
  { id: 1, title: "10 mẹo giữ gìn sức khỏe tim mạch", author: "BS. Nguyễn Văn A", topic: "Tim mạch", status: "Chờ xác nhận", date: "2024-06-01" },
  { id: 2, title: "Chế độ ăn uống lành mạnh cho người tiểu đường", author: "BS. Trần Thị B", topic: "Dinh dưỡng", status: "Đã xác nhận", date: "2024-05-28" },
  { id: 3, title: "Tầm quan trọng của việc xét nghiệm định kỳ", author: "BS. Lê Văn C", topic: "Xét nghiệm", status: "Chờ xác nhận", date: "" },
  { id: 4, title: "Phòng ngừa bệnh cảm cúm mùa đông", author: "BS. Phạm Thị D", topic: "Phòng ngừa", status: "Đã xác nhận", date: "2024-06-10" },
  { id: 5, title: "Tác hại của stress đến sức khỏe", author: "BS. Hoàng Văn E", topic: "Tâm lý", status: "Đã xác nhận", date: "2024-05-25" },
  { id: 6, title: "Làm sao để ngủ ngon mỗi đêm", author: "BS. Nguyễn Văn F", topic: "Giấc ngủ", status: "Chờ xác nhận", date: "2024-06-03" },
];

const getStatusClass = (status) => {
  switch (status) {
    case "Đã xác nhận":
      return "badge green";
    case "Đã từ chối":
      return "badge red";
    case "Chờ xác nhận":
      return "badge gray";
    default:
      return "badge";
  }
};

const BMBody = ({ searchKeyword, statusFilter, topicFilter }) => {
  const navigate = useNavigate();
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);

  // Lọc dữ liệu theo từ khóa, trạng thái, chủ đề
  const filteredPosts = posts.filter(post => {
    const matchKeyword = post.title.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchStatus = statusFilter ? post.status === statusFilter : true;
    const matchTopic = topicFilter ? post.topic === topicFilter : true;
    return matchKeyword && matchStatus && matchTopic;
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const visiblePosts = filteredPosts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleView = (post) => {
    navigate(`/manager/blogs/${post.id}`);
  };

  const handleDelete = (post) => {
    if (window.confirm(`❌ Bạn có chắc muốn xóa "${post.title}"?`)) {
      alert(`🗑️ Đã xóa: ${post.title}`);
    }
  };

  return (
    <div className="blog-table-container">
      <h2>Danh sách bài viết ({filteredPosts.length})</h2>
      <table className="blog-table">
        <thead>
          <tr>
            <th>BÀI VIẾT</th>
            <th>TÁC GIẢ</th>
            <th>CHỦ ĐỀ</th>
            <th>TRẠNG THÁI</th>
            <th>NGÀY ĐĂNG</th>
            <th>THAO TÁC</th>
          </tr>
        </thead>
        <tbody>
          {visiblePosts.map((post) => (
            <tr key={post.id}>
              <td>
                <strong>{post.title}</strong>
                <div className="post-meta">ID: {post.id}</div>
              </td>
              <td>{post.author}</td>
              <td><span className="badge gray">{post.topic}</span></td>
              <td><span className={getStatusClass(post.status)}>{post.status}</span></td>
              <td>{post.date || "Chưa lên lịch"}</td>
              <td>
                <div className="actions">
                  <button className="view-btn" onClick={() => handleView(post)}>Xem</button>
                  <button className="delete-btn" onClick={() => handleDelete(post)}>Xóa</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>‹ Trước</button>
        {[...Array(totalPages)].map((_, idx) => {
          const p = idx + 1;
          return (
            <button
              key={p}
              className={page === p ? "active" : ""}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          );
        })}
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Sau ›</button>
      </div>
    </div>
  );
};

export default BMBody;
