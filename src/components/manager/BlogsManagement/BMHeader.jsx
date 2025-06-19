import React from 'react';
import './BMHeader.css';

const BMHeader = ({ onStatusChange, onTopicChange, searchKeyword, setSearchKeyword }) => {
  return (
    <div className="bm-header">
      <div className="bm-header-top">
        <div>
          <h1>Quản lý blog</h1>
          <p className="subtitle">Tạo và quản lý nội dung blog y tế</p>
        </div>
      </div>

      <div className="bm-header-filters">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm bài viết..."
          className="search-input"
          value={searchKeyword}
          onChange={setSearchKeyword}
        />

        <select className="filter-select" onChange={(e) => onStatusChange(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option value="Chờ xác nhận">Chờ xác nhận</option>
          <option value="Đã xác nhận">Đã xác nhận</option>
          <option value="Đã từ chối">Đã từ chối</option>
        </select>

        <select className="filter-select" onChange={(e) => onTopicChange(e.target.value)}>
          <option value="">Tất cả chủ đề</option>
          <option value="Tim mạch">Tim mạch</option>
          <option value="Dinh dưỡng">Dinh dưỡng</option>
          <option value="Xét nghiệm">Xét nghiệm</option>
          <option value="Phòng ngừa">Phòng ngừa</option>
          <option value="Tâm lý">Tâm lý</option>
          <option value="Giấc ngủ">Giấc ngủ</option>
          <option value="Thể chất">Thể chất</option>
          <option value="Ung thư">Ung thư</option>
          <option value="Da liễu">Da liễu</option>
          <option value="Kiến thức">Kiến thức</option>
        </select>
      </div>
    </div>
  );
};

export default BMHeader;
