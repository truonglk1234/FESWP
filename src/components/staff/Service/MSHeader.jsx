import './MSHeader.css';
import { ClipboardList, Plus, Filter, Search } from 'lucide-react';

const MSHeader = () => {
  return (
    <div className="ms-header-container">
      <div className="ms-header-bar">
        <h2>
          <ClipboardList size={22} className="ms-icon" />
          Danh sách dịch vụ y tế
        </h2>
        <button className="ms-add-btn">
          <Plus size={16} /> Thêm dịch vụ
        </button>
      </div>
      <p className="ms-subtitle">Quản lý các dịch vụ xét nghiệm được giao</p>

      <div className="ms-filter-box">
        <div className="ms-filter-title">
          <Filter size={18} />
          <span>Bộ lọc</span>
        </div>

        <div className="ms-filter-body">
          <div className="ms-search-box">
            <label>Tìm kiếm</label>
            <div className="ms-search-input">
              <Search size={16} />
              <input type="text" placeholder="Tìm kiếm theo tên dịch vụ hoặc mô tả..." />
            </div>
          </div>

          <div className="ms-filter-selects">
            <div>
              <label>Danh mục</label>
              <select>
                <option>Tất cả dịch vụ</option>
                <option>Xét nghiệm STIs</option>
                <option>Xét nghiệm định kỳ</option>
                <option>Xét nghiệm giới tính</option>
              </select>
            </div>
            <div>
              <label>Sắp xếp</label>
              <select>
                <option>Tên A-Z</option>
                <option>Tên Z-A</option>
                <option>Tổng số nhiều nhất</option>
                <option>Tổng số ít nhất</option>
                <option>Tháng này nhiều nhất</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MSHeader;
