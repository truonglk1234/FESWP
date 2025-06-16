import './BlogCard.css';

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <img src={blog.image} alt={blog.title} className="blog-image" />
      <div className="blog-content">
        <h3 className="blog-title">{blog.title}</h3>
        <p className="blog-description">{blog.description}</p>
        <div className="blog-meta">
          <span className="blog-author">👤 {blog.author}</span>
          <span className="blog-date">🗓 {blog.date}</span>
        </div>
        <button className="read-more">Xem chi tiết</button>
      </div>
    </div>
  );
};

export default BlogCard;
