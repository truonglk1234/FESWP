import { CalendarDays, Clock, User2 } from 'lucide-react';

const BlogCard = ({ blog, viewMode = 'grid' }) => {
  const {
    title,
    description,
    imageUrl,
    category,
    readingTime,
    author,
    date,
  } = blog;

  return (
    <div className={`blog-card ${viewMode}`}>
      <img src={imageUrl} alt={title} className="blog-image" />

      <div className="blog-content">
        <div className="blog-meta">
          <span className="badge">{category}</span>
          <span className="meta-item">
            <Clock size={14} /> {readingTime}
          </span>
        </div>

        <h3 className="title">{title}</h3>
        <p className="excerpt">{description}</p>

        <div className="blog-footer">
          <span className="meta-item">
            <User2 size={14} /> {author}
          </span>
          <span className="meta-item">
            <CalendarDays size={14} /> {date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
