import React, { useState } from 'react';
import './TSFooter.css';
import { Filter, Search, MoreHorizontal, Clock, TestTube2, Check } from 'lucide-react';

const services = [
  { name: 'Xét nghiệm HIV', desc: 'Xét nghiệm phát hiện virus HIV trong máu', type: 'STI', price: '150,000 VNĐ', time: '24 giờ', orders: 89, status: 'active' },
  { name: 'Xét nghiệm Giang mai', desc: 'Xét nghiệm phát hiện vi khuẩn Treponema pallidum', type: 'STI', price: '120,000 VNĐ', time: '12 giờ', orders: 56, status: 'active' },
  { name: 'Xét nghiệm Lậu', desc: 'Xét nghiệm phát hiện vi khuẩn Neisseria gonorrhoeae', type: 'STI', price: '100,000 VNĐ', time: '6 giờ', orders: 43, status: 'active' },
  { name: 'Xét nghiệm Chlamydia', desc: 'Xét nghiệm phát hiện vi khuẩn Chlamydia trachomatis', type: 'STI', price: '130,000 VNĐ', time: '8 giờ', orders: 37, status: 'active' },
  { name: 'Xét nghiệm HPV', desc: 'Xét nghiệm phát hiện virus HPV gây ung thư cổ tử cung', type: 'STI', price: '300,000 VNĐ', time: '48 giờ', orders: 71, status: 'active' },
];

const orders = [
  { id: 'ORD001', patient: 'Nguyễn Thị Mai', service: 'Xét nghiệm HIV', date: '15/06/2024', status: 'done', result: 'Âm tính', consultant: 'BS. Nguyễn Minh Anh' },
  { id: 'ORD002', patient: 'Trần Văn Minh', service: 'Xét nghiệm Giang mai', date: '16/06/2024', status: 'processing', result: 'Đang xử lý', consultant: 'BS. Lê Văn Hoàng' },
  { id: 'ORD003', patient: 'Lê Thị Hoa', service: 'Xét nghiệm HPV', date: '17/06/2024', status: 'pending', result: 'Chờ mẫu', consultant: 'BS. Phạm Thị Lan' },
];

const TSFooter = () => {
  const [activeTab, setActiveTab] = useState('services');

  return (
    <div className="ts-footer">
      <div className="ts-tabs">
        <button
          className={activeTab === 'services' ? 'active' : ''}
          onClick={() => setActiveTab('services')}
        >
          Dịch vụ xét nghiệm
        </button>
        <button
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          Đơn hàng
        </button>
      </div>

      {activeTab === 'services' && (
        <div className="ts-section">
          <div className="ts-section-header">
            <div>
              <h3 className="ts-section-title">Danh sách dịch vụ</h3>
              <p className="ts-section-subtitle">Quản lý {services.length} dịch vụ xét nghiệm STIs</p>
            </div>
            <div className="ts-section-tools">
              <div className="ts-search-box">
                <Search size={16} />
                <input type="text" placeholder="Tìm kiếm dịch vụ..." />
              </div>
              <button className="ts-add-btn">+ Thêm dịch vụ</button>
            </div>
          </div>

          <table className="ts-table">
            <thead>
              <tr>
                <th>Dịch vụ</th>
                <th>Loại</th>
                <th>Giá</th>
                <th>Thời gian</th>
                <th>Đơn hàng/tháng</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, i) => (
                <tr key={i}>
                  <td>
                    <div className="ts-service-info">
                      <TestTube2 size={18} className="ts-icon" />
                      <div>
                        <p className="ts-service-name">{s.name}</p>
                        <p className="ts-service-desc">{s.desc}</p>
                      </div>
                    </div>
                  </td>
                  <td><span className="ts-badge">{s.type}</span></td>
                  <td>{s.price}</td>
                  <td><Clock size={14} className="ts-icon-clock" /> {s.time}</td>
                  <td>{s.orders}</td>
                  <td><span className="ts-status active">Hoạt động</span></td>
                  <td><MoreHorizontal size={18} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="ts-section">
          <div className="ts-section-header">
            <div>
              <h3 className="ts-section-title">Đơn hàng xét nghiệm</h3>
              <p className="ts-section-subtitle">Theo dõi và quản lý các đơn hàng xét nghiệm</p>
            </div>
            <div className="ts-section-tools">
              <div className="ts-search-box">
                <Search size={16} />
                <input type="text" placeholder="Tìm kiếm đơn hàng..." />
              </div>
              <button className="ts-filter-btn"><Filter size={16} /> Lọc</button>
            </div>
          </div>

          <table className="ts-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Bệnh nhân</th>
                <th>Dịch vụ</th>
                <th>Ngày đặt</th>
                <th>Trạng thái</th>
                <th>Kết quả</th>
                <th>Tư vấn viên</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i}>
                  <td>{o.id}</td>
                  <td>{o.patient}</td>
                  <td>{o.service}</td>
                  <td>{o.date}</td>
                  <td>
                    <span className={`ts-status ${o.status}`}>
                      {o.status === 'done'
                        ? 'Hoàn thành'
                        : o.status === 'processing'
                        ? 'Đang xử lý'
                        : 'Chờ xử lý'}
                    </span>
                  </td>
                  <td>{o.status === 'done' ? <><Check size={14} /> {o.result}</> : o.result}</td>
                  <td>{o.consultant}</td>
                  <td><MoreHorizontal size={18} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TSFooter;
