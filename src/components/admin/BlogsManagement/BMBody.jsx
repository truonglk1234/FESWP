import { useState } from "react";
import "./BMBody.css";

const posts = [
  { id: 1, title: "10 mẹo giữ gìn sức khỏe tim mạch", author: "BS. Nguyễn Văn A", topic: "Tim mạch", status: "Đã đăng", date: "2024-06-01", views: 1250 },
  { id: 2, title: "Chế độ ăn uống lành mạnh cho người tiểu đường", author: "BS. Trần Thị B", topic: "Dinh dưỡng", status: "Đã đăng", date: "2024-05-28", views: 980 },
  { id: 3, title: "Tầm quan trọng của việc xét nghiệm định kỳ", author: "BS. Lê Văn C", topic: "Xét nghiệm", status: "Bản nháp", date: "", views: 0 },
  { id: 4, title: "Phòng ngừa bệnh cảm cúm mùa đông", author: "BS. Phạm Thị D", topic: "Phòng ngừa", status: "Đã lên lịch", date: "2024-06-10", views: 0 },
  { id: 5, title: "Tác hại của stress đến sức khỏe", author: "BS. Hoàng Văn E", topic: "Tâm lý", status: "Đã đăng", date: "2024-05-25", views: 1580 },
  { id: 6, title: "Làm sao để ngủ ngon mỗi đêm", author: "BS. Nguyễn Văn F", topic: "Giấc ngủ", status: "Đã đăng", date: "2024-06-03", views: 1120 },
  { id: 7, title: "Tập thể dục thế nào là đủ?", author: "BS. Trần Thị G", topic: "Thể chất", status: "Đã đăng", date: "2024-06-02", views: 900 },
  { id: 8, title: "Cách phát hiện sớm bệnh ung thư", author: "BS. Lê Văn H", topic: "Ung thư", status: "Đã đăng", date: "2024-06-01", views: 750 },
  { id: 9, title: "Giải pháp giảm căng thẳng trong công việc", author: "BS. Phạm Thị I", topic: "Tâm lý", status: "Đã đăng", date: "2024-05-30", views: 1300 },
  { id: 10, title: "Vai trò của nước đối với cơ thể", author: "BS. Hoàng Văn J", topic: "Dinh dưỡng", status: "Bản nháp", date: "", views: 0 },
  { id: 11, title: "Cách bảo vệ da dưới nắng hè", author: "BS. Nguyễn Thị K", topic: "Da liễu", status: "Đã đăng", date: "2024-05-29", views: 830 },
  { id: 12, title: "Chế độ ăn uống cho người già", author: "BS. Trần Văn L", topic: "Dinh dưỡng", status: "Đã lên lịch", date: "2024-06-12", views: 0 },
  { id: 13, title: "Cách xử lý khi bị cao huyết áp", author: "BS. Lê Thị M", topic: "Tim mạch", status: "Đã đăng", date: "2024-06-04", views: 690 },
  { id: 14, title: "Tự kiểm tra sức khỏe tại nhà", author: "BS. Phạm Văn N", topic: "Kiến thức", status: "Bản nháp", date: "", views: 0 },
  { id: 15, title: "Phòng chống bệnh mùa mưa", author: "BS. Hoàng Thị O", topic: "Phòng ngừa", status: "Đã đăng", date: "2024-06-05", views: 1040 },
];

const getStatusClass = (status) => {
  switch (status) {
    case "Đã đăng":
      return "badge green";
    case "Bản nháp":
      return "badge gray";
    case "Đã lên lịch":
      return "badge blue";
    default:
      return "badge";
  }
};

const BMBody = () => {
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const visiblePosts = posts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="blog-table-container">
      <h2>Danh sách bài viết ({posts.length})</h2>
      <table className="blog-table">
        <thead>
          <tr>
            <th>BÀI VIẾT</th>
            <th>TÁC GIẢ</th>
            <th>CHỦ ĐỀ</th>
            <th>TRẠNG THÁI</th>
            <th>NGÀY ĐĂNG</th>
            <th>LƯỢT XEM</th>
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
              <td>{post.views.toLocaleString()}</td>
              <td>
                <div className="actions">
                  <span role="img" aria-label="view">👁</span>
                  <span role="img" aria-label="edit">✏️</span>
                  <span role="img" aria-label="delete">🗑️</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          ‹ Previous
        </button>
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
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Next ›
        </button>
      </div>
    </div>
  );
};

export default BMBody;
