import { useEffect, useState } from 'react';
import axios from 'axios';
import './RFooter.css';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

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
                <BarChart data={pieData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8b5cf6" />
                </BarChart>
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
      </div>
    </div>
  );
}
