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
import { useNavigate } from 'react-router-dom'; // ✅ Thêm
import { useAuth } from '../../context/AuthContext'; // ✅ Thêm
import ConsultingBookingModal from './ConsultingBookingModal';

// Danh sách icon y tế
const iconList = [ShieldCheck, TestTube, Microscope, User, Calendar, Brain];

// Hàm: lấy hoặc tạo icon cố định theo id
const getOrCreateIconKey = (id) => {
  const cacheKey = `consultant-icon-${id}`;
  let iconIndex = localStorage.getItem(cacheKey);

  if (!iconIndex) {
    const randomIndex = Math.floor(Math.random() * iconList.length);
    iconIndex = randomIndex.toString();
    localStorage.setItem(cacheKey, iconIndex);
  }

  return parseInt(iconIndex, 10);
};

const ConsultantCard = ({ data }) => {
  const [showBooking, setShowBooking] = useState(false);
  const { user } = useAuth(); // ✅ Lấy user
  const navigate = useNavigate(); // ✅ Hook điều hướng

  // ✅ Lấy icon index cố định từ localStorage
  const [iconIndex] = useState(() => getOrCreateIconKey(data.id));
  const Icon = iconList[iconIndex] || ShieldCheck;

  const priceDisplay = data.price === 0
    ? 'Miễn phí'
    : `${data.price.toLocaleString()}đ`;

  const oldPriceDisplay =
    data.oldPrice && data.oldPrice > data.price
      ? `${data.oldPrice.toLocaleString()}đ`
      : null;

  // ✅ Xử lý nút đặt lịch
  const handleBookingClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      setShowBooking(true);
    }
  };

  return (
    <>
      <div className="consultant-card">
        <div className="consultant-icon-wrapper">
          <Icon className="consultant-icon" />
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

          <div className="consultants-footer">
            <div className="consultant-price">
              {oldPriceDisplay && (
                <span className="consultant-old-price">{oldPriceDisplay}</span>
              )}
              <span className="current-price">{priceDisplay}</span>
            </div>

            <button
              className="consultant-book-btn"
              onClick={handleBookingClick}
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
