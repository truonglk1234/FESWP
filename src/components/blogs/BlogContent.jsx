import { useState } from 'react';
import blogData from './blogData';
import BlogCard from './BlogCard';
import BlogFilters from './BlogFilters';
import Pagination from './Pagination';
import { Search } from 'lucide-react';
import './BlogContent.css'; // Dùng chung cho toàn bộ Blog

const BlogContent = () => {
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [author, setAuthor] = useState('Tất cả');
  const [sortBy, setSortBy] = useState('newest');

  const perPage = 6;

  // Lọc và sắp xếp
  const filtered = blogData
    .filter(blog => {
      const keyword = search.toLowerCase();
      const matchesKeyword =
        blog.title.toLowerCase().includes(keyword) ||
        blog.description.toLowerCase().includes(keyword) ||
        blog.author.toLowerCase().includes(keyword);

      const matchesCategory = category === 'Tất cả' || blog.category === category;
      const matchesAuthor = author === 'Tất cả' || blog.author === author;

      return matchesKeyword && matchesCategory && matchesAuthor;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="blog-section">
      {/* Thanh tìm kiếm */}
      <div className="search-box">
        <Search size={18} className="blog-search-icon" />
        <input
          type="text"
          placeholder="Tìm kiếm bài viết theo tiêu đề, mô tả, tác giả…"
          className="search-input"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Bộ lọc & chuyển đổi chế độ xem */}
      <BlogFilters
        viewMode={viewMode}
        setViewMode={setViewMode}
        category={category}
        setCategory={setCategory}
        author={author}
        setAuthor={setAuthor}
        sortBy={sortBy}
        setSortBy={setSortBy}
        total={filtered.length}
      />

      {/* Danh sách bài viết */}
      <div className={viewMode === 'grid' ? 'blog-grid' : 'blog-list'}>
        {paginated.map((blog) => (
          <BlogCard key={blog.id} blog={blog} viewMode={viewMode} />
        ))}
      </div>

      {/* Phân trang */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </section>
  );
};

export default BlogContent;
