import React from 'react';
import './TSHeader.css';

const TSHeader = () => {
  return (
    <div className="ts-header">
      <div className="ts-header-top">
        <div className="ts-header-text">
          <h2 className="ts-title">Quản lý dịch vụ xét nghiệm</h2>
          <p className="ts-subtitle">Quản lý các dịch vụ xét nghiệm STIs và đơn hàng</p>
        </div>
      </div>

      <div className="ts-stats">
        <div className="ts-card">
          <h4 className="ts-card-title">Tổng dịch vụ</h4>
          <h2 className="ts-card-number">5</h2>
          <p className="ts-card-sub">Đang hoạt động</p>
        </div>

        <div className="ts-card">
          <h4 className="ts-card-title">Đơn hàng tháng này</h4>
          <h2 className="ts-card-number blue">296</h2>
          <p className="ts-card-change plus">+18.2% so với tháng trước</p>
        </div>

        <div className="ts-card">
          <h4 className="ts-card-title">Đang xử lý</h4>
          <h2 className="ts-card-number orange">47</h2>
          <p className="ts-card-sub">Cần theo dõi</p>
        </div>

        <div className="ts-card">
          <h4 className="ts-card-title">Doanh thu tháng</h4>
          <h2 className="ts-card-number green">52.8M</h2>
          <p className="ts-card-change plus">+12.5% so với tháng trước</p>
        </div>
      </div>
    </div>
  );
};

export default TSHeader;
