import React from 'react';
import './OHeader.css';
import { User, UserCheck, TestTube2, Calendar } from 'lucide-react';

const OHeader = () => {
  return (
    <div className="oheader-container">
      <h1 className="oheader-title">Hệ thống quản lý chăm sóc sức khỏe giới tính</h1>
      <p className="oheader-subtitle">
        Quản lý toàn diện dịch vụ y tế, tư vấn và xét nghiệm STIs
      </p>

      <div className="oheader-cards">
        <div className="oheader-card">
          <div className="oheader-card-content">
            <h4 className="oheader-card-title">Tổng người dùng</h4>
            <User className="oheader-icon icon-blue" size={20} />
          </div>
          <h2 className="oheader-card-number">2,847</h2>
          <p className="oheader-card-change plus">+12.5% so với tháng trước</p>
        </div>

        <div className="oheader-card">
          <div className="oheader-card-content">
            <h4 className="oheader-card-title">Tư vấn viên hoạt động</h4>
            <UserCheck className="oheader-icon icon-green" size={20} />
          </div>
          <h2 className="oheader-card-number">24</h2>
          <p className="oheader-card-change plus">+2 so với tháng trước</p>
        </div>

        <div className="oheader-card">
          <div className="oheader-card-content">
            <h4 className="oheader-card-title">Xét nghiệm trong tháng</h4>
            <TestTube2 className="oheader-icon icon-purple" size={20} />
          </div>
          <h2 className="oheader-card-number">456</h2>
          <p className="oheader-card-change plus">+8.2% so với tháng trước</p>
        </div>

        <div className="oheader-card">
          <div className="oheader-card-content">
            <h4 className="oheader-card-title">Lịch hẹn hôm nay</h4>
            <Calendar className="oheader-icon icon-orange" size={20} />
          </div>
          <h2 className="oheader-card-number">38</h2>
          <p className="oheader-card-change pending">6 pending so với tháng trước</p>
        </div>
      </div>
    </div>
  );
};

export default OHeader;
