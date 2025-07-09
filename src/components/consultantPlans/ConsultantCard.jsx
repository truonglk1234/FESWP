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
import ConsultingBookingModal from './ConsultingBookingModal';

const iconMap = {
  TestTube: <TestTube className="consultant-icon" />,
  Microscope: <Microscope className="consultant-icon" />,
  User: <User className="consultant-icon" />,
  ShieldCheck: <ShieldCheck className="consultant-icon" />,
  Calendar: <Calendar className="consultant-icon" />,
  Brain: <Brain className="consultant-icon" />
};

const normalizeIcon = (icon) => {
  if (!icon) return <ShieldCheck className="consultant-icon" />;
  const key = icon.replace(/[-_]/g, '').toLowerCase();
  const matchedKey = Object.keys(iconMap).find(k => k.toLowerCase() === key);
  return iconMap[matchedKey] ?? <ShieldCheck className="consultant-icon" />;
};

const ConsultantCard = ({ data }) => {
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
      <div className="consultant-card">
        <div className="consultant-icon-wrapper">
          {normalizeIcon(data.icon)}
        </div>

        <div className="consultant1-content">
          <div className="consultant-header">
            <h3>{data.title || data.name || 'Không có tiêu đề'}</h3>
          </div>

          <p className="consultant-description">
            {data.description || 'Không có mô tả.'}
          </p>

          {Array.isArray(data.features) && data.features.length > 0 && (
            <ul className="consultant-features">
              {data.features.map((feature, i) => (
                <li key={i}>
                  <CheckCircle size={14} style={{ marginRight: '6px' }} />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {/* ✅ Footer: giá + nút nằm cùng 1 hàng */}
          <div className="consultants-footer">
            <div className="consultant-price">
              {oldPriceDisplay && (
                <span className="consultant-old-price">{oldPriceDisplay}</span>
              )}
              <span className="current-price">{priceDisplay}</span>
            </div>

            <button
              className="consultant-book-btn"
              onClick={() => setShowBooking(true)}
            >
              <Calendar size={16} style={{ marginRight: '6px' }} /> Đặt lịch
            </button>
          </div>
        </div>
      </div>

      {showBooking && (
        <ConsultingBookingModal
          service={data}
          onClose={() => setShowBooking(false)}
        />
      )}
    </>
  );
};

export default ConsultantCard;
