import './RHeader.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Download, FileText } from 'lucide-react';

const RHeader = () => {
  const [summary, setSummary] = useState({
    totalIncomeThisMonth: 0,
    newAccountsThisMonth: 0,
    examinationCountThisMonth: 0,
    publishedBlogsThisMonth: 0
  });

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/admin/dashboard-summary')
      .then((res) => setSummary(res.data))
      .catch((err) => console.error('Lỗi khi lấy dashboard summary:', err));
  }, []);

  const formatCurrency = (amount) => {
    return amount?.toLocaleString('vi-VN') + ' đ';
  };

  return (
    <div className="rheader-container">
      <div className="rheader-top">
        <div className="rheader-text">
          <h1 className="rheader-title">Báo cáo & Thống kê</h1>
          <p className="rheader-subtitle">Phân tích hiệu suất và xu hướng hoạt động</p>
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
          <p className="rheader-value">{formatCurrency(summary.totalIncomeThisMonth)}</p>
        </div>
        <div className="rheader-card users">
          <h4>Người dùng mới</h4>
          <p className="rheader-value">{summary.newAccountsThisMonth}</p>
        </div>
        <div className="rheader-card tests">
          <h4>Xét nghiệm thực hiện</h4>
          <p className="rheader-value">{summary.examinationCountThisMonth}</p>
        </div>
        <div className="rheader-card consults">
          <h4>Bài viết đã đăng</h4>
          <p className="rheader-value">{summary.publishedBlogsThisMonth}</p>
        </div>
      </div>
    </div>
  );
};

export default RHeader;
