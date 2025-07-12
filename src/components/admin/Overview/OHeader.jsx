import React, { useEffect, useState } from 'react';
import './OHeader.css';
import { User, UserCheck, TestTube2, Calendar } from 'lucide-react';
import axios from 'axios';

const OHeader = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/admin/dashboard-summary')
      .then(res => {
        setSummary(res.data);
      })
      .catch(err => {
        console.error("❌ Lỗi lấy dữ liệu dashboard:", err);
      });
  }, []);

  if (!summary) {
    return <div>Đang tải dữ liệu...</div>;
  }

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
          <h2 className="oheader-card-number">{summary.totalUsers.toLocaleString()}</h2>
        </div>

        <div className="oheader-card">
          <div className="oheader-card-content">
            <h4 className="oheader-card-title">Tư vấn viên hoạt động</h4>
            <UserCheck className="oheader-icon icon-green" size={20} />
          </div>
          <h2 className="oheader-card-number">{summary.consultants}</h2>
        </div>

        <div className="oheader-card">
          <div className="oheader-card-content">
            <h4 className="oheader-card-title">Xét nghiệm trong tháng</h4>
            <TestTube2 className="oheader-icon icon-purple" size={20} />
          </div>
          <h2 className="oheader-card-number">{summary.examinationCountThisMonth}</h2>
        </div>

        <div className="oheader-card">
          <div className="oheader-card-content">
            <h4 className="oheader-card-title">Lịch hẹn hôm nay</h4>
            <Calendar className="oheader-icon icon-orange" size={20} />
          </div>
          <h2 className="oheader-card-number">38</h2>
        </div>
      </div>
    </div>
  );
};

export default OHeader;
