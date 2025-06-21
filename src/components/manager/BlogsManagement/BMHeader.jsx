import React from 'react';
import './BMHeader.css';

const BMHeader = ({
  onStatusChange,
  onTopicChange,
  searchKeyword,
  setSearchKeyword,
  topics = [] // Đảm bảo không undefined
}) => {
  return (
    <div className="bm-header">
      <div className="bm-header-top">
        <div>
          <h1>Quản lý blog</h1>
          <p className="subtitle">Tạo và quản lý nội dung blog y tế</p>
        </div>
      </div>

      
    </div>
  );
};

export default BMHeader;
