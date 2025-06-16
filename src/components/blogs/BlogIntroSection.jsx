import './BlogIntroSection.css';

const BlogIntroSection = () => {
  return (
    <section className="blog-intro">
      <div className="badge">🧠 Kiến thức y khoa từ chuyên gia</div>
      <h1>
        <strong className="highlight">Kiến thức sức khỏe giới tính hàng đầu</strong>
      </h1>
      <p className="description">
        Cập nhật thông tin y khoa mới nhất, lời khuyên từ các chuyên gia và nghiên cứu khoa học<br />
        về sức khỏe giới tính, sinh sản và phòng bệnh.
      </p>
    </section>
  );
};

export default BlogIntroSection;
