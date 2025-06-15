import React from 'react';
import './FMHeader.css';

const FMHeader = () => {
  return (
    <div className="fm-header">
      <div className="fm-header-top">
        <h2 className="fm-title">Quản lý phản hồi</h2>
        <p className="fm-subtitle">Theo dõi và xử lý phản hồi từ khách hàng</p>
      </div>

      <div className="fm-filter-container">
        <input
          type="text"
          placeholder="Tìm kiếm phản hồi..."
          className="fm-input"
        />

        <select className="fm-select">
          <option>Tất cả đánh giá</option>
          <option>5 sao</option>
          <option>4 sao</option>
          <option>3 sao</option>
          <option>2 sao</option>
          <option>1 sao</option>
        </select>

        <select className="fm-select">
          <option>Tất cả trạng thái</option>
          <option>Đã xử lý</option>
          <option>Báo cáo tiêu cực</option>
          <option>Chờ xử lý</option>
        </select>
      </div>
    </div>
  );
};

export default FMHeader;
