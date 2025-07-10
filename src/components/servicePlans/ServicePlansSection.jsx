import React, { useState, useEffect } from 'react';
import {
  TestTube,
  Microscope,
  User,
  Calendar,
  ShieldCheck,
  Brain,
  Stethoscope
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // ✅ Hook auth
import axios from 'axios';
import './ServicePlansSection.css';

const iconMap = {
  TestTube: <TestTube className="service-icon" />,
  Microscope: <Microscope className="service-icon" />,
  User: <User className="service-icon" />,
  ShieldCheck: <ShieldCheck className="service-icon" />,
  Calendar: <Calendar className="service-icon" />,
  Brain: <Brain className="service-icon" />,
};

const iconKeys = ["TestTube", "Microscope", "User", "ShieldCheck", "Calendar", "Brain"];

const getOrCreateIconKey = (id) => {
  const cacheKey = `service-icon-${id}`;
  let iconKey = localStorage.getItem(cacheKey);
  if (!iconKey) {
    const randomIndex = Math.floor(Math.random() * iconKeys.length);
    iconKey = iconKeys[randomIndex];
    localStorage.setItem(cacheKey, iconKey);
  }
  return iconKey;
};

const ServicePlansSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ Lấy user
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/public/prices/test')
      .then((res) => {
        setServices(res.data || []);
      })
      .catch(() => {
        setServices([]);
      });
  }, []);

  // ✅ Xử lý click Đặt lịch
  const handleBookingClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/services/testing');
    }
  };

  return (
    <section className="plans-section">
      <div className="plans-container">
        <div className="plans-header">
          <span className="badge">Dịch vụ y tế chuyên nghiệp</span>
          <h2>Dịch vụ sức khỏe giới tính hàng đầu</h2>
          <p>
            Lựa chọn dịch vụ chăm sóc sức khỏe phù hợp với nhu cầu của bạn từ các gói cơ bản đến nâng cao.
          </p>
        </div>

        <div className="plans-grid">
          {services.slice(0, 4).map((service) => {
            const iconKey = getOrCreateIconKey(service.id || service.name || Math.random());
            const iconElement = iconMap[iconKey] || <ShieldCheck className="service-icon" />;

            return (
              <div className="plan-card" key={service.id}>
                <div className="plan-icon">{iconElement}</div>
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

                <button
                  className="btn-primary"
                  onClick={handleBookingClick}
                >
                  Đặt lịch
                </button>
              </div>
            );
          })}
        </div>

        <div className="plans-footer">
          <button
            className="btn-outline with-icon"
            onClick={() => navigate('/services/testing')}
          >
            Xem tất cả dịch vụ xét nghiệm <Stethoscope size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicePlansSection;
