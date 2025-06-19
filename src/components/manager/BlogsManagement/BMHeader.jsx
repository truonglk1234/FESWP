import React from 'react';
import './BMHeader.css';

const BMHeader = () => {
  return (
    <div className="bm-header">
      <div className="bm-header-top">
        <div>
          <h1>Quản lý blog</h1>
          <p className="subtitle">Tạo và quản lý nội dung blog y tế</p>
        </div>
        <button className="create-btn">
           Tạo bài viết mới
        </button>
      </div>

      <div className="bm-header-filters">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm bài viết..."
          className="search-input"
        />

        <select className="filter-select">
          <option>Tất cả trạng thái</option>
          <option>Đã đăng</option>
          <option>Bản nháp</option>
          <option>Đã lên lịch</option>
        </select>

        <select className="filter-select">
          <option>Tất cả chủ đề</option>
          <option>Tim mạch</option>
          <option>Dinh dưỡng</option>
          <option>Xét nghiệm</option>
          <option>Phòng ngừa</option>
          <option>Tâm lý</option>
        </select>
      </div>
    </div>
  );
};

export default BMHeader;
