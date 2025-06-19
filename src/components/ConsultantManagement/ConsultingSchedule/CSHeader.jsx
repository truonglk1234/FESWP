import React from 'react';
import './CSHeader.css';

const CSHeader = () => {
  return (
    <div className="cs-header-container">
      <div className="cs-header-title">
        <h2>Lịch tư vấn</h2>
        <p>Quản lý các buổi tư vấn đã được đặt</p>
      </div>

      <div className="cs-filter-wrapper">
        <input
          type="text"
          className="cs-search-input"
          placeholder="Tìm kiếm theo tên khách hàng hoặc ghi chú..."
        />
        <button className="cs-filter-btn">Lọc theo ngày</button>
      </div>
    </div>
  );
};

export default CSHeader;
