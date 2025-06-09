import React, { useState } from 'react';
import './ServiceContent.css';
import {
  Search,
  LayoutGrid,
  List,
  Filter,
  Star,
  Clock,
  TestTube,
  Calendar,
  User,
  ShieldCheck,
  Microscope,
  Brain
} from 'lucide-react';

export const mockServices = [
  {
    id: 1,
    icon: <TestTube className="service-icon" />,
    title: 'Xét nghiệm HIV/AIDS',
    duration: '15 phút',
    rating: 4.9,
    reviews: 1234,
    description: 'Xét nghiệm phát hiện virus HIV với độ chính xác cao và bảo mật tuyệt đối.',
    features: ['Kết quả nhanh', 'Bảo mật cao', 'Tư vấn miễn phí'],
    price: '150.000₫',
    oldPrice: '200.000₫'
  },
  {
    id: 2,
    icon: <Microscope className="service-icon" />,
    title: 'Xét nghiệm HPV',
    duration: '20 phút',
    rating: 4.8,
    reviews: 567,
    description: 'Phát hiện virus HPV gây ung thư cổ tử cung - quan trọng cho sức khỏe phụ nữ.',
    features: ['Sàng lọc ung thư', 'Quan trọng cho phụ nữ', 'Tư vấn chuyên sâu'],
    price: '200.000₫'
  },
  {
    id: 3,
    icon: <User className="service-icon" />,
    title: 'Tư vấn sức khỏe nữ giới',
    duration: '45 phút',
    rating: 4.9,
    reviews: 789,
    description: 'Tư vấn về chu kỳ kinh nguyệt, sức khỏe phụ khoa và kế hoạch hóa gia đình.',
    features: ['Chuyên gia phụ khoa', 'Tư vấn toàn diện', 'Theo dõi dài hạn'],
    price: '199.000₫'
  },
  {
    id: 4,
    icon: <ShieldCheck className="service-icon" />,
    title: 'Xét nghiệm Giang mai',
    duration: '15 phút',
    rating: 4.7,
    reviews: 890,
    description: 'Phát hiện vi khuẩn Treponema pallidum gây bệnh giang mai với công nghệ tiên tiến.',
    features: ['Độ chính xác cao', 'Kỹ thuật hiện đại', 'Báo cáo chi tiết'],
    price: '120.000₫'
  },
  {
    id: 5,
    icon: <User className="service-icon" />,
    title: 'Tư vấn sức khỏe nam giới',
    duration: '45 phút',
    rating: 4.6,
    reviews: 432,
    description: 'Tư vấn chuyên sâu về các vấn đề sức khỏe sinh sản và giới tính nam.',
    features: ['Bác sĩ chuyên khoa', 'Tư vấn riêng tư', 'Kế hoạch điều trị'],
    price: '199.000₫'
  },
  {
    id: 6,
    icon: <Calendar className="service-icon" />,
    title: 'Theo dõi chu kỳ thông minh',
    duration: 'Không giới hạn',
    rating: 4.5,
    reviews: 2134,
    description: 'Ứng dụng AI theo dõi và dự đoán chu kỳ kinh nguyệt với độ chính xác cao.',
    features: ['Công nghệ AI', 'Theo dõi thông minh', 'Cảnh báo sớm'],
    price: 'Miễn phí'
  },
  {
    id: 7,
    icon: <Microscope className="service-icon" />,
    title: 'Tầm soát ung thư cổ tử cung',
    duration: '40 phút',
    rating: 4.7,
    reviews: 658,
    description: 'Tầm soát phát hiện sớm nguy cơ ung thư cổ tử cung để can thiệp kịp thời.',
    features: ['Kỹ thuật PAP', 'Tư vấn sau xét nghiệm', 'Bảo hiểm hỗ trợ'],
    price: '250.000₫'
  },
  {
    id: 8,
    icon: <Brain className="service-icon" />,
    title: 'Tư vấn tâm lý học đường',
    duration: '60 phút',
    rating: 4.6,
    reviews: 540,
    description: 'Tư vấn tâm lý cho học sinh – sinh viên về căng thẳng, học tập, định hướng tương lai.',
    features: ['Tư vấn học đường', 'Tâm lý trị liệu nhẹ', 'Hẹn lịch linh hoạt'],
    price: 'Miễn phí'
  },
  {
    id: 9,
    icon: <ShieldCheck className="service-icon" />,
    title: 'Khám bệnh lây qua đường tình dục (STIs)',
    duration: '35 phút',
    rating: 4.7,
    reviews: 880,
    description: 'Khám và tư vấn các bệnh STIs như lậu, giang mai, HPV,... với sự bảo mật cao.',
    features: ['Khám kín đáo', 'Bác sĩ chuyên khoa', 'Đặt lịch nhanh chóng'],
    price: '180.000₫'
  }
];

const ServiceContent = () => {
  const [view, setView] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockServices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(mockServices.length / itemsPerPage);

  return (
    <div className="service-wrapper">
      <div className="service-filters">
        <div className="service-search-box">
          <Search size={18} className="service-search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ y tế..."
            className="service-search-input"
          />
        </div>

        <div className="filter-container">
          <div className="filter-header">
            <div className="filter-title">
              <Filter size={18} />
              <h3>Bộ lọc & Sắp xếp</h3>
            </div>
            <div className="view-toggle">
              <span>Hiển thị:</span>
              <button
                className={view === 'grid' ? 'active' : ''}
                onClick={() => setView('grid')}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                className={view === 'list' ? 'active' : ''}
                onClick={() => setView('list')}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          <div className="filters">
            <div className="filter-group">
              <label>Danh mục</label>
              <select>
                <option>Tất cả</option>
                <option>Tư vấn</option>
                <option>Xét nghiệm</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Mức giá</label>
              <select>
                <option>Tất cả mức giá</option>
                <option>Dưới 500k</option>
                <option>500k - 1 triệu</option>
                <option>Trên 1 triệu</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Sắp xếp theo</label>
              <select>
                <option>Phổ biến nhất</option>
                <option>Giá tăng dần</option>
                <option>Giá giảm dần</option>
              </select>
            </div>
          </div>

          <p className="found-result">
            Tìm thấy <strong>{mockServices.length}</strong> dịch vụ
          </p>
        </div>
      </div>

      <section className={`service-items ${view}`}>
        {currentItems.map((data) => (
          <div key={data.id} className={`service-card ${view}`}>
            <div className="service-icon-wrapper">{data.icon}</div>
            <div className="service-content">
              <div className="service-header">
                <h3>{data.title}</h3>
                <div className="rating">
                  <Star size={14} fill="#1dbf73" color="#1dbf73" />
                  <span>{data.rating}</span>
                </div>
              </div>
              <div className="service-meta">
                <Clock size={14} />
                <span>{data.duration}</span>
                <span>•</span>
                <span>{data.reviews} đánh giá</span>
              </div>
              <p className="service-description">{data.description}</p>
              <ul className="features">
                {data.features.map((f, i) => (
                  <li key={i}>✔ {f}</li>
                ))}
              </ul>
              <div className="service-footer">
                <div className="price">
                  {data.oldPrice && <span className="old-price">{data.oldPrice}</span>}
                  <strong>{data.price}</strong>
                </div>
                <button>Đặt lịch →</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="pagination">
        {currentPage > 1 && (
          <button className="page prev" onClick={() => setCurrentPage(currentPage - 1)}>← Previous</button>
        )}
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`page ${currentPage === i + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button className="page next" onClick={() => setCurrentPage(currentPage + 1)}>Next →</button>
        )}
      </div>
    </div>
  );
};

export default ServiceContent;
