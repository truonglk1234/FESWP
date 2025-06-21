import './TRHeader.css';
import { Filter, Search, ClipboardList, Send } from 'lucide-react';

const TRHeader = () => {
  return (
    <div className="tr-container">
      <div className="tr-header">
        <h2><ClipboardList className="tr-icon" /> Nhập & gửi kết quả xét nghiệm</h2>
        <p>Quản lý kết quả và gửi thông báo cho khách hàng</p>
      </div>

      <div className="tr-filter">
        <div className="tr-filter-header">
          <Filter size={18} />
          <span>Bộ lọc</span>
        </div>

        <div className="tr-filter-body">
          <div className="tr-search">
            <label htmlFor="search">Tìm kiếm</label>
            <div className="tr-input-wrapper">
              <Search size={16} />
              <input type="text" placeholder="Tìm kiếm khách hàng, dịch vụ hoặc mã mẫu..." />
            </div>
          </div>

          <div className="tr-select-group">
            <div className="tr-select">
              <label htmlFor="status">Trạng thái</label>
              <select id="status">
                <option>Tất cả trạng thái</option>
                <option>Chưa có kết quả</option>
                <option>Đã gửi kết quả</option>
              </select>
            </div>

            <div className="tr-select">
              <label htmlFor="sort">Sắp xếp</label>
              <select id="sort">
                <option>Mới nhất</option>
                <option>Cũ nhất</option>
                <option>Tên khách hàng A-Z</option>
                <option>Dịch vụ A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TRHeader;
