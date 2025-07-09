import { useState } from 'react';
import './RFooter.css';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  BarChart, Bar
} from 'recharts';

const lineData = [
  { name: 'T1', users: 320, tests: 420, consults: 430 },
  { name: 'T2', users: 350, tests: 380, consults: 470 },
  { name: 'T3', users: 390, tests: 410, consults: 510 },
  { name: 'T4', users: 410, tests: 400, consults: 580 },
  { name: 'T5', users: 440, tests: 370, consults: 630 },
  { name: 'T6', users: 470, tests: 360, consults: 690 },
];

const pieData = [
  { name: 'HIV', value: 35 },
  { name: 'Giang mai', value: 25 },
  { name: 'HPV', value: 20 },
  { name: 'Lậu', value: 12 },
  { name: 'Chlamydia', value: 8 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const revenueData = [
  { name: 'T1', revenue: 45 },
  { name: 'T2', revenue: 52 },
  { name: 'T3', revenue: 49 },
  { name: 'T4', revenue: 58 },
  { name: 'T5', revenue: 62 },
  { name: 'T6', revenue: 70 },
];

const topServices = [
  { name: 'Xét nghiệm HIV', orders: 89, revenue: '13.35M VND' },
  { name: 'Xét nghiệm HPV', orders: 71, revenue: '21.3M VND' },
  { name: 'Xét nghiệm Giang mai', orders: 56, revenue: '6.72M VND' },
  { name: 'Xét nghiệm Lậu', orders: 43, revenue: '4.3M VND' },
  { name: 'Xét nghiệm Chlamydia', orders: 37, revenue: '4.81M VND' },
];

const avgProcessing = [
  { name: 'Xét nghiệm Lậu', hours: 6, badge: 'Excellent' },
  { name: 'Xét nghiệm Chlamydia', hours: 8, badge: 'Good' },
  { name: 'Xét nghiệm Giang mai', hours: 12, badge: 'Good' },
  { name: 'Xét nghiệm HIV', hours: 24, badge: 'Normal' },
  { name: 'Xét nghiệm HPV', hours: 48, badge: 'Normal' },
];

const performanceData = [
  { name: 'BS. Nguyễn Minh Anh', sessions: 85, rating: 4.8, avgPrice: '147.059 đ', revenue: '12.500.000 đ' },
  { name: 'BS. Trần Thị Bích', sessions: 92, rating: 4.9, avgPrice: '150.000 đ', revenue: '13.800.000 đ' },
  { name: 'BS. Lê Văn Hoàng', sessions: 78, rating: 4.7, avgPrice: '150.000 đ', revenue: '11.700.000 đ' },
  { name: 'BS. Phạm Thị Lan', sessions: 81, rating: 4.6, avgPrice: '150.000 đ', revenue: '12.150.000 đ' },
];

export default function RFooter() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="rfooter-container">
      <div className="rfooter-top">
        <div className="rfooter-tabs">
          <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Tổng quan</button>
          <button className={activeTab === 'revenue' ? 'active' : ''} onClick={() => setActiveTab('revenue')}>Doanh thu</button>
          <button className={activeTab === 'service' ? 'active' : ''} onClick={() => setActiveTab('service')}>Dịch vụ</button>
          <button className={activeTab === 'performance' ? 'active' : ''} onClick={() => setActiveTab('performance')}>Hiệu suất</button>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="rfooter-chart">
              <h3>📈 Xu hướng hoạt động 6 tháng qua</h3>
              <p>Theo dõi số lượng người dùng, xét nghiệm và tư vấn</p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="tests" stroke="#10b981" />
                  <Line type="monotone" dataKey="consults" stroke="#f59e0b" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rfooter-bottom">
              <div className="rfooter-pie">
                <h3>🧪 Phân bố loại xét nghiệm</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="rfooter-stats">
                <h3>Thống kê nhanh</h3>
                <ul>
                  <li><span>Tỷ lệ hài lòng</span><span className="success">94%</span></li>
                  <li><span>Thời gian phản hồi TB</span><span className="info">2.5h</span></li>
                  <li><span>Tỷ lệ tái khám</span><span className="purple">68%</span></li>
                  <li><span>Đánh giá trung bình</span><span className="warning">4.7/5</span></li>
                </ul>
              </div>
            </div>
          </>
        )}

        {activeTab === 'revenue' && (
          <>
            <div className="rfooter-chart">
              <h3>📊 Doanh thu theo tháng</h3>
              <p>Theo dõi doanh thu và tăng trưởng</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rfooter-revenue-cards">
              <div className="revenue-card tests">
                <h4>Doanh thu từ xét nghiệm</h4>
                <p className="value">45.200.000 đ</p>
                <span>63.7% tổng doanh thu</span>
              </div>
              <div className="revenue-card consults">
                <h4>Doanh thu từ tư vấn</h4>
                <p className="value">25.800.000 đ</p>
                <span>36.3% tổng doanh thu</span>
              </div>
              <div className="revenue-card avg">
                <h4>Doanh thu trung bình/người dùng</h4>
                <p className="value">139.200 đ</p>
                <span>+8.5% so với tháng trước</span>
              </div>
            </div>
          </>
        )}

        {activeTab === 'service' && (
          <div className="rfooter-service">
            <div className="service-left">
              <h3>🧪 Top dịch vụ xét nghiệm</h3>
              <ul>{topServices.map((s, i) => (
                <li key={i}><div><strong>{s.name}</strong><p>{s.orders} đơn hàng</p></div><span>{s.revenue}</span></li>
              ))}</ul>
            </div>
            <div className="service-right">
              <h3>⏱️ Thời gian xử lý trung bình</h3>
              <ul>{avgProcessing.map((p, i) => (
                <li key={i}><div><strong>{p.name}</strong><p>{p.hours} giờ</p></div><span className={`badge ${p.badge.toLowerCase()}`}>{p.badge}</span></li>
              ))}</ul>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="pf-section">
            <h3>Hiệu suất tư vấn viên</h3>
            <p>Theo dõi số buổi tư vấn, đánh giá và doanh thu</p>
            <div className="pf-list">
              {performanceData.map((c, i) => (
                <div key={i} className="pf-card-full">
                  <div className="pf-card-header">
                    <h4>{c.name}</h4>
                    <p>{c.sessions} buổi tư vấn • Đánh giá: {c.rating}/5</p>
                  </div>
                  <div className="pf-card-body">
                    <div><span>Buổi tư vấn</span><b>{c.sessions}</b></div>
                    <div><span>Đánh giá</span><b>{c.rating}/5</b></div>
                    <div><span>TB/buổi</span><b>{c.avgPrice}</b></div>
                    <div className="pf-card-revenue">
                      <b>{c.revenue}</b><span>Doanh thu</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
