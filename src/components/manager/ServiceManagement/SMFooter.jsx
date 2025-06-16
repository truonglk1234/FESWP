import React from 'react';
import './SMFooter.css';

const SMFooter = ({ total = 15, active = 11, orders = 100 }) => {
  return (
    <div className="sm-footer">
      <div className="stat-card">
        <div className="stat-info">
          <span className="stat-title">Tổng dịch vụ</span>
          <span className="stat-value blue">{total}</span>
        </div>
        <div className="stat-icon blue-bg">＋</div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <span className="stat-title">Dịch vụ hoạt động</span>
          <span className="stat-value green">{active}</span>
        </div>
        <div className="stat-icon green-bg">🕒</div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <span className="stat-title">Tổng lượt đặt</span>
          <span className="stat-value purple">{orders}</span>
        </div>
        <div className="stat-icon purple-bg">$</div>
      </div>
    </div>
  );
};

export default SMFooter;
