import './ServiceIntroSection.css';

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
    </section>
  );
};

export default ServiceIntroSection;
