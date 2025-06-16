import React, { useState } from 'react';
import './FMBody.css';

const allFeedbacks = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    rating: 5,
    service: 'Tư vấn tim mạch',
    consultant: 'BS. Trần Thị B',
    content: 'Bác sĩ tư vấn rất tận tâm và chi tiết. Tôi rất hài lòng với dịch vụ.',
    status: 'Đã xử lý',
    date: '2024-06-03',
    highlighted: true,
    report: false
  },
  {
    id: 2,
    name: 'Lê Thị C',
    rating: 2,
    service: 'Xét nghiệm máu',
    consultant: 'BS. Phạm Văn D',
    content: 'Thời gian chờ quá lâu, nhân viên không nhiệt tình. Cần cải thiện.',
    status: 'Báo cáo tiêu cực',
    date: '2024-06-02',
    highlighted: false,
    report: true
  },
  {
    id: 3,
    name: 'Hoàng Minh E',
    rating: 4,
    service: 'Siêu âm bụng',
    consultant: 'BS. Vũ Thị F',
    content: 'Dịch vụ tốt, bác sĩ giải thích rõ ràng. Giá cả hợp lý.',
    status: 'Đã xử lý',
    date: '2024-06-01',
    highlighted: false,
    report: false
  },
  {
    id: 4,
    name: 'Phạm Thu H',
    rating: 3,
    service: 'Khám tổng quát',
    consultant: 'BS. Nguyễn Văn G',
    content: 'Dịch vụ ổn, nhưng còn chờ lâu.',
    status: 'Chờ xử lý',
    date: '2024-05-30',
    highlighted: false,
    report: false
  },
  {
    id: 5,
    name: 'Trần Văn I',
    rating: 1,
    service: 'Xét nghiệm nhanh',
    consultant: 'BS. Lê Thị J',
    content: 'Không hài lòng vì chờ quá lâu.',
    status: 'Báo cáo tiêu cực',
    date: '2024-05-29',
    highlighted: false,
    report: true
  },
  {
    id: 6,
    name: 'Ngô Thị K',
    rating: 5,
    service: 'Tư vấn dinh dưỡng',
    consultant: 'BS. Đặng Thị L',
    content: 'Tư vấn tận tình và chi tiết, rất ưng ý.',
    status: 'Đã xử lý',
    date: '2024-05-28',
    highlighted: true,
    report: false
  },
  {
    id: 7,
    name: 'Lưu Minh M',
    rating: 4,
    service: 'Khám tai mũi họng',
    consultant: 'BS. Trần Thị N',
    content: 'Bác sĩ tư vấn rõ ràng, dễ hiểu.',
    status: 'Đã xử lý',
    date: '2024-05-27',
    highlighted: false,
    report: false
  },
  {
    id: 8,
    name: 'Đào Thị O',
    rating: 3,
    service: 'Xét nghiệm máu',
    consultant: 'BS. Hồ Văn P',
    content: 'Bình thường, không có gì nổi bật.',
    status: 'Chờ xử lý',
    date: '2024-05-26',
    highlighted: false,
    report: false
  },
  {
    id: 9,
    name: 'Bùi Văn Q',
    rating: 2,
    service: 'Khám nội',
    consultant: 'BS. Mai Thị R',
    content: 'Dịch vụ chưa tốt, cần cải thiện thái độ.',
    status: 'Báo cáo tiêu cực',
    date: '2024-05-25',
    highlighted: false,
    report: true
  }
];

const FMBody = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(allFeedbacks.length / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const pagedFeedbacks = allFeedbacks.slice(startIdx, startIdx + itemsPerPage);

  return (
    <>
      <div className="fm-body">
        {pagedFeedbacks.map((fb) => (
          <div
            key={fb.id}
            className={`feedback-card ${
              fb.status === 'Đã xử lý' ? 'success' :
              fb.status === 'Báo cáo tiêu cực' ? 'danger' :
              fb.status === 'Chờ xử lý' ? 'pending' : ''
            }`}
          >
            <div className="feedback-header">
              <div>
                <span className="user-icon">👤</span>
                <span className="user-name">{fb.name}</span>
                <span className="stars">
                  {'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}
                </span>
                <span className="rating">({fb.rating}/5)</span>
                {fb.highlighted && <span className="badge highlight">Nổi bật</span>}
              </div>
              <div className="status-date">
                <span className={`status ${
                  fb.status === 'Đã xử lý' ? 'status-success' :
                  fb.status === 'Báo cáo tiêu cực' ? 'status-danger' :
                  fb.status === 'Chờ xử lý' ? 'status-pending' : ''
                }`}>
                  {fb.status}
                </span>
                <span className="date">📅 {fb.date}</span>
              </div>
            </div>

            <div className="feedback-info">
              Dịch vụ: <strong>{fb.service}</strong> &nbsp; Tư vấn viên: <strong>{fb.consultant}</strong>
            </div>

            <div className="feedback-content">
              <span className="comment-icon">💬</span>
              {fb.content}
            </div>

            <div className="feedback-actions">
              {fb.report && <button className="btn danger">🚩 Xử lý báo cáo</button>}
              <button className="btn">Trả lời khách hàng</button>
              <button className="btn">Gắn nổi bật</button>
            </div>
          </div>
        ))}
      </div>

      <div className="fm-footer">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ‹ Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next ›
        </button>
      </div>
    </>
  );
};

export default FMBody;
