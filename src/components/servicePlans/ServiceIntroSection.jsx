import React from 'react';
import './ServiceIntroSection.css';
import { Users, BadgeCheck, ShieldCheck, HeartPulse } from 'lucide-react';

const ServiceIntroSection = () => {
  return (
    <section className="service-intro">
      <button className="intro-btn">
        ⚡ Khám phá dịch vụ y tế
      </button>

      <h2 className="intro-heading">
        Khám phá <span className="highlight">dịch vụ y tế</span> phù hợp
      </h2>

      <p className="intro-subtitle">
        Tìm hiểu và lựa chọn dịch vụ y tế phù hợp với nhu cầu của bạn từ danh sách đa dạng các dịch vụ chất lượng cao
      </p>

      <div className="intro-stats">
        <div className="stat-card">
          <Users size={32} />
          <h3>50K+</h3>
          <p>Khách hàng tin tưởng</p>
          <span>Đã sử dụng dịch vụ</span>
        </div>
        <div className="stat-card">
          <BadgeCheck size={32} />
          <h3>15+</h3>
          <p>Năm kinh nghiệm</p>
          <span>Trong lĩnh vực y tế</span>
        </div>
        <div className="stat-card">
          <ShieldCheck size={32} />
          <h3>99.9%</h3>
          <p>Độ chính xác</p>
          <span>Kết quả xét nghiệm</span>
        </div>
        <div className="stat-card">
          <HeartPulse size={32} />
          <h3>365</h3>
          <p>Hỗ trợ 24/7</p>
          <span>Ngày trong năm</span>
        </div>
      </div>
    </section>
  );
};

export default ServiceIntroSection;
