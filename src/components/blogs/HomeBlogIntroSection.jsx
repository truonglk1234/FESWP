import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react'; // ✅ Thêm icon nếu muốn
import axios from 'axios';
import BlogCard from '../blogs/BlogCard';
import './HomeBlogIntroSection.css';

const HomeBlogIntroSection = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/blogs')
      .then(res => {
        const published = res.data.filter(blog => blog.status === "Published");
        setBlogs(published);
      })
      .catch(err => console.error("Lỗi khi tải blog:", err));
  }, []);

  return (
    <section className="home-blog-intro">
      <div className="home-blog-intro__container">
        <div className="home-blog-intro__header">
          <span className="home-blog-intro__badge">Chia sẻ kiến thức sức khỏe</span>
          <h2 className="home-blog-intro__title">Blog & Tin tức y tế</h2>
          <p className="home-blog-intro__desc">
            Cập nhật những bài viết mới nhất về chăm sóc sức khỏe giới tính, bệnh lý và phương pháp phòng ngừa.
          </p>
        </div>

        <div className="home-blog-intro__grid">
          {blogs.slice(0, 3).map((blog) => (
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

        <div className="home-blog-intro__footer">
          <button
            className="home-blog-intro__btn"
            onClick={() => navigate('/blogs')}
          >
            Xem tất cả bài viết <Stethoscope size={20} /> 
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeBlogIntroSection;
