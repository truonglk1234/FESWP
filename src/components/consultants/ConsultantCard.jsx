import React from 'react';
import { Calendar, Clock3, MapPin, Star, User } from 'lucide-react';

const ConsultantCard = ({ doc, viewMode }) => {
  return (
    <div className={`consultant-card ${viewMode}`}>
      <div className="card-top">
        <img
          src={doc.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}`}
          alt={doc.name}
          className="avatar"
        />
        <div className="rating"><Star size={14} /> {doc.rating}</div>
      </div>
      <div className="card-body">
        <h3 className="doctor-name">{doc.name}</h3>
        <div className="badges">
          {doc.specialties.map((s, i) => (
            <span key={i} className="badge">{s}</span>
          ))}
        </div>
        <div className="info"><MapPin size={14} /> {doc.location}</div>
        <div className="info"><User size={14} /> {doc.experience} năm</div>
        <div className="hospital">{doc.hospital}</div>
        <div className="info"><Clock3 size={14} /> {doc.nextSchedule}</div>
        <div className="info">👥 {doc.consults} lượt tư vấn • {doc.reviews} đánh giá</div>
      </div>
      <div className="consultant-footer">
        <div className="consultant-price">{doc.price.toLocaleString()} VND</div>
        <div className="consultant-actions">
            <button className="outline">Xem hồ sơ</button>
            <button className="solid"><Calendar size={16} /> Đặt khám</button>
        </div>
      </div>
    </div>
  );
};

export default ConsultantCard;