import React, { useState } from 'react';
import './SMBody.css';

const services = [
  {
    name: 'Xét nghiệm máu tổng quát',
    desc: 'Xét nghiệm các chỉ số cơ bản trong máu',
    category: 'Huyết học',
    price: 150000,
    time: 30,
    orders: 45,
    status: 'Đang hoạt động',
  },
  {
    name: 'X-quang phổi',
    desc: 'Chụp X-quang kiểm tra tình trạng phổi',
    category: 'Chẩn đoán hình ảnh',
    price: 200000,
    time: 15,
    orders: 32,
    status: 'Đang hoạt động',
  },
  {
    name: 'Siêu âm bụng tổng quát',
    desc: 'Siêu âm kiểm tra các cơ quan trong bụng',
    category: 'Chẩn đoán hình ảnh',
    price: 300000,
    time: 45,
    orders: 28,
    status: 'Đang hoạt động',
  },
  {
    name: 'Xét nghiệm nước tiểu',
    desc: 'Phân tích các chỉ số trong nước tiểu',
    category: 'Huyết học',
    price: 80000,
    time: 20,
    orders: 15,
    status: 'Tạm dừng',
  },
  {
    name: 'Điện tim',
    desc: 'Đo và ghi lại hoạt động điện của tim',
    category: 'Tim mạch',
    price: 120000,
    time: 20,
    orders: 38,
    status: 'Đang hoạt động',
  },
  {
    name: 'Khám da liễu',
    desc: 'Tư vấn và khám các bệnh về da',
    category: 'Da liễu',
    price: 100000,
    time: 25,
    orders: 20,
    status: 'Đang hoạt động',
  },
  {
    name: 'Tư vấn tâm lý',
    desc: 'Hỗ trợ tâm lý cá nhân và gia đình',
    category: 'Tâm lý học',
    price: 250000,
    time: 60,
    orders: 12,
    status: 'Tạm dừng',
  },
  {
    name: 'Khám nội tổng quát',
    desc: 'Khám sức khỏe tổng quát',
    category: 'Nội khoa',
    price: 180000,
    time: 30,
    orders: 50,
    status: 'Đang hoạt động',
  },
  {
    name: 'Siêu âm tim',
    desc: 'Kiểm tra hình ảnh tim bằng siêu âm',
    category: 'Tim mạch',
    price: 350000,
    time: 40,
    orders: 18,
    status: 'Đang hoạt động',
  },
  {
    name: 'Xét nghiệm HIV',
    desc: 'Phát hiện nhanh kháng thể HIV',
    category: 'Xét nghiệm nhanh',
    price: 90000,
    time: 10,
    orders: 22,
    status: 'Đang hoạt động',
  },
  {
    name: 'Khám sản phụ khoa',
    desc: 'Khám định kỳ phụ nữ',
    category: 'Sản phụ khoa',
    price: 220000,
    time: 30,
    orders: 27,
    status: 'Tạm dừng',
  },
  {
    name: 'Nội soi tai mũi họng',
    desc: 'Kiểm tra tai, mũi, họng bằng nội soi',
    category: 'Tai mũi họng',
    price: 270000,
    time: 25,
    orders: 19,
    status: 'Đang hoạt động',
  },
  {
    name: 'Khám mắt',
    desc: 'Đo thị lực và khám mắt tổng quát',
    category: 'Nhãn khoa',
    price: 95000,
    time: 20,
    orders: 33,
    status: 'Đang hoạt động',
  },
  {
    name: 'Xét nghiệm đường huyết',
    desc: 'Đo lượng đường trong máu nhanh',
    category: 'Nội tiết',
    price: 60000,
    time: 10,
    orders: 44,
    status: 'Đang hoạt động',
  },
  {
    name: 'Khám nhi',
    desc: 'Khám tổng quát cho trẻ nhỏ',
    category: 'Nhi khoa',
    price: 150000,
    time: 30,
    orders: 26,
    status: 'Tạm dừng',
  },
];

const formatCurrency = (number) => {
  return `$ ${number.toLocaleString('vi-VN')} VNĐ`;
};

const SMBody = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 5;

  const totalPages = Math.ceil(services.length / servicesPerPage);
  const startIndex = (currentPage - 1) * servicesPerPage;
  const currentServices = services.slice(startIndex, startIndex + servicesPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="sm-body">
      <div className="sm-body-header">
        <h2>Danh sách dịch vụ ({services.length})</h2>
      </div>

      <table className="sm-table">
        <thead>
          <tr>
            <th>TÊN DỊCH VỤ</th>
            <th>DANH MỤC</th>
            <th>GIÁ</th>
            <th>THỜI GIAN</th>
            <th>LƯỢT ĐẶT</th>
            <th>TRẠNG THÁI</th>
            <th>THAO TÁC</th>
          </tr>
        </thead>
        <tbody>
          {currentServices.map((item, index) => (
            <tr key={index}>
              <td>
                <strong>{item.name}</strong>
                <div className="desc">{item.desc}</div>
              </td>
              <td>
                <span className="category-tag">{item.category}</span>
              </td>
              <td className="price">{formatCurrency(item.price)}</td>
              <td>
                <span className="time">
                  <span className="clock-icon">⏱</span>
                  {item.time} phút
                </span>
              </td>
              <td>{item.orders} lượt</td>
              <td>
                <span className={`status ${item.status === 'Đang hoạt động' ? 'active' : 'inactive'}`}>
                  {item.status}
                </span>
              </td>
              <td className="actions">
                <span className="edit-icon">✏️</span>
                <span className="delete-icon">🗑️</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          ‹ Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? 'page-number active' : 'page-number'}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next ›
        </button>
      </div>
    </div>
  );
};

export default SMBody;
