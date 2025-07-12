import './ServiceIntroSection.css';

const ServiceIntroSection = () => {
  return (
    <section className="sis-intro">
      <div className="sis-badge">⚡ Khám phá dịch vụ y tế</div>
      <h1 className="sis-title">
        Khám phá <strong className="sis-highlight">dịch vụ xét nghiệm</strong> phù hợp
      </h1>
      <p className="sis-description">
        Tìm hiểu và lựa chọn dịch vụ y tế phù hợp với nhu cầu của bạn<br />
        từ danh sách đa dạng các dịch vụ chất lượng cao
      </p>
    </section>
  );
};

export default ServiceIntroSection;
