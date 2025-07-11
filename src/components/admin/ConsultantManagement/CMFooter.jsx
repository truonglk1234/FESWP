import React from 'react';
import './CMFooter.css';
import { Filter, Search, MoreHorizontal, Star } from 'lucide-react';

const consultants = [
  {
    initials: 'MA',
    name: 'BS. Nguyễn Minh Anh',
    experience: '8 năm kinh nghiệm',
    specialty: 'Sản phụ khoa',
    certifications: 2,
    rating: 4.8,
    stars: 4,
    totalSessions: 342,
    monthSessions: 28,
    status: 'Sẵn sàng',
    nextSchedule: '14:30 hôm nay',
  },
  {
    initials: 'TB',
    name: 'BS. Trần Thị Bích',
    experience: '5 năm kinh nghiệm',
    specialty: 'Tâm lý học',
    certifications: 2,
    rating: 4.9,
    stars: 5,
    totalSessions: 198,
    monthSessions: 35,
    status: 'Bận',
    nextSchedule: '09:00 ngày mai',
  },
  {
    initials: 'VH',
    name: 'BS. Lê Văn Hoàng',
    experience: '12 năm kinh nghiệm',
    specialty: 'Nam khoa',
    certifications: 2,
    rating: 4.7,
    stars: 4,
    totalSessions: 456,
    monthSessions: 22,
    status: 'Sẵn sàng',
    nextSchedule: '16:00 hôm nay',
  },
  {
    initials: 'TL',
    name: 'BS. Phạm Thị Lan',
    experience: '6 năm kinh nghiệm',
    specialty: 'Nhiễm khuẩn',
    certifications: 2,
    rating: 4.6,
    stars: 4,
    totalSessions: 267,
    monthSessions: 31,
    status: 'Offline',
    nextSchedule: '10:30 thứ 2',
  },
];

const CMFooter = () => {
  return (
    <div className="cm-footer">
      <div className="cm-footer-header">
        <div>
          <h3 className="cm-footer-title">Danh sách tư vấn viên</h3>
          <p className="cm-footer-subtitle">Quản lý thông tin và hoạt động của {consultants.length} tư vấn viên</p>
        </div>
        <div className="cm-footer-tools">
          <div className="cm-search-box">
            <Search size={16} />
            <input type="text" placeholder="Tìm kiếm tư vấn viên..." />
          </div>
          <button className="cm-filter-btn">
            <Filter size={16} /> Lọc
          </button>
        </div>
      </div>

      <table className="cm-table">
        <thead>
          <tr>
            <th>Tư vấn viên</th>
            <th>Chuyên môn</th>
            <th>Đánh giá</th>
            <th>Phiên tư vấn</th>
            <th>Trạng thái</th>
            <th>Lịch tiếp theo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {consultants.map((c, i) => (
            <tr key={i}>
              <td>
                <div className="cm-user-info">
                  <span className="cm-user-initials">{c.initials}</span>
                  <div>
                    <p className="cm-user-name">{c.name}</p>
                    <p className="cm-user-exp">{c.experience}</p>
                  </div>
                </div>
              </td>
              <td>
                <span className="cm-badge">{c.specialty}</span><br />
                <span className="cm-cert">{c.certifications} chứng chỉ</span>
              </td>
              <td>
                <div className="cm-rating">
                  {[...Array(c.stars)].map((_, idx) => (
                    <Star key={idx} size={14} fill="#facc15" stroke="#facc15" />
                  ))}
                  {[...Array(5 - c.stars)].map((_, idx) => (
                    <Star key={idx} size={14} stroke="#facc15" />
                  ))}
                  <span>{c.rating}</span>
                </div>
              </td>
              <td>
                <strong>{c.totalSessions} tổng</strong><br />
                {c.monthSessions} tháng này
              </td>
              <td>
                <span className={`cm-status ${c.status.toLowerCase()}`}>
                  {c.status}
                </span>
              </td>
              <td>{c.nextSchedule}</td>
              <td><MoreHorizontal size={18} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CMFooter;
