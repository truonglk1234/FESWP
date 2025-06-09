import { Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockServices } from '../servicePlans/ServiceContent';
import './ServicePlansSection.css';

const ServicePlansSection = () => {
  const navigate = useNavigate();

  return (
    <section className="plans-section">
      <div className="plans-container">
        <div className="plans-header">
          <span className="badge">Dịch vụ y tế chuyên nghiệp</span>
          <h2>Dịch vụ sức khỏe giới tính hàng đầu</h2>
          <p>Lựa chọn dịch vụ chăm sóc sức khỏe phù hợp với nhu cầu của bạn từ các gói cơ bản đến nâng cao</p>
        </div>

        <div className="plans-grid">
          {mockServices.slice(0, 4).map((service, index) => (
            <div className="plan-card" key={index}>
              <div className="plan-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p className="plan-desc">{service.description}</p>
              <div className="plan-price">{service.price}</div>
              <div className="plan-duration">{service.duration}</div>
              <ul className="plan-features">
                {service.features.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <button className="btn-primary">Đặt lịch</button>
            </div>
          ))}
        </div>

        <div className="plans-footer">
          <button className="btn-outline with-icon" onClick={() => navigate('/services')}>
            Xem tất cả dịch vụ y tế <Stethoscope size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicePlansSection;
