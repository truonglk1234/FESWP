import { CalendarDays, Clock, User2 } from 'lucide-react';
import './BlogCard.css';
import { Link } from "react-router-dom";

const BlogCard = ({
  blog,
  role = "public",
  viewMode = "grid",
  onView,
  onDelete,
  onApprove,
  onReject,
}) => {
  const {
    id,
    title,
    description,
    content,
    category,
    topic,
    readingTime,
    author,
    createdBy,
    date,
    createdAt,
    status,
  } = blog;

  const contentNode = (
    <div className="blog-content">
      {/* Thông tin trên cùng */}
      <div className="blog-meta">
        <span className="badge">{category || topic?.name}</span>

        {readingTime && (
          <span className="meta-item">
            <Clock size={14} /> {readingTime}
          </span>
        )}

        {status && role !== "public" && (
          <span className={`badge ${status.toLowerCase()}`}>{status}</span>
        )}
      </div>

      {/* Tiêu đề & mô tả */}
      <h3 className="title">{title}</h3>
      <p className="excerpt">
        {description || content?.slice(0, 100) + "..."}
      </p>

      {/* Tác giả & ngày */}
      <div className="blog-footer">
        <span className="meta-item">
          <User2 size={14} /> {author || createdBy?.fullName}
        </span>
        <span className="meta-item">
          <CalendarDays size={14} /> {date || new Date(createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Nút thao tác nếu là manager/staff */}
      {(role === "manager" || role === "staff") && (
        <div className="actions">
          {onView && <button className="view-btn" onClick={onView}>Xem</button>}
          {onDelete && <button className="delete-btn" onClick={onDelete}>Xóa</button>}
          {status === "Pending" && onApprove && (
            <>
              <button className="view-btn" onClick={() => onApprove(id)}>Duyệt</button>
              <button className="delete-btn" onClick={() => onReject(id)}>Từ chối</button>
            </>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className={`blog-card ${viewMode} ${role}`}>
      {role === "public" ? (
        <Link to={`/blogs/${id}`} className="blog-link-wrapper">
          {contentNode}
        </Link>
      ) : (
        contentNode
      )}
    </div>
  );
};

export default BlogCard;
