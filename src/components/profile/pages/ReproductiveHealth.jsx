import React, { useState } from 'react';
import './ReproductiveHealth.css';

const ReproductiveHealth = () => {
  const [cycleData, setCycleData] = useState({
    lastPeriod: '2024-05-20',
    averageCycle: 28,
  });

  const [reminders, setReminders] = useState({
    ovulation: true,
    fertility: true,
    pill: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCycleData(prev => ({ ...prev, [name]: value }));
  };

  const handleReminderToggle = (name) => {
    setReminders(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="info-wrapper">
      <div className="info-header">
        <h2>Sức khỏe sinh sản</h2>
        <p>Theo dõi sức khỏe sinh sản</p>
      </div>

      <div className="info-form">
        <div className="secure-alert">
          <span>🔒</span> Thông tin này được bảo mật và chỉ bạn mới có thể xem
        </div>

        <div className="form-row">
          <div className="form-col">
            <label>Ngày bắt đầu chu kỳ gần nhất</label>
            <input type="date" name="lastPeriod" value={cycleData.lastPeriod} onChange={handleChange} />
          </div>
          <div className="form-col">
            <label>Chu kỳ trung bình (ngày)</label>
            <input type="number" name="averageCycle" value={cycleData.averageCycle} onChange={handleChange} />
          </div>
        </div>

        <h3>Cài đặt nhắc nhở</h3>
        <div className="reminder-group">
          <div className="reminder-item">
            <label>
              <input type="checkbox" checked={reminders.ovulation} onChange={() => handleReminderToggle('ovulation')} />
            </label>
            <div>
              <strong>Ngày rụng trứng</strong>
              <p>Nhắc nhở trước 2 ngày</p>
            </div>
          </div>

          <div className="reminder-item">
            <label>
              <input type="checkbox" checked={reminders.fertility} onChange={() => handleReminderToggle('fertility')} />
            </label>
            <div>
              <strong>Khả năng mang thai cao</strong>
              <p>Thông báo trong giai đoạn dễ thụ thai</p>
            </div>
          </div>

          <div className="reminder-item">
            <label>
              <input type="checkbox" checked={reminders.pill} onChange={() => handleReminderToggle('pill')} />
            </label>
            <div>
              <strong>Nhắc uống thuốc tránh thai</strong>
              <p>Hàng ngày lúc 20:00</p>
            </div>
          </div>
        </div>

        <h3>Lịch sử chu kỳ (3 tháng gần nhất)</h3>
        <ul className="cycle-history">
          <li><strong>Tháng 5/2024</strong> <span>20/05 - 25/05 (28 ngày)</span></li>
          <li><strong>Tháng 4/2024</strong> <span>22/04 - 27/04 (30 ngày)</span></li>
          <li><strong>Tháng 3/2024</strong> <span>23/03 - 28/03 (27 ngày)</span></li>
        </ul>
      </div>
    </div>
  );
};

export default ReproductiveHealth;
