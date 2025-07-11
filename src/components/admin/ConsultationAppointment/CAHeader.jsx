import React from 'react';
import './CAHeader.css';
import { Calendar, CheckCircle, MessageSquare } from 'lucide-react';

const CAHeader = () => {
  return (
    <div className="ca-header">
      <div className="ca-header-top">
        <h1 className="ca-title">Quản lý lịch hẹn tư vấn</h1>
        <p className="ca-subtitle">Theo dõi và quản lý các cuộc hẹn tư vấn trực tuyến</p>
      </div>

      <div className="ca-stats-row">
        <div className="ca-stat-card">
          <p className="ca-stat-title">Hôm nay</p>
          <h2 className="ca-stat-value">12</h2>
          <p className="ca-stat-desc">lịch hẹn</p>
        </div>

        <div className="ca-stat-card">
          <p className="ca-stat-title">Chờ xác nhận</p>
          <h2 className="ca-stat-value pending">6</h2>
          <p className="ca-stat-desc">cần xử lý</p>
        </div>

        <div className="ca-stat-card">
          <p className="ca-stat-title">Tuần này</p>
          <h2 className="ca-stat-value blue">89</h2>
          <p className="ca-stat-desc plus">+15% so với tuần trước</p>
        </div>

        <div className="ca-stat-card">
          <p className="ca-stat-title">Tỷ lệ hoàn thành</p>
          <h2 className="ca-stat-value green">94%</h2>
          <p className="ca-stat-desc">trong tháng này</p>
        </div>
      </div>

      <div className="ca-actions-row">
        <div className="ca-action-card blue">
          <Calendar className="ca-action-icon" size={24} />
          <div className="ca-action-content">
            <h3>Lịch hẹn chờ xác nhận</h3>
            <p>6 lịch hẹn cần được xem xét</p>
          </div>
          <button className="ca-action-btn blue">Xem danh sách</button>
        </div>

        <div className="ca-action-card green">
          <CheckCircle className="ca-action-icon" size={24} />
          <div className="ca-action-content">
            <h3>Hoàn thành hôm nay</h3>
            <p>8 cuộc tư vấn đã kết thúc</p>
          </div>
          <button className="ca-action-btn">Xem báo cáo</button>
        </div>

        <div className="ca-action-card orange">
          <MessageSquare className="ca-action-icon" size={24} />
          <div className="ca-action-content">
            <h3>Câu hỏi tư vấn mới</h3>
            <p>15 câu hỏi chưa trả lời</p>
          </div>
          <button className="ca-action-btn orange">Trả lời ngay</button>
        </div>
      </div>
    </div>
  );
};

export default CAHeader;
