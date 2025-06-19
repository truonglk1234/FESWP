import React from 'react';
import './CMHeader.css';

const CMHeader = ({ searchTerm, onSearchChange, statusFilter, onStatusChange }) => {
  return (
    <div className="cm-header">
      <div className="cm-header-top">
        <div>
          <h2 className="cm-header-title">Quản lý tư vấn viên</h2>
          <p className="cm-header-subtitle">Quản lý thông tin và lịch làm việc của tư vấn viên</p>
        </div>
        <button className="cm-add-button">Thêm tư vấn viên</button>
      </div>

      <div className="cm-header-controls">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc chuyên khoa..."
          className="cm-search-input"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <select
          className="cm-status-filter"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Đang hoạt động</option>
          <option value="inactive">Tạm nghỉ</option>
          <option value="busy">Bận</option>
        </select>
      </div>
    </div>
  );
};

export default CMHeader;
