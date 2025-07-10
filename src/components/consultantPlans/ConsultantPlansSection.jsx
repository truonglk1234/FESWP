import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Brain,
  User,
  Calendar,
  Stethoscope,
  TestTube,
  Microscope
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // ✅ Hook auth
import axios from 'axios';
import './ConsultantPlansSection.css';

const iconMap = {
  ShieldCheck: <ShieldCheck className="consultant-icon" />,
  Brain: <Brain className="consultant-icon" />,
  User: <User className="consultant-icon" />,
  Calendar: <Calendar className="consultant-icon" />,
  TestTube: <TestTube className="consultant-icon" />,
  Microscope: <Microscope className="consultant-icon" />,
};

const iconKeys = ["ShieldCheck", "Brain", "User", "Calendar", "TestTube", "Microscope"];

const getOrCreateIconKey = (id) => {
  const cacheKey = `consultant-icon-${id}`;
  let iconKey = localStorage.getItem(cacheKey);
  if (!iconKey) {
    const randomIndex = Math.floor(Math.random() * iconKeys.length);
    iconKey = iconKeys[randomIndex];
    localStorage.setItem(cacheKey, iconKey);
  }
  return iconKey;
};

const ConsultantPlansSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ Lấy user
  const [consultants, setConsultants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/public/prices/advice')
      .then((res) => {
        setConsultants(res.data || []);
      })
      .catch(() => {
        setConsultants([]);
      });
  }, []);

  // ✅ Xử lý nút Đặt lịch chuẩn luồng: nếu chưa login → login, đã login → qua trang danh sách dịch vụ tư vấn
  const handleBookingClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/services/consulting');
    }
  };

  return (
    <section className="consultant-plans-section">
      <div className="consultant-plans-container">
        <div className="consultant-plans-header">
          <span className="badge">Dịch vụ tư vấn chuyên nghiệp</span>
          <h2>Tư vấn sức khỏe giới tính đáng tin cậy</h2>
          <p>
            Đội ngũ chuyên gia tư vấn đồng hành cùng bạn, giải đáp thắc mắc và đưa ra giải pháp kịp thời.
          </p>
        </div>

        <div className="consultant-plans-grid">
          {consultants.slice(0, 4).map((consultant) => {
            const iconKey = getOrCreateIconKey(consultant.id || consultant.name || Math.random());
            const iconElement = iconMap[iconKey] || <ShieldCheck className="consultant-icon" />;

            return (
              <div className="consultant-plan-card" key={consultant.id}>
                <div className="consultant-plan-icon">{iconElement}</div>
                <h3>{consultant.title || consultant.name}</h3>
                <p className="consultant-plan-desc">{consultant.description || 'Không có mô tả.'}</p>

                <div className="consultant-plan-price">
                  {consultant.oldPrice && consultant.oldPrice > consultant.price && (
                    <span className="old-price">{consultant.oldPrice.toLocaleString()}đ</span>
                  )}
                  <span className="current-price">
                    {consultant.price === 0 ? 'Miễn phí' : `${consultant.price.toLocaleString()}đ`}
                  </span>
                </div>

                {consultant.experience && (
                  <div className="consultant-plan-duration">
                    {consultant.experience} năm kinh nghiệm
                  </div>
                )}

                {Array.isArray(consultant.features) && consultant.features.length > 0 && (
                  <ul className="consultant-plan-features">
                    {consultant.features.map((item, i) => (
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

        <div className="consultant-plans-footer">
          <button
            className="btn-outline with-icon"
            onClick={() => navigate('/services/consulting')}
          >
            Xem tất cả dịch vụ tư vấn <Stethoscope size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConsultantPlansSection;
