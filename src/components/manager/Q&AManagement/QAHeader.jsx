import React from 'react';
import './QAHeader.css';

const QAHeader = () => {
  return (
    <div className="qa-header">
      <div className="qa-header-top">
        <div>
          <h2 className="qa-title">Quản lý Q&A</h2>
          <p className="qa-subtitle">Kiểm duyệt câu hỏi và quản lý nội dung FAQ</p>
        </div>
        <button className="qa-new-btn">Tạo FAQ mới</button>
      </div>

      <div className="qa-filter-bar">
        <input
          type="text"
          placeholder="Tìm kiếm câu hỏi..."
          className="qa-search-input"
        />
        <select className="qa-select">
          <option>Tất cả trạng thái</option>
          <option>Chờ duyệt</option>
          <option>Đã duyệt</option>
          <option>Từ chối</option>
        </select>
        <select className="qa-select">
          <option>Tất cả danh mục</option>
          <option>Xét nghiệm</option>
          <option>Tâm lý</option>
          <option>Tìm mạch</option>
          <option>Dinh dưỡng</option>
          <option>Thuốc</option>
        </select>
      </div>
    </div>
  );
};

export default QAHeader;
