// TSHeader.jsx
import './TSHeader.css';
import { CalendarCheck, CalendarDays, Filter, Search } from 'lucide-react';

const TSHeader = () => {
  return (
    <div className="ts-header">
      <div className="ts-header-title">
        <CalendarCheck className="ts-header-icon" />
        <div>
          <h1>Lịch làm việc & xét nghiệm</h1>
          <p>Quản lý và cập nhật trạng thái lịch hẹn</p>
        </div>
      </div>

      <div className="ts-filter">
        <div className="filter-header">
          <Filter size={18} />
          <span>Bộ lọc</span>
        </div>

        <div className="filter-form">
          <div className="form-group full">
            <label htmlFor="search">Tìm kiếm</label>
            <div className="input-icon">
              <Search size={16} />
              <input id="search" type="text" placeholder="Tìm kiếm khách hàng, dịch vụ hoặc ghi chú..." />
            </div>
          </div>

          <div className="form-group">
            <label>Trạng thái</label>
            <select>
              <option>Tất cả trạng thái</option>
              <option>Chờ xử lý</option>
              <option>Đang xử lý</option>
              <option>Hoàn tất</option>
            </select>
          </div>

          <div className="form-group">
            <label>Sắp xếp</label>
            <select>
              <option>Giờ hẹn sớm nhất</option>
              <option>Giờ hẹn muộn nhất</option>
              <option>Tên khách hàng A-Z</option>
              <option>Ưu tiên trạng thái</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TSHeader;
