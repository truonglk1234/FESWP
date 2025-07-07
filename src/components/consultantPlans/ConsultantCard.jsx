import {
  Calendar,
  ShieldCheck,
  User,
  Brain,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Bản đồ icon riêng (tuỳ bạn thêm icon khác nếu cần)
const iconMap = {
  User: <User className="consultant-icon" />,
  Brain: <Brain className="consultant-icon" />,
  ShieldCheck: <ShieldCheck className="consultant-icon" />
};

const normalizeIcon = (icon) => {
  if (!icon) return <ShieldCheck className="consultant-icon" />;
  const key = icon.replace(/[-_]/g, '').toLowerCase();
  const matchedKey = Object.keys(iconMap).find(k => k.toLowerCase() === key);
  return iconMap[matchedKey] ?? <ShieldCheck className="consultant-icon" />;
};

const ConsultantCard = ({ data }) => {
  const priceDisplay = data.price === 0
    ? 'Miễn phí'
    : `${data.price.toLocaleString()}đ`;

  const oldPriceDisplay =
    data.oldPrice && data.oldPrice > data.price
      ? `${data.oldPrice.toLocaleString()}đ`
      : null;

  return (
    <div className="consultant-card">
      <div className="consultant-icon-wrapper">
        {normalizeIcon(data.icon)}
      </div>

      <div className="consultant-content">
        <div className="consultant-header">
          <h3>{data.name || data.title || 'Không có tên'}</h3>
        </div>

        <p className="consultant-description">
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

        <div className="consultant-footer">
          <div className="price">
            {oldPriceDisplay && (
              <span className="old-price">{oldPriceDisplay}</span>
            )}
            <span className="current-price">{priceDisplay}</span>
          </div>

          <Link to={`/booking/${data.id}`} className="book-btn">
            <Calendar size={16} style={{ marginRight: '6px' }} /> Đặt lịch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConsultantCard;
