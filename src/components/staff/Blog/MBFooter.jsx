import React from "react";
import "./MBFooter.css";
import { CalendarDays, Clock, PenLine, Trash2, User } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    image: "/images/blog1.jpg",
    category: "Xét nghiệm",
    time: "5 phút",
    title: "Tầm quan trọng của xét nghiệm máu định kỳ",
    description:
      "Xét nghiệm máu định kỳ giúp phát hiện sớm các vấn đề sức khỏe và theo dõi tình trạng bệnh lý hiện có.",
    author: "BS. Nguyễn Văn A",
    date: "15/6/2024",
  },
  {
    id: 2,
    image: "/images/blog2.jpg",
    category: "Hướng dẫn",
    time: "3 phút",
    title: "Hướng dẫn chuẩn bị trước khi xét nghiệm",
    description:
      "Chuẩn bị đúng cách trước khi xét nghiệm giúp đảm bảo kết quả chính xác và tin cậy nhất.",
    author: "BS. Trần Thị B",
    date: "10/6/2024",
  },
  {
    id: 3,
    image: "/images/blog3.jpg",
    category: "Công nghệ",
    time: "7 phút",
    title: "Công nghệ mới trong xét nghiệm y học",
    description:
      "Khám phá những tiến bộ công nghệ mới nhất trong lĩnh vực xét nghiệm và chẩn đoán y học.",
    author: "ThS. Lê Văn C",
    date: "5/6/2024",
  },
];

const MBFooter = () => {
  return (
    <div className="mb-footer-container">
      {blogPosts.map((post) => (
        <div className="blog-card" key={post.id}>
          <img src={post.image} alt={post.title} className="blog-image" />
          <div className="blog-content">
            <div className="blog-tags">
              <span className="tag">{post.category}</span>
              <div className="blog-meta">
                <Clock size={16} />
                <span>{post.time}</span>
                <PenLine className="blog-icon" />
                <Trash2 className="blog-icon" />
              </div>
            </div>
            <h3 className="blog-title">{post.title}</h3>
            <p className="blog-description">{post.description}</p>
            <div className="blog-footer">
              <div className="author">
                <User size={14} />
                <span>{post.author}</span>
              </div>
              <div className="date">
                <CalendarDays size={14} />
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MBFooter;
