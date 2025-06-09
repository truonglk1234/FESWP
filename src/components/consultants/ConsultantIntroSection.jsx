import React from 'react';
import './ConsultantIntroSection.css';
import { Users, Award, ShieldCheck, HeartPulse } from 'lucide-react';

const ConsultantIntroSection = () => {
  return (
    <section className="consultant-intro">
      <div className="badge">👩‍⚕️ Đội ngũ tư vấn viên chuyên nghiệp</div>
      <h1>
        Tìm <strong className="highlight">tư vấn viên phù hợp</strong> cho bạn
      </h1>
      <p className="description">
        Kết nối với hơn 120 tư vấn viên sức khỏe giới tính và sinh sản, được đào tạo chuyên sâu<br />
        và luôn sẵn sàng hỗ trợ bạn 24/7
      </p>

      <div className="stats">
        <div className="stat-box">
          <Users size={28} />
          <h2>120+</h2>
          <p>Tư vấn viên</p>
          <span>Đào tạo bài bản</span>
        </div>
        <div className="stat-box">
          <Award size={28} />
          <h2>15+</h2>
          <p>Năm kinh nghiệm</p>
          <span>Trong lĩnh vực sức khỏe giới tính</span>
        </div>
        <div className="stat-box">
          <ShieldCheck size={28} />
          <h2>99%</h2>
          <p>Tỷ lệ hài lòng</p>
          <span>Được khách hàng đánh giá cao</span>
        </div>
        <div className="stat-box">
          <HeartPulse size={28} />
          <h2>365</h2>
          <p>Hỗ trợ 24/7</p>
          <span>Tư vấn mọi lúc, mọi nơi</span>
        </div>
      </div>
    </section>
  );
};

export default ConsultantIntroSection;
