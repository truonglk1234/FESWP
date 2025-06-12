import React from 'react';
import './UserManagementHeader.css';

const UserManagementHeader = () => {
  return (
    <div className="container">
      {/* Header chứa tiêu đề bên trái và nút bên phải */}
      <div className="header-row">
        <div className="header-text">
          <h1 className="title">Quản lý người dùng</h1>
          <p className="subtitle">Quản lý tài khoản khách hàng</p>
        </div>
        <div className="top-right-buttons">
          <button className="btn export-btn">Xuất danh sách</button>
          <button className="btn add-btn">Thêm người dùng mới</button>
        </div>
      </div>

      {/* Thống kê */}
      <div className="stats">
        <div className="card">
          <p className="card-title">Tổng người dùng</p>
          <p className="card-value total">4</p>
        </div>
        <div className="card">
          <p className="card-title">Đang hoạt động</p>
          <p className="card-value active">2</p>
        </div>
        <div className="card">
          <p className="card-title">Bị khóa</p>
          <p className="card-value blocked">1</p>
        </div>
      </div>

      {/* Thanh tìm kiếm và lọc */}
      <div className="toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm theo tên hoặc email..."
        />
        <select className="status-filter">
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Đang hoạt động</option>
          <option value="blocked">Bị khóa</option>
        </select>
      </div>
    </div>
  );
};

export default UserManagementHeader;
