import React, { useState } from 'react';
import {
  Calendar,
  ShieldCheck,
  TestTube,
  Microscope,
  User,
  Brain,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BookingModal from './TestBookingModal';

const iconMap = {
  TestTube: <TestTube className="service-icon" />,
  Microscope: <Microscope className="service-icon" />,
  User: <User className="service-icon" />,
  ShieldCheck: <ShieldCheck className="service-icon" />,
  Calendar: <Calendar className="service-icon" />,
  Brain: <Brain className="service-icon" />
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

const ServiceCard = ({ data }) => {
  const [showBooking, setShowBooking] = useState(false);
  const { user } = useAuth(); // ✅ Lấy user từ context
  const navigate = useNavigate(); // ✅ Hook điều hướng

  const iconKey = getOrCreateIconKey(data.id || data.name || Math.random());
  const iconElement = iconMap[iconKey] || <ShieldCheck className="service-icon" />;

  const priceDisplay = data.price === 0
    ? 'Miễn phí'
    : `${data.price.toLocaleString()}đ`;

  const oldPriceDisplay =
    data.oldPrice && data.oldPrice > data.price
      ? `${data.oldPrice.toLocaleString()}đ`
      : null;

  const handleBookingClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      setShowBooking(true);
    }
  };

  return (
    <>
      <div className="service-card">
        <div className="service-icon-wrapper">
          {iconElement}
        </div>

        <div className="service-content">
          <div className="service-header">
            <h3>{data.title || data.name || 'Không có tiêu đề'}</h3>
          </div>

          <p className="service-description">
            {data.description || 'Không có mô tả.'}
          </p>

          {Array.isArray(data.features) && data.features.length > 0 && (
            <ul className="features">
              {data.features.map((feature, i) => (
                <li key={i}>
                  <CheckCircle size={14} style={{ marginRight: '6px' }} />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <div className="service-footer">
            <div className="service-price">
              {oldPriceDisplay && (
                <span className="old-price">{oldPriceDisplay}</span>
              )}
              <span className="current-price">{priceDisplay}</span>
            </div>

            <button
              className="book-btn"
              onClick={handleBookingClick}
            >
              <Calendar size={16} style={{ marginRight: '6px' }} /> Đặt lịch
            </button>
          </div>
        </div>
      </div>

      {showBooking && (
        <BookingModal
          service={data}
          onClose={() => setShowBooking(false)}
        />
      )}
    </>
  );
};

export default ServiceCard;
