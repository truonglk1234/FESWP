import { Calendar, Clock3, Star, ShieldCheck } from 'lucide-react';

const ServiceCard = ({ data, viewMode }) => {
  const priceDisplay = data.price === 0 ? 'Miễn phí' : `${data.price.toLocaleString()} VND`;
  const oldPriceDisplay =
    data.oldPrice && data.oldPrice > data.price
      ? `${data.oldPrice.toLocaleString()} VND`
      : null;

  return (
    <div className={`service-card ${viewMode}`}>
      <div className="card-top">
        <div className="icon-wrapper">{data.icon || <ShieldCheck />}</div>
        <div className="rating"><Star size={14} /> {data.rating}</div>
      </div>

      <div className="card-body">
        <h3 className="service-title">{data.title}</h3>
        <div className="badges">
          {data.features?.slice(0, 2).map((feature, i) => (
            <span key={i} className="badge">{feature}</span>
          ))}
        </div>
        <div className="info"><Clock3 size={14} /> {data.duration}</div>
        <p className="description">{data.description}</p>
        <div className="info">⭐ {data.reviews} đánh giá</div>
      </div>

      <div className="service-footer">
        <div className="service-price">
          {oldPriceDisplay && <span className="old-price">{oldPriceDisplay}</span>}
          <span className="current-price">{priceDisplay}</span>
        </div>
        <div className="service-actions">
          <button className="outline">Chi tiết</button>
          <button className="solid"><Calendar size={16} /> Đặt lịch</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
