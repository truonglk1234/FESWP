import {
  ShieldCheck,
  TestTube,
  Microscope,
  User,
  Calendar,
  Brain,
  CalendarDays,
  Clock,
  User2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './BlogContent.css';

// Danh sách icon
const iconList = [ShieldCheck, TestTube, Microscope, User, Calendar, Brain];

// Hàm random icon mỗi lần render
const getRandomIcon = () => {
  const index = Math.floor(Math.random() * iconList.length);
  return iconList[index];
};

const BlogCard = ({ blog, role = "public", viewMode = "grid" }) => {
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

  const Icon = getRandomIcon();

  const contentNode = (
    <div className="blog-card-content">
      <div className="blog-card-header">
        <div className="blog-card-header-top">
          <div className="blog-card-icon-wrapper">
            <Icon className="blog-card-icon" strokeWidth={2.2} />
          </div>
          <span className="blog-card-badge">{category || topic?.name}</span>
        </div>

        {readingTime && (
          <div className="blog-card-meta">
            <span className="blog-card-meta-item">
              <Clock size={14} /> {readingTime}
            </span>
            {status && role !== "public" && (
              <span className={`blog-card-badge ${status.toLowerCase()}`}>{status}</span>
            )}
          </div>
        )}
      </div>

      <h3 className="blog-card-title">{title}</h3>

      {(description || content) && (
        <p className="blog-card-excerpt">
          {description || `${content.slice(0, 100)}...`}
        </p>
      )}

      <div className="blog-card-footer">
        <span className="blog-card-meta-item">
          <User2 size={18} /> {author || createdBy?.fullName}
        </span>
        <span className="blog-card-meta-item">
          <CalendarDays size={18} /> {date || new Date(createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );

  return (
    <div className={`blog-card ${viewMode} ${role}`}>
      {role === "public" ? (
        <Link to={`/blogs/${id}`} className="blog-card-link-wrapper">
          {contentNode}
        </Link>
      ) : (
        contentNode
      )}
    </div>
  );
};

export default BlogCard;
