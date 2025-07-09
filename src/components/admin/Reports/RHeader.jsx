import './RHeader.css';
import { Download, FileText } from 'lucide-react';

const RHeader = () => {
  return (
    <div className="rheader-container">
      <div className="rheader-top">
        <div className="rheader-text">
          <h1 className="rheader-title">Báo cáo & Thống kê</h1>
          <p className="rheader-subtitle">
            Phân tích hiệu suất và xu hướng hoạt động
          </p>
        </div>
        <div className="rheader-actions">
          <button className="rheader-btn rheader-export">
            <Download size={16} /> Xuất báo cáo
          </button>
          <button className="rheader-btn rheader-create">
            <FileText size={16} /> Tạo báo cáo tuỳ chỉnh
          </button>
        </div>
      </div>

      <div className="rheader-cards">
        <div className="rheader-card revenue">
          <h4>Doanh thu tháng này</h4>
          <p className="rheader-value">71.000.000 đ</p>
          <span className="rheader-change">+14.5% so với tháng trước</span>
        </div>
        <div className="rheader-card users">
          <h4>Người dùng mới</h4>
          <p className="rheader-value">510</p>
          <span className="rheader-change">+12% so với tháng trước</span>
        </div>
        <div className="rheader-card tests">
          <h4>Xét nghiệm thực hiện</h4>
          <p className="rheader-value">520</p>
          <span className="rheader-change">+8.3% so với tháng trước</span>
        </div>
        <div className="rheader-card consults">
          <h4>Buổi tư vấn</h4>
          <p className="rheader-value">720</p>
          <span className="rheader-change">+10.8% so với tháng trước</span>
        </div>
      </div>
    </div>
  );
};

export default RHeader;
