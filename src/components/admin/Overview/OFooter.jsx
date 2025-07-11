import React from 'react';
import './OFooter.css';
import { Clock } from 'lucide-react';

const recentActivities = [
  { initials: 'NTM', name: 'Nguyễn Thị Mai', action: 'Đặt lịch xét nghiệm HIV', status: 'Chờ xử lý', time: '5 phút trước' },
  { initials: 'TVM', name: 'Trần Văn Minh', action: 'Hoàn thành tư vấn trực tuyến', status: 'Hoàn thành', time: '12 phút trước' },
  { initials: 'LTH', name: 'Lê Thị Hoa', action: 'Nhận kết quả xét nghiệm', status: 'Hoàn thành', time: '25 phút trước' },
  { initials: 'PĐA', name: 'Phạm Đức Anh', action: 'Đặt câu hỏi tư vấn', status: 'Chờ xử lý', time: '1 giờ trước' },
];

const quickActions = [
  { title: 'Lịch hẹn chờ duyệt', count: 6, color: 'blue', percent: 60 },
  { title: 'Kết quả xét nghiệm', count: 12, color: 'yellow', percent: 80 },
  { title: 'Phản hồi mới', count: 8, color: 'green', percent: 40 },
];

const OFooter = () => {
  return (
    <div className="ofooter-container">
      <div className="ofooter-left">
        <div className="ofooter-header">
          <Clock size={20} className="ofooter-icon" />
          <h3 className="ofooter-title">Hoạt động gần đây</h3>
        </div>
        <ul className="ofooter-activity-list">
          {recentActivities.map((item, index) => (
            <li key={index} className="ofooter-activity-item">
              <div className="ofooter-initials">{item.initials}</div>
              <div className="ofooter-activity-info">
                <h4>{item.name}</h4>
                <p>{item.action}</p>
              </div>
              <span className={`ofooter-status ${item.status === 'Hoàn thành' ? 'done' : 'pending'}`}>
                {item.status}
              </span>
              <span className="ofooter-time">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="ofooter-right">
        <h3 className="ofooter-title">Thao tác nhanh</h3>
        <ul className="ofooter-quick-list">
          {quickActions.map((item, index) => (
            <li key={index} className={`ofooter-quick-item ${item.color}`}>
              <div className="ofooter-quick-header">
                <span>{item.title}</span>
                <span className="ofooter-quick-count">{item.count}</span>
              </div>
              <div className="ofooter-progress">
                <div className="ofooter-progress-bar" style={{ width: `${item.percent}%` }}></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OFooter;
