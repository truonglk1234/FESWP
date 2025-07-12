import { useEffect, useState } from 'react';
import axios from 'axios';
import './RFooter.css';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  BarChart, Bar
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6366f1', '#14b8a6'];

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
  const [pieData, setPieData] = useState([]);
  const [userMonthlyStats, setUserMonthlyStats] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    // Pie chart
    axios.get("http://localhost:8080/api/admin/statistics/type-count")
      .then((res) => {
        if (Array.isArray(res.data)) {
          const sorted = res.data.sort((a, b) => b.count - a.count).slice(0, 4);
          const converted = sorted.map(item => ({
            name: item.serviceName,
            value: item.count
          }));
          setPieData(converted);
        }
      }).catch(err => console.error("Lỗi pie chart:", err));

    // User chart
    axios.get("http://localhost:8080/api/admin/statistics/monthly-users")
      .then((res) => {
        if (Array.isArray(res.data)) {
          const formatted = res.data
            .filter(item => item.month && typeof item.month === 'string')
            .map(item => ({
              name: 'T' + item.month.slice(5),
              users: item.count
            }));
          setUserMonthlyStats(formatted);
        }
      }).catch(err => console.error("Lỗi user chart:", err));

    // Revenue chart
    axios.get("http://localhost:8080/api/admin/statistics/monthly-revenue")
      .then((res) => {
        if (Array.isArray(res.data)) {
          const formatted = res.data.map(item => ({
            name: item.monthLabel,
            revenue: item.totalRevenue
          }));
          setRevenueData(formatted);
        }
      }).catch(err => console.error("Lỗi revenue chart:", err));
  }, []);

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
              <h3>📈 Số người dùng đăng ký theo tháng</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userMonthlyStats}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rfooter-pie">
              <h3>🦢 Phân bố loại xét nghiệm</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeTab === 'revenue' && (
          <div className="rfooter-chart">
            <h3>📊 Doanh thu theo tháng</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${value.toLocaleString()} đ`} />
                <Bar dataKey="revenue" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'service' && (
          <div className="rfooter-service">
            <div className="service-left">
              <h3>🦢 Top dịch vụ xét nghiệm</h3>
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
            <div className="pf-list">
              {performanceData.map((c, i) => (
                <div key={i} className="pf-card-full">
                  <div className="pf-card-header">
                    <h4>{c.name}</h4>
                    <p>{c.sessions} buổi • Đánh giá: {c.rating}/5</p>
                  </div>
                  <div className="pf-card-body">
                    <div><span>Buổi</span><b>{c.sessions}</b></div>
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
