import './BlogContent.css';
import blogData from './blogData';
import BlogCard from './BlogCard';
import Pagination from './Pagination';
import { useState } from 'react';

const BlogContent = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogData.length / itemsPerPage);
  const currentData = blogData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="blog-content">
      <div className="blog-grid">
        {currentData.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

export default BlogContent;
