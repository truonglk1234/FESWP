import { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import Pagination from './Pagination';
import './BlogContent.css';

const BlogContent = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    axios.get('http://localhost:8080/api/blogs')
      .then(res => {
        const published = res.data.filter(blog => blog.status === "Published");
        setBlogs(published);
      })
      .catch(err => console.error("Lỗi khi tải blog:", err));
  }, []);

  const totalPages = Math.ceil(blogs.length / perPage);
  const paginated = blogs.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="blog-section">
      {/* Danh sách bài viết */}
      <div className="blog-grid">
        {paginated.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={{
              ...blog,
              topic: { name: blog.topicName },
              createdBy: { fullName: blog.authorName }
            }}
            role="public"
          />
        ))}
      </div>

      {/* Phân trang */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </section>
  );
};

export default BlogContent;
