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
// import { Link } from 'react-router-dom'; // Bỏ Link vì không dùng nữa
import BookingModal from './BookingModal'; // Import component modal

const iconMap = {
  TestTube: <TestTube className="service-icon" />,
  Microscope: <Microscope className="service-icon" />,
  User: <User className="service-icon" />,
  ShieldCheck: <ShieldCheck className="service-icon" />,
  Calendar: <Calendar className="service-icon" />,
  Brain: <Brain className="service-icon" />
};

const normalizeIcon = (icon) => {
  if (!icon) return <ShieldCheck className="service-icon" />;
  const key = icon.replace(/[-_]/g, '').toLowerCase();
  const matchedKey = Object.keys(iconMap).find(k => k.toLowerCase() === key);
  return iconMap[matchedKey] ?? <ShieldCheck className="service-icon" />;
};

const ServiceCard = ({ data }) => {
  const [showBooking, setShowBooking] = useState(false);

  const priceDisplay = data.price === 0
    ? 'Miễn phí'
    : `${data.price.toLocaleString()}đ`;

  const oldPriceDisplay =
    data.oldPrice && data.oldPrice > data.price
      ? `${data.oldPrice.toLocaleString()}đ`
      : null;

  return (
    <>
      <div className="service-card">
        <div className="service-icon-wrapper">
          {normalizeIcon(data.icon)}
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
              onClick={() => setShowBooking(true)}
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
