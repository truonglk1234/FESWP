import React from 'react';
import './MBHeader.css';
import { Plus } from 'lucide-react';

const MBHeader = () => {
  return (
    <div className="mb-header-container">
      <div className="mb-header-top">
        <div className="mb-header-title">
          <h1>Blog Y Tế</h1>
          <p>Cập nhật kiến thức y tế và xu hướng xét nghiệm mới nhất</p>
        </div>
        <button className="btn-create-post">
          <Plus size={18} />
          Tạo bài viết mới
        </button>
      </div>

      <div className="mb-filter-box">
        <h3>🔽 Bộ lọc</h3>

        <div className="mb-filter-section">
          <label>Tìm kiếm</label>
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm theo tiêu đề hoặc nội dung..."
          />
        </div>

        <div className="mb-select-row">
          <div className="mb-filter-section">
            <label>Danh mục</label>
            <select>
              <option>Tất cả danh mục</option>
              <option>Xét nghiệm</option>
              <option>Hướng dẫn</option>
              <option>Công nghệ</option>
              <option>Giải thích</option>
              <option>Xu hướng</option>
              <option>Quản lý</option>
            </select>
          </div>

          <div className="mb-filter-section">
            <label>Tác giả</label>
            <select>
              <option>Tất cả tác giả</option>
              <option>BS. Nguyễn Văn A</option>
              <option>BS. Trần Thị B</option>
              <option>ThS. Lê Văn C</option>
            </select>
          </div>

          <div className="mb-filter-section">
            <label>Sắp xếp</label>
            <select>
              <option>Mới nhất</option>
              <option>Cũ nhất</option>
              <option>Tiêu đề A-Z</option>
              <option>Tiêu đề Z-A</option>
              <option>Tác giả A-Z</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MBHeader;
