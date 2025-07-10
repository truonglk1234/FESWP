import { TestTube, ShieldCheck, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ServicePlansSection.css';

const iconMap = {
  TestTube: <TestTube className="service-icon" />
};

const ServicePlansSection = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/public/prices/test')
      .then((res) => {
        setServices(res.data || []);
      })
      .catch(() => {
        // không in lỗi ra console
        setServices([]);
      });
  }, []);

  return (
    <section className="plans-section">
      <div className="plans-container">
        <div className="plans-header">
          <span className="badge">Dịch vụ y tế chuyên nghiệp</span>
          <h2>Dịch vụ sức khỏe giới tính hàng đầu</h2>
          <p>
            Lựa chọn dịch vụ chăm sóc sức khỏe phù hợp với nhu cầu của bạn từ các gói cơ bản đến nâng cao
          </p>
        </div>

        <div className="plans-grid">
          {services.slice(0, 4).map((service) => (
            <div className="plan-card" key={service.id}>
              <div className="plan-icon">
                {iconMap[service.icon] || <ShieldCheck className="service-icon" />}
              </div>
              <h3>{service.title || service.name}</h3>
              <p className="plan-desc">{service.description}</p>

              <div className="plan-price">
                {service.oldPrice && service.oldPrice > service.price && (
                  <span className="old-price">{service.oldPrice.toLocaleString()}đ</span>
                )}
                <span className="current-price">
                  {service.price === 0 ? 'Miễn phí' : `${service.price.toLocaleString()}đ`}
                </span>
              </div>

              {service.duration && (
                <div className="plan-duration">{service.duration}</div>
              )}

              {Array.isArray(service.features) && service.features.length > 0 && (
                <ul className="plan-features">
                  {service.features.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              <button className="btn-primary" onClick={() => navigate(`/booking/${service.id}`)}>
                Đặt lịch
              </button>
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