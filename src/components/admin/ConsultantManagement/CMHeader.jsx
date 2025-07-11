import React from 'react';
import './CMHeader.css';
import { UserPlus } from 'lucide-react';

const CMHeader = () => {
  return (
    <div className="cm-header">
      <div className="cm-header-top">
        <div className="cm-header-text">
          <h2 className="cm-title">Quản lý tư vấn viên</h2>
          <p className="cm-subtitle">Quản lý thông tin và lịch làm việc của tư vấn viên</p>
        </div>
        <button className="cm-add-btn">
          <UserPlus size={16} /> Thêm tư vấn viên
        </button>
      </div>

      <div className="cm-stats">
        <div className="cm-card">
          <h4 className="cm-card-title">Tổng tư vấn viên</h4>
          <h2 className="cm-card-number">24</h2>
          <p className="cm-card-change plus">+2 tuần này</p>
        </div>

        <div className="cm-card">
          <h4 className="cm-card-title">Đang hoạt động</h4>
          <h2 className="cm-card-number green">18</h2>
          <p className="cm-card-sub">75% tổng số</p>
        </div>

        <div className="cm-card">
          <h4 className="cm-card-title">Phiên tư vấn tháng này</h4>
          <h2 className="cm-card-number blue">1,263</h2>
          <p className="cm-card-change plus">+15% so với tháng trước</p>
        </div>

        <div className="cm-card">
          <h4 className="cm-card-title">Đánh giá trung bình</h4>
          <h2 className="cm-card-number gold">4.7</h2>
          <p className="cm-card-sub">Từ 1,847 đánh giá</p>
        </div>
      </div>
    </div>
  );
};

export default CMHeader;
